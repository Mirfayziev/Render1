const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const ExcelJS = require('exceljs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// MongoDB ulanishi
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uzbek-project-manager';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB ga ulandi'))
  .catch(err => console.error('MongoDB xatosi:', err));

// Telegram Bot
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Fayl yuklash sozlamalari
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Ma'lumotlar bazasi modellari
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    color: { type: String, default: '#3498db' },
    avatar: { type: String, default: '' },
    backgroundImage: { type: String, default: '' },
    telegramChatId: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    deadline: { type: Date },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        files: [{ type: String }],
        createdAt: { type: Date, default: Date.now }
    }],
    files: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const MessageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    text: { type: String, required: true },
    color: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);
const Message = mongoose.model('Message', MessageSchema);

// JWT Token yaratish
const JWT_SECRET = process.env.JWT_SECRET || 'uzbek-project-secret-key-2025';

// Middleware: Token tekshirish
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token topilmadi' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token yaroqsiz' });
        }
        req.user = user;
        next();
    });
};

// Telegram bot buyruqlari
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 
        'Assalomu alaykum! O\'zbek Loyiha Boshqaruv tizimiga xush kelibsiz!\n\n' +
        'Telegram hisobingizni tizimga ulash uchun:\n' +
        '1. Saytga kiring\n' +
        '2. Profilingizga o\'ting\n' +
        '3. Telegram ID ni kiriting: ' + chatId
    );
});

// API yo'nalishlari

// Root endpoint - index.html ni serve qilish
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint (Railway uchun)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server ishlamoqda',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/api', (req, res) => {
    res.json({ 
        message: 'O\'zbek Loyiha Boshqaruv Tizimi API',
        version: '1.0.0',
        status: 'active'
    });
});

// 1. Ro'yxatdan o'tish
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Foydalanuvchi mavjudligini tekshirish
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Foydalanuvchi allaqachon mavjud' });
        }

        // Parolni shifrlash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tasodifiy rang tanlash (takrorlanmaydigan)
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', 
                       '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#d35400'];
        const usedColors = await User.find({}, 'color');
        const availableColors = colors.filter(c => !usedColors.some(uc => uc.color === c));
        const userColor = availableColors.length > 0 ? 
            availableColors[Math.floor(Math.random() * availableColors.length)] : 
            colors[Math.floor(Math.random() * colors.length)];

        // Yangi foydalanuvchi yaratish
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            color: userColor,
            role: email === 'admin@admin.com' ? 'admin' : 'user'
        });

        await newUser.save();

        res.status(201).json({ message: 'Ro\'yxatdan o\'tildi', color: userColor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 2. Kirish
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Parol xato' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                color: user.color,
                avatar: user.avatar,
                backgroundImage: user.backgroundImage
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 3. Profil ma'lumotlarini olish
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 4. Profilni yangilash
app.put('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { color, avatar, backgroundImage, telegramChatId } = req.body;
        const user = await User.findById(req.user.id);

        if (color) user.color = color;
        if (avatar) user.avatar = avatar;
        if (backgroundImage) user.backgroundImage = backgroundImage;
        if (telegramChatId) user.telegramChatId = telegramChatId;

        await user.save();
        res.json({ message: 'Profil yangilandi', user });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 5. Barcha foydalanuvchilarni olish (Admin uchun)
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Ruxsat yo\'q' });
        }
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 6. Topshiriq yaratish
app.post('/api/tasks', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Faqat admin topshiriq yarata oladi' });
        }

        const { title, description, assignedTo, deadline, priority } = req.body;

        const newTask = new Task({
            title,
            description,
            assignedTo,
            assignedBy: req.user.id,
            deadline,
            priority
        });

        await newTask.save();

        // Telegram orqali xabar yuborish
        const assignedUser = await User.findById(assignedTo);
        if (assignedUser && assignedUser.telegramChatId) {
            bot.sendMessage(
                assignedUser.telegramChatId,
                `🔔 Yangi topshiriq!\n\n` +
                `📋 Sarlavha: ${title}\n` +
                `📝 Tavsif: ${description}\n` +
                `⏰ Muddat: ${deadline ? new Date(deadline).toLocaleDateString('uz-UZ') : 'Belgilanmagan'}\n` +
                `🎯 Muhimlik: ${priority}`
            );
        }

        res.status(201).json({ message: 'Topshiriq yaratildi', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 7. Topshiriqlarni olish
app.get('/api/tasks', authenticateToken, async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'admin') {
            tasks = await Task.find()
                .populate('assignedTo', 'username color avatar')
                .populate('assignedBy', 'username')
                .populate('comments.user', 'username color avatar')
                .sort({ createdAt: -1 });
        } else {
            tasks = await Task.find({ assignedTo: req.user.id })
                .populate('assignedTo', 'username color avatar')
                .populate('assignedBy', 'username')
                .populate('comments.user', 'username color avatar')
                .sort({ createdAt: -1 });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 8. Topshiriqqa izoh qo'shish
app.post('/api/tasks/:id/comments', authenticateToken, upload.array('files', 5), async (req, res) => {
    try {
        const { text } = req.body;
        const files = req.files ? req.files.map(f => f.filename) : [];

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Topshiriq topilmadi' });
        }

        task.comments.push({
            user: req.user.id,
            text,
            files
        });

        await task.save();

        // Telegram orqali xabar yuborish
        const assignedUser = await User.findById(task.assignedTo);
        const commentUser = await User.findById(req.user.id);
        
        if (assignedUser && assignedUser.telegramChatId && req.user.id !== task.assignedTo.toString()) {
            bot.sendMessage(
                assignedUser.telegramChatId,
                `💬 Yangi izoh: "${task.title}"\n\n` +
                `👤 ${commentUser.username}: ${text}`
            );
        }

        const populatedTask = await Task.findById(req.params.id)
            .populate('assignedTo', 'username color avatar')
            .populate('assignedBy', 'username')
            .populate('comments.user', 'username color avatar');

        res.json({ message: 'Izoh qo\'shildi', task: populatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 9. Topshiriq holatini yangilash
app.put('/api/tasks/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Topshiriq topilmadi' });
        }

        task.status = status;
        await task.save();

        // Admin ga xabar yuborish
        if (req.user.role !== 'admin') {
            const admin = await User.findById(task.assignedBy);
            if (admin && admin.telegramChatId) {
                const statusText = status === 'completed' ? 'Bajarildi ✅' : 
                                 status === 'in-progress' ? 'Jarayonda 🔄' : 'Kutilmoqda ⏳';
                bot.sendMessage(
                    admin.telegramChatId,
                    `📊 Topshiriq holati o'zgartirildi\n\n` +
                    `📋 Topshiriq: ${task.title}\n` +
                    `👤 Foydalanuvchi: ${req.user.username}\n` +
                    `🔔 Yangi holat: ${statusText}`
                );
            }
        }

        res.json({ message: 'Holat yangilandi', task });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 10. Excel hisobotini yuklab olish
app.get('/api/export/excel', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('assignedTo', 'username')
            .populate('assignedBy', 'username');

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Topshiriqlar');

        worksheet.columns = [
            { header: 'Topshiriq', key: 'title', width: 30 },
            { header: 'Tavsif', key: 'description', width: 40 },
            { header: 'Tayinlangan', key: 'assignedTo', width: 20 },
            { header: 'Tayinlovchi', key: 'assignedBy', width: 20 },
            { header: 'Holat', key: 'status', width: 15 },
            { header: 'Muhimlik', key: 'priority', width: 15 },
            { header: 'Muddat', key: 'deadline', width: 15 }
        ];

        tasks.forEach(task => {
            worksheet.addRow({
                title: task.title,
                description: task.description,
                assignedTo: task.assignedTo?.username || '',
                assignedBy: task.assignedBy?.username || '',
                status: task.status,
                priority: task.priority,
                deadline: task.deadline ? new Date(task.deadline).toLocaleDateString('uz-UZ') : ''
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=topshiriqlar.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// 11. Word hisobotini yuklab olish
app.get('/api/export/word', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('assignedTo', 'username')
            .populate('assignedBy', 'username');

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Topshiriqlar hisoboti",
                                bold: true,
                                size: 32
                            })
                        ]
                    }),
                    new Paragraph({ text: "" }),
                    ...tasks.map(task => 
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${task.title}\n`,
                                    bold: true
                                }),
                                new TextRun({
                                    text: `Tavsif: ${task.description}\n`
                                }),
                                new TextRun({
                                    text: `Tayinlangan: ${task.assignedTo?.username || ''}\n`
                                }),
                                new TextRun({
                                    text: `Holat: ${task.status}\n`
                                }),
                                new TextRun({
                                    text: `\n`
                                })
                            ]
                        })
                    )
                ]
            }]
        });

        const buffer = await Packer.toBuffer(doc);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=topshiriqlar.docx');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

// Socket.io chat
io.on('connection', (socket) => {
    console.log('Yangi foydalanuvchi ulandi');

    // Eski xabarlarni yuborish
    Message.find()
        .populate('user', 'username color avatar')
        .sort({ createdAt: -1 })
        .limit(50)
        .then(messages => {
            socket.emit('load messages', messages.reverse());
        });

    // Yangi xabar
    socket.on('chat message', async (data) => {
        try {
            const message = new Message({
                user: data.userId,
                username: data.username,
                text: data.text,
                color: data.color,
                avatar: data.avatar
            });
            await message.save();

            io.emit('chat message', {
                _id: message._id,
                username: data.username,
                text: data.text,
                color: data.color,
                avatar: data.avatar,
                createdAt: message.createdAt
            });
        } catch (error) {
            console.error('Xabar saqlashda xato:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Foydalanuvchi uzildi');
    });
});

// Telegram bot webhook
app.post('/api/telegram/webhook', async (req, res) => {
    try {
        const { message } = req.body;
        if (message && message.text) {
            // Telegram orqali izoh qo'shish
            const user = await User.findOne({ telegramChatId: message.chat.id });
            if (user) {
                // Oxirgi topshiriqqa izoh qo'shish
                const lastTask = await Task.findOne({ assignedTo: user._id }).sort({ createdAt: -1 });
                if (lastTask) {
                    lastTask.comments.push({
                        user: user._id,
                        text: message.text
                    });
                    await lastTask.save();
                    bot.sendMessage(message.chat.id, '✅ Izoh qo\'shildi');
                }
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ${PORT} portda ishlamoqda`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'Local'}`);
});
