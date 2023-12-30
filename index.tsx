import Button from "./components/button";
import { createRoot } from "react-dom/client";

console.log("Heyheyhey via Bun!");

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<Button>Hello World!</Button>);
