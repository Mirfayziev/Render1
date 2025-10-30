# ⚡ RENDER.COM - TEZKOR YO'RIQNOMA

## 🎯 3 BOSQICHDA DEPLOY

### BOSQICH 1: MongoDB Atlas (5 daqiqa)

```
1. https://www.mongodb.com/cloud/atlas ga kiring
2. "Try Free" > Free M0 Cluster yaratish
3. Database User yaratish (username + password)
4. Network Access > Allow 0.0.0.0/0
5. Connection string olish va saqlash:
   mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### BOSQICH 2: GitHub (2 daqiqa)

```bash
cd render-project
git init
git add .
git commit -m "Render deployment"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

### BOSQICH 3: Render Deploy (3 daqiqa)

```
1. https://render.com ga kiring (GitHub bilan)
2. New + > Web Service
3. Repository ni ulang
4. Sozlamalar:
   - Build: npm install
   - Start: node server.js
   - Free plan
5. Environment Variables:
   MONGODB_URI=your-atlas-connection-string
   JWT_SECRET=uzbek-secret-2025
   TELEGRAM_TOKEN=bot-token-from-botfather
6. Create Web Service
```

---

## 📱 Telegram Bot (2 daqiqa)

```
1. @BotFather > /newbot
2. Bot nomi va username
3. TOKEN ni oling
4. Render > Environment > TELEGRAM_TOKEN
```

---

## ✅ Tayyor!

**URL:** `https://uzbek-project-manager.onrender.com`

1. Saytga kiring
2. `admin@admin.com` bilan admin yarating
3. Bot ga `/start` yuboring
4. Chat ID ni profilga kiriting

---

## 🐛 Muammo Bo'lsa?

### MongoDB ulanmayapti
- [ ] Connection string to'g'rimi?
- [ ] IP: 0.0.0.0/0 qo'shilganmi?
- [ ] Database user yaratilganmi?

### Telegram ishlamayapti
- [ ] TOKEN to'g'rimi?
- [ ] TELEGRAM_TOKEN variable mavjudmi?
- [ ] Bot @BotFather da yaratilganmi?

### Build failed
```bash
# Build command:
npm install --legacy-peer-deps
```

---

## 💰 Narxlar

- **Free:** 750 soat/oy (15 daqiqada uxlaydi)
- **Starter:** $7/oy (24/7 ishleydi)

---

## 📞 Yordam

- Docs: https://render.com/docs
- Support: https://render.com/support
- Community: https://community.render.com

---

**Jami vaqt: 10-15 daqiqa** ⏱️

**RENDER-DEPLOY.md da batafsil yo'riqnoma!** 📚
