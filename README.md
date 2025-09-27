# WebApp for KA4J 🎖️

KA4J is a Sunday School where every child is guided to grow and develop spiritually. This WebApp created to help and manage the Sunday School Attendance and Activity Report.

## 🎯 Features

- Child and teacher absences
- Activity coupon management

## 🛠️ Tech Stack

- **Vue.js**
- **Tailwind CSS**
- **Pinia**

## 🚀 Getting Started

1. Install depedencies :

    ```
    pnpm install
    ```

2. Set up environment variables:
    - Copy .env.example to .env and fill in required values (database, etc)

3. Start the development server (`http://localhost:5173`):
    ```
    pnpm run dev
    ```

## 🗂️ Project Structure

```
📁 fe-ka4j/
│
├── 📁 public/📄...
│
├── 📁 src/
│   ├── 📁 assets/📄...
│   ├── 📁 components/📄...
│   ├── 📁 router/📄...
│   ├── 📁 services/📄...
│   ├── 📁 stores/📄...
│   ├── 📁 utils/📄...
│   ├── 📁 views/
│   │   └── 📁 pages/📄...
│   │   └── 📄 LandingView.vue
│   ├── 📄 App.vue
│   └── 📄 main.js
│
├── 📄 .editorconfig
├── 📄 .env
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 .prettierignore
├── 📄 .prettierrc.json
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 jsconfig.json
├── 📄 package.json
├── 📄 pnpm-lock.yaml
├── 📄 postcss.config.js
├── 📄 README.md
├── 📄 tailwind.config.js
└── 📄 vite.config.js
```

# 📜 License

MIT
