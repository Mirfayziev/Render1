# 🇺🇿 O'zbek Loyiha Boshqaruv Tizimi

O'zbek milliy dizaynida zamonaviy va professional loyiha boshqaruv tizimi. Bu tizim Trello ga o'xshash funksionallikka ega, lekin to'liq O'zbek tilida va milliy naqshlar bilan bezatilgan.

## ✨ Asosiy Xususiyatlari

### 1. 🎨 Chiroyli O'zbek Milliy Dizayni
- O'zbek ranglari: ko'k, yashil, oltin
- Milliy naqshlar va ornamentlar
- Zamonaviy va intuitiv interfeys
- Responsive dizayn (barcha qurilmalarda ishlaydi)

### 2. 💾 Ma'lumotlar Bazasi
- MongoDB - kuchli NoSQL ma'lumotlar bazasi
- Foydalanuvchilar, topshiriqlar, xabarlar
- Barcha ma'lumotlar xavfsiz saqlanadi

### 3. 📱 Telegram Bot va Excel/Word Integratsiyasi
- Real-time Telegram bildirishnomalar
- Yangi topshiriqlar haqida avtomatik xabarlar
- Telegram orqali izoh qo'shish
- Excel va Word formatida hisobotlarni yuklab olish

### 4. 👥 Admin va User Panellari
- Admin panel: barcha topshiriqlarni boshqarish
- User panel: shaxsiy topshiriqlar va profil
- Ro'yxatdan o'tish orqali shaxsiy hisob
- Login va parol bilan xavfsiz kirish

### 5. 🎨 Personalizatsiya
- O'z rangingizni tanlash (takrorlanmaydigan)
- Avatar o'rnatish (emoji yoki rasm)
- Ish joyiga fon rasmi qo'yish
- Har bir foydalanuvchi unikal ko'rinishga ega

### 6. 📊 Topshiriqlar Boshqaruvi (Trello uslubida)
- Uchta ustun: Kutilmoqda, Jarayonda, Bajarildi
- Drag & drop (ustunlar orasida ko'chirish)
- Topshiriqlarga izoh qo'shish
- Fayllar va rasmlar ilova qilish
- Muhimlik darajasi (past, o'rtacha, yuqori)
- Muddat belgilash

### 7. 📢 Telegram Xabarnomalar
- Yangi topshiriq berilganda xabar
- Topshiriqqa izoh qo'shilganda xabar
- Topshiriq holati o'zgarganda xabar
- Sayt va Telegram orqali izoh qo'shish

### 8. 💬 Umumiy Chat
- 24/7 onlayn chat
- Barcha foydalanuvchilar suhbatlasha oladi
- Real-time xabar almashish (Socket.io)
- Xabar tarixi saqlanadi

### 9. 🔐 Xavfsizlik
- Parollar shifrlangan (bcrypt)
- JWT token autentifikatsiyasi
- Har bir so'rov tekshiriladi
- Admin va User huquqlari

### 10. 📈 Admin Paneli
- Barcha foydalanuvchilarni ko'rish
- Topshiriqlar statistikasi
- Kimga qanday topshiriq berilganini ko'rish
- Foydalanuvchilarning rang va avatarlari
- Yangi topshiriq yaratish

### 11. 🎯 Topshiriq Tafsilotlari
- To'liq topshiriq ma'lumotlari
- Barcha izohlar va fayllar
- Topshiriq holatini o'zgartirish
- Fayl yuklash va ko'rish

### 12. 📱 Telegram Bot Integratsiyasi
- @YourBot orqali /start buyrug'i
- Telegram ID ni profilga ulash
- Sayt va Telegram orqali izoh qo'shish

## 🚀 O'rnatish va Ishga Tushirish

### 1. Talablar
```bash
- Node.js (v18 yoki yuqori)
- MongoDB (v5 yoki yuqori)
- Telegram Bot Token
```

### 2. O'rnatish
```bash
# 1. Loyihani yuklab oling
git clone <repository-url>
cd uzbek-project-manager

# 2. Paketlarni o'rnating
npm install

# 3. .env faylini yarating
cp .env.example .env

# 4. .env faylida sozlamalarni kiriting:
# - TELEGRAM_TOKEN: @BotFather dan oling
# - MONGODB_URI: MongoDB ulanish manzili
# - JWT_SECRET: Maxfiy kalit
```

### 3. MongoDB ni ishga tushirish
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongodb
```

### 4. Serverni ishga tushirish
```bash
npm start
```

### 5. Brauzerda ochish
```
http://localhost:5000
```

## 📖 Foydalanish

### Birinchi Admin yaratish
1. Saytga kiring: http://localhost:5000
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Email: `admin@admin.com` (bu admin bo'ladi)
4. Username va parol kiriting
5. Kirish tugmasini bosing

### Telegram Bot ni ulash
1. @BotFather ga /newbot buyrug'ini yuboring
2. Bot nomini va username ni kiriting
3. Sizga TOKEN beriladi
4. TOKEN ni .env fayliga qo'ying
5. Serverni qayta ishga tushiring
6. Botga /start buyrug'ini yuboring
7. Chat ID ni nusxalang
8. Saytda Profilga o'ting
9. Telegram ID ni kiriting va saqlang

### Topshiriq yaratish (Admin)
1. Admin Panel ga o'ting
2. "Yangi Topshiriq" tugmasini bosing
3. Barcha ma'lumotlarni kiriting
4. Foydalanuvchini tanlang
5. "Yaratish" tugmasini bosing

### Topshiriqqa izoh qo'shish
1. Topshiriqqa bosing
2. Izoh maydoni ochiladi
3. Izoh yozing
4. Kerak bo'lsa fayl yuklang
5. "Izoh qo'shish" tugmasini bosing

### Excel/Word ga eksport
1. Topshiriqlar sahifasiga o'ting
2. "Excel" yoki "Word" tugmasini bosing
3. Fayl avtomatik yuklab olinadi

## 🛠 Texnologiyalar

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL ma'lumotlar bazasi
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time xabar almashish
- **JWT** - Autentifikatsiya
- **Bcrypt** - Parol shifrlash
- **Multer** - Fayl yuklash
- **ExcelJS** - Excel yaratish
- **Docx** - Word yaratish
- **node-telegram-bot-api** - Telegram bot

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling (O'zbek milliy dizayni)
- **JavaScript (Vanilla)** - Funksionallik
- **Socket.io Client** - Real-time
- **Font Awesome** - Ikonkalar

## 📁 Loyiha Strukturasi

```
uzbek-project-manager/
├── server.js              # Asosiy server fayli
├── package.json           # Node.js sozlamalari
├── .env.example          # Environment o'rnak
├── README.md             # Ushbu fayl
├── public/               # Frontend fayllari
│   ├── index.html        # Asosiy HTML
│   ├── styles.css        # CSS dizayni
│   └── app.js            # JavaScript funksiyalari
└── uploads/              # Yuklangan fayllar
```

## 🔒 Xavfsizlik

- Barcha parollar bcrypt bilan shifrlangan
- JWT token 24 soat amal qiladi
- CORS sozlamalari
- File upload cheklovlari
- Admin va User huquqlari

## 📊 API Endpoints

### Autentifikatsiya
- `POST /api/register` - Ro'yxatdan o'tish
- `POST /api/login` - Kirish

### Profil
- `GET /api/profile` - Profil ma'lumotlari
- `PUT /api/profile` - Profilni yangilash

### Topshiriqlar
- `GET /api/tasks` - Topshiriqlarni olish
- `POST /api/tasks` - Topshiriq yaratish (Admin)
- `POST /api/tasks/:id/comments` - Izoh qo'shish
- `PUT /api/tasks/:id/status` - Holatni o'zgartirish

### Admin
- `GET /api/users` - Foydalanuvchilar ro'yxati

### Export
- `GET /api/export/excel` - Excel hisoboti
- `GET /api/export/word` - Word hisoboti

## 🎨 Dizayn Xususiyatlari

### O'zbek Ranglari
- Ko'k: `#0099cc`
- Yashil: `#00843d`
- Oltin: `#d4af37`
- Turquoise: `#1e9b9b`

### Milliy Naqshlar
- Gradient fon
- Ornamental bezaklar
- Zamonaviy shadow effektlar
- Smooth animatsiyalar

## 🆘 Yordam va Qo'llab-quvvatlash

### Muammolar
Agar muammo bo'lsa, quyidagilarni tekshiring:
1. MongoDB ishlab turibmi?
2. .env fayli to'g'ri to'ldirilganmi?
3. Port (5000) band emasmi?
4. Node.js versiyasi to'g'rimi?

### Telegram Bot ishlamasa
1. TOKEN to'g'ri kiritilganmi?
2. Botga /start buyrug'i yuborilganmi?
3. Chat ID to'g'ri nusxalanganmi?
4. Server qayta ishga tushirilganmi?

## 📝 Litsenziya

MIT License - Erkin foydalanish uchun ochiq

## 👨‍💻 Muallif

O'zbek dasturchisi tomonidan yaratildi

## 🌟 Yangi Imkoniyatlar (Kelajakda)

- [ ] Mobile application
- [ ] Email bildirishnomalar
- [ ] Fayl versiyalash
- [ ] Topshiriq shablonlari
- [ ] Grafik hisobotlar
- [ ] Ko'p tillilik
- [ ] Dark mode

## 📞 Aloqa

Savollar va takliflar uchun:
- Telegram: @yourusername
- Email: your@email.com

---

**O'zbekiston uchun yaratilgan 🇺🇿**
