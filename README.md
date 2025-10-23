# 🌍 Viajes App — Travel Management Frontend

**Viajes App** is a modern **frontend** built with **React + TypeScript + TailwindCSS**,  
designed to connect with a RESTful API for **user authentication**, **trip management**, and **travel booking**.  
This project was bootstrapped with **Create React App** and follows scalable, clean architecture practices.

---

## 🧠 Tech Stack

| Layer | Technologies |
| :---- | :------------ |
| **Frontend** | React · TypeScript · TailwindCSS · Axios |
| **API Integration** | RESTful Endpoints · JWT Authentication |
| **Development Tools** | Create React App / Vite · ESLint · Prettier |
| **UI Design** | Responsive Layout · Reusable Components · Dark Mode Ready |

---

## ⚙️ Installation and Configuration

### 🧩 Requirements

- [Node.js 18+](https://nodejs.org/en/download)
- npm or yarn
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)
- A running backend API (for example, `.NET 8`, `Express.js`, or `Spring Boot`)

---

## 🚀 Frontend Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/Kevin7819/globales-front-2.0.git
cd globales-front
```

### 2️⃣ Install dependencies

```sh
npm install
npm install axios
npm install -D @types/axios
npm install -D tailwindcss postcss autoprefixer
```

---

### 3️⃣ Configure TailwindCSS

Initialize TailwindCSS:

```sh
npx tailwindcss init -p
```

Create or edit **`tailwind.config.js`**:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Include Tailwind directives in **`src/index.css`**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 4️⃣ Available Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm start`     | Runs the app in development mode |
| `npm run build` | Builds the app for production    |
| `npm test`      | Runs unit and integration tests  |

---

## ⚠️ Common Issues

| Issue | Cause | Solution |
| :---- | :---- | :-------- |
| `Cannot find module 'axios'` | Axios not installed | Run `npm install axios @types/axios` |
| `Property 'className' does not exist on type ...` | Missing prop in component | Add `className?: string` to props interface |
| `Parameter 'error' implicitly has an 'any' type` | Missing type annotation | Use `AxiosError` type in interceptors |

---

## 📚 Useful Resources

* [Axios Documentation](https://axios-http.com/)
* [TailwindCSS Documentation](https://tailwindcss.com/)
* [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
* [Create React App Docs](https://create-react-app.dev/)

---

## 👨‍💻 Author

**Kevin Abel Venegas Bermúdez**  
🎓 *Computer Engineering Student – Universidad Nacional de Costa Rica*  
📍 Heredia, Sarapiquí, Costa Rica  
🔗 [GitHub Profile](https://github.com/Kevin7819)
