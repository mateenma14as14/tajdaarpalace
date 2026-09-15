import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PreviewGate from "./components/PreviewGate";
import "./index.css";

// Loaded only once the preview password is accepted, so visitors who stop at
// the lock screen never download the site itself.
const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreviewGate>
      <Suspense fallback={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </PreviewGate>
  </StrictMode>,
);
