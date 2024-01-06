import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "../components/app";

export const getIusseNum = (): string | null => {
  const title = document.getElementById("page-title")?.textContent;
  const match = title?.match(/第\s?(\d+)\s?期/);

  return match ? match[1] : null;
};

export const isSectionItem = (item: Element): boolean => {
  const text = item.textContent?.trim();
  const regex = /^(\d+)、(.*)$/;
  if (!text) return false;
  return regex.test(text);
};

export const isSection = (item: Element): boolean => {
  return item.tagName.toLowerCase() === "h2";
};

export const appendNode = (target: Element, node: ReactNode) => {
  const parentNode = target.parentNode;
  if (!parentNode) {
    return;
  }
  const wrapperContainer = document.createElement("div");
  wrapperContainer.style.display = "flex";
  parentNode.insertBefore(wrapperContainer, target);
  wrapperContainer.appendChild(target);

  const triggerContainer = document.createElement("div");
  const targetStyles = getComputedStyle(target);
  triggerContainer.style.padding = targetStyles.padding;
  triggerContainer.style.margin = targetStyles.margin;
  triggerContainer.style.display = "flex";
  triggerContainer.style.alignItems = "center";
  triggerContainer.style.justifyContent = "center";
  triggerContainer.style.marginLeft = "10px";
  wrapperContainer.appendChild(triggerContainer);
  const root = createRoot(triggerContainer);
  root.render(node);
};

const appID = "atlas-extension-app";

export const mountApp = () => {
  const app = document.createElement("div");
  app.id = appID;
  document.body.appendChild(app);
  const root = createRoot(app);
  root.render(<App />);
};

export const toggleItem = (publicationId: number) => {
  const app = document.getElementById(appID);
  if (!app) return;

  const isToggled = app.dataset.currentToggled === publicationId.toString();

  if (isToggled) {
    delete app.dataset.currentToggled;
    window.dispatchEvent(new CustomEvent("atlas-ext-hide"));
  } else {
    app.dataset.currentToggled = publicationId.toString();
    window.dispatchEvent(
      new CustomEvent("atlas-ext-show", {
        detail: {
          publicationId,
        },
      })
    );
  }
};
export const currentToggled = () => {
  const app = document.getElementById(appID);
  return app?.dataset.currentToggled;
};
