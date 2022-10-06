import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import GlobalProvider from "./globalStore/GlobalProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
