# trmnl4-front

## 📦 Installation & Setup

### 1️⃣ Environment Configuration
Create a `.env` file in the root directory and configure your environment variables:

---

### 2️⃣ Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

---

### 3️⃣ Build the Project

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

---

### 4️⃣ Preview the Production Build

Using npm:
```bash
npm run preview
```

Or using yarn:
```bash
yarn preview
```

---

## 📝 Available Scripts

| Command | npm | yarn | Description |
|---------|-----|------|-------------|
| Install | `npm install` | `yarn install` | Install dependencies |
| Build | `npm run build` | `yarn build` | Build for production |
| Preview | `npm run preview` | `yarn preview` | Preview production build |
| Lint | `npm run lint` | `yarn lint` | Run ESLint |

---

## 🔧 Troubleshooting

### API Connection Issues
- Verify `PUBLIC_API_BASE_URL` in `.env` is correct
- Ensure backend server is running
- Check for CORS issues


Что бы добавил:
сделал бы UI и UX нормальный и красивее. Авторизация, отдельно для админа что бы только он мог менять статусы. Так же возможно вручную филтровать по каким-то критериям. Возможно изображение и больше контактной инофрмации у application.