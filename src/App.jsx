import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import WhatsAppButton from "./components/layout/WhatsAppButton";

// Home is bundled with the shell; every other page is fetched on demand so the
// first visit stays small.
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Booking = lazy(() => import("./pages/Booking"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Shown while a lazily-loaded page is fetched. */
function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status">
      <span className="sr-only">Loading</span>
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-blush-200 border-t-rose-500"
      />
    </div>
  );
}

/** Cross-fade wrapper applied to every route. */
function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Page><Home /></Page>} />
              <Route path="/about" element={<Page><About /></Page>} />
              <Route path="/services" element={<Page><Services /></Page>} />
              <Route path="/projects" element={<Page><Projects /></Page>} />
              <Route path="/projects/:slug" element={<Page><ProjectDetail /></Page>} />
              <Route path="/gallery" element={<Page><Gallery /></Page>} />
              <Route path="/booking" element={<Page><Booking /></Page>} />
              <Route path="/contact" element={<Page><Contact /></Page>} />
              <Route path="*" element={<Page><NotFound /></Page>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
