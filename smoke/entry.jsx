/**
 * Smoke-test entry. Pages are imported eagerly (the real App lazy-loads them,
 * which would only render the Suspense fallback here) and mounted inside a
 * MemoryRouter so hooks like useParams behave exactly as they do in the app.
 */
import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import WhatsAppButton from "../src/components/layout/WhatsAppButton";

import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Services from "../src/pages/Services";
import Projects from "../src/pages/Projects";
import ProjectDetail from "../src/pages/ProjectDetail";
import Gallery from "../src/pages/Gallery";
import Booking from "../src/pages/Booking";
import Contact from "../src/pages/Contact";
import NotFound from "../src/pages/NotFound";

export function renderRoute(path) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </MemoryRouter>,
  );
}

export * as bookings from "../src/lib/bookings";
export * as utils from "../src/lib/utils";
export * as images from "../src/data/images";
