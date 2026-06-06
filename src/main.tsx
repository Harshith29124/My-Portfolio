import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Force animations on regardless of the OS "reduce motion" setting:
          the signature motion is core to this portfolio's identity. */}
      <MotionConfig reducedMotion="never">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
