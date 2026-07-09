import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { PageSkeleton } from "./components/layout/PageSkeleton";
import { HomePage } from "./pages/HomePage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ArticlePage } from "./pages/ArticlePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { GoogleAnalytics } from "./components/analytics/GoogleAnalytics";

const WorkspacePage = lazy(() =>
  import("./pages/WorkspacePage").then((module) => ({ default: module.WorkspacePage })),
);

export default function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <div className="min-h-screen flex flex-col justify-between bg-brand-bg text-brand-text antialiased selection:bg-brand-text selection:text-brand-bg">
        <div>
          {/* Global Header */}
          <Header />

          {/* Main Views */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:period/:publication" element={<ArticlePage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route
              path="/workspace"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <WorkspacePage />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

