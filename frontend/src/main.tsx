import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthContextProvider } from "./contexts/useAuthContext.tsx";
import * as Sentry from "@sentry/react";
import { HelmetProvider } from "react-helmet-async";

Sentry.init({
  dsn: "https://05501806db0a745c9e60ae58c795b9ab@o4507652807327744.ingest.us.sentry.io/4507764446330880",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <BrowserRouter>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
          <Toaster />
        </BrowserRouter>

        <SpeedInsights />
      </Sentry.ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
