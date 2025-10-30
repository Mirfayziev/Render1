# 🇺🇿 O'zbek Loyiha Boshqaruv Tizimi - Render.com

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

O'zbek milliy dizaynida zamonaviy va professional loyiha boshqaruv tizimi. Trello ga o'xshash funksionallik, to'liq O'zbek tilida.

## 🚀 Render.com ga Deploy Qilish

### ⚡ Tezkor Boshlash (10 daqiqa)

1. **MongoDB Atlas (Bepul)**
   ```
   https://www.mongodb.com/cloud/atlas
   → Free M0 Cluster yaratish
   → Database user + password
   → Network: 0.0.0.0/0
   → Connection string olish
   ```

2. **GitHub**
   ```bash
   git init
   git add .
   git commit -m "Render ready"
   git push
   ```

3. **Render.com**
   ```
   https://render.com
   → New Web Service
   → Connect GitHub repo
   → Environment variables sozlash
   → Deploy!
   ```

### 📋 To'liq Yo'riqnoma

Batafsil qo'llanma: [RENDER-DEPLOY.md](./RENDER-DEPLOY.md)

Tezkor yo'riqnoma: [QUICKSTART-RENDER.md](./QUICKSTART-RENDER.md)

---

## ⚙️ Environment Variables

Render Dashboard > Environment:

```env
# MongoDB Atlas connection
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/uzbek-project-manager

# JWT Secret
JWT_SECRET=uzbek-project-super-secret-key-2025

# Telegram Bot Token (@BotFather dan)
TELEGRAM_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# Port (Render avtomatik beradi)
PORT=10000

# Node version
NODE_VERSION=18.0.0
```

---

## ✨ Xususiyatlar

- 🎨 **O'zbek Milliy Dizayni** - Ko'k, yashil, oltin ranglar
- 📱 **Telegram Integration** - Real-time bildirishnomalar
- 💾 **MongoDB Database** - Cloud database
- 👥 **Admin & User Panels** - Rol-asoslangan kirish
- 📊 **Topshiriqlar Boshqaruvi** - Trello style
- 💬 **Real-time Chat** - Socket.io
- 📈 **Excel/Word Export** - Hisobotlar
- 🔐 **JWT Authentication** - Xavfsiz
- 🎯 **Drag & Drop** - Oson UI
- 🌐 **Responsive Design** - Mobile-ready

---

## 🛠 Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT + Bcrypt
- Telegram Bot API
- ExcelJS + Docx

**Frontend:**
- HTML5 + CSS3 + JavaScript
- O'zbek milliy dizayni
- Responsive layout

---

## 📂 Proyekt Strukturasi

```
render-project/
├── server.js              # Backend server
├── package.json           # Dependencies
├── render.yaml           # Render config
├── Procfile              # Process
├── .env.example          # Env template
├── RENDER-DEPLOY.md      # Deploy guide
├── QUICKSTART-RENDER.md  # Quick start
└── public/               # Frontend
    ├── index.html
    ├── styles.css
    └── app.js
```

---

## 🔒 Xavfsizlik

- ✅ Parollar shifrlangan (bcrypt)
- ✅ JWT token authentication
- ✅ HTTPS avtomatik (Render)
- ✅ Environment variables
- ✅ MongoDB Atlas secure connection

---

## 💰 Narxlar

### MongoDB Atlas:
- **Free M0:** 512MB storage (bepul)

### Render.com:
- **Free:** 750 soat/oy (kichik loyihalar)
- **Starter:** $7/oy (24/7 ishleydi)
- **Standard:** $25/oy (2GB RAM)

---

## 📊 Deploy Jarayoni

```
1. MongoDB Atlas sozlash     ✅ (5 min)
2. GitHub ga push qilish      ✅ (2 min)
3. Render ga deploy qilish    ✅ (3 min)
4. Environment variables      ✅ (2 min)
5. Test qilish               ✅ (3 min)
─────────────────────────────────────
Jami:                         ⏱️ 15 min
```

---

## ✅ Deploy Tugagandan Keyin

1. **URL ochish:** `https://your-app.onrender.com`
2. **Admin yaratish:** `admin@admin.com`
3. **Telegram ulash:** Bot ga `/start`
4. **Topshiriq yaratish:** Admin panel
5. **Test qilish:** Barcha funksiyalar

---

## 🐛 Troubleshooting

### MongoDB ulanmayapti?
- Connection string to'g'rimi?
- IP whitelist: 0.0.0.0/0
- Database user yaratilganmi?

### Telegram ishlamayapti?
- TOKEN to'g'ri kiritilganmi?
- Bot @BotFather da yaratilganmi?
- Environment variable mavjudmi?

### Build failed?
```bash
# Build command:
npm install --legacy-peer-deps
```

### Free instance uxlayapti?
- ⚠️ Render free plan 15 daqiqada uxlaydi
- ✅ $7/oy plan ga o'ting (24/7 active)

---

## 📚 Hujjatlar

- [RENDER-DEPLOY.md](./RENDER-DEPLOY.md) - To'liq deploy yo'riqnomasi
- [QUICKSTART-RENDER.md](./QUICKSTART-RENDER.md) - Tezkor boshlash
- [Render Docs](https://render.com/docs) - Official docs
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com) - Database docs

---

## 🎯 Production Checklist

- [ ] MongoDB Atlas cluster yaratilgan
- [ ] Database user yaratilgan
- [ ] IP whitelist: 0.0.0.0/0
- [ ] Connection string to'g'ri
- [ ] GitHub repository yaratilgan
- [ ] Render service yaratilgan
- [ ] Environment variables to'liq
- [ ] HTTPS ishlayapti
- [ ] Health check passed
- [ ] Admin account yaratilgan
- [ ] Telegram bot ulangan
- [ ] Test topshiriqlar yaratilgan
- [ ] Barcha funksiyalar test qilingan

---

## 🌐 Live Demo

Deploy qilgandan keyin:

**URL:** `https://your-app.onrender.com`

**Test:**
- `/health` - Health check
- `/api` - API info

---

## 📞 Yordam va Qo'llab-quvvatlash

### Render:
- Docs: https://render.com/docs
- Support: https://render.com/support
- Community: https://community.render.com
- Status: https://status.render.com

### MongoDB:
- Atlas Docs: https://docs.atlas.mongodb.com
- Support: https://www.mongodb.com/cloud/atlas/support

### Telegram:
- Bot API: https://core.telegram.org/bots/api
- BotFather: https://t.me/BotFather

---

## 🔄 Updates

Render avtomatik deploy qiladi har safar `git push` qilganingizda:

```bash
git add .
git commit -m "Update: yangi funksiya"
git push
# Render avtomatik deploy qiladi (5-7 min)
```

---

## 🌟 Features Roadmap

- [x] Render deployment support
- [x] MongoDB Atlas integration
- [x] Telegram notifications
- [x] Excel/Word export
- [ ] Email notifications
- [ ] Mobile app
- [ ] Dark mode
- [ ] Multi-language

---

## 📄 License

MIT License - Open source

---

## 👨‍💻 Author

O'zbek dasturchisi tomonidan yaratildi 🇺🇿

---

## 🎉 Muvaffaqiyatli Deploy!

Agar barcha qadamlarni to'g'ri bajargan bo'lsangiz:

✅ Saytingiz live: `https://your-app.onrender.com`
✅ MongoDB connected
✅ Telegram bot ishlayapti
✅ HTTPS aktiv
✅ Auto-deploy ishlayapti

**Endi loyihangizdan foydalaning! 🚀**

---

**Savollar bormi?**
- RENDER-DEPLOY.md ni o'qing
- Render Community da so'rang
- GitHub Issues yarating

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
