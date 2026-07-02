import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ArticlePage } from "./pages/ArticlePage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-brand-bg text-brand-text antialiased selection:bg-brand-text selection:text-brand-bg">
        <div>
          {/* Global Header */}
          <Header />

          {/* Main Views */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

