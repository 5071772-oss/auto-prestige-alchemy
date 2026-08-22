import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Не найден корневой элемент приложения с id="root"');
}

createRoot(rootElement).render(<App />);
