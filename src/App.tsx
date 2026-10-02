import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Chatbot from './components/common/Chatbot'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoaderOverlay from './components/LoaderOverlay'
import Home from './pages/Home'
import './styles/global.css'

// Lazy-loaded pages for fast initial rendering and route code splitting
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const SystemStatus = lazy(() => import('./pages/SystemStatus'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const SecurityTerms = lazy(() => import('./pages/SecurityTerms'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const NdtAnalysis = lazy(() => import('./pages/NdtAnalysis'))
const IsCompliance = lazy(() => import('./pages/IsCompliance'))
const Consensus = lazy(() => import('./pages/Consensus'))
const ServiceLife = lazy(() => import('./pages/ServiceLife'))
const FieldDataIn = lazy(() => import('./pages/FieldDataIn'))
const AiAnalysis = lazy(() => import('./pages/AiAnalysis'))
const ReportOut = lazy(() => import('./pages/ReportOut'))
const OX1 = lazy(() => import('./pages/OX1'))
const OX1Countdown = lazy(() => import('./pages/OX1Countdown'))
const NotFound = lazy(() => import('./pages/NotFound'))

function GlobalWordHover() {
  const location = useLocation();

  useEffect(() => {
    const handleElement = (el: HTMLElement) => {
      if (el.dataset.wordHovered) return;
      
      const selector = 'p, li span, .side-description, .about-text-block p, .equipment-overlay-description, .service-card-description, .hero-subtext, .subpage-hero-text, .faq-answer, .privacy-text, .careers-description';
      
      if (el.matches(selector) || el.closest(selector)) {
        const targetEl = el.matches(selector) ? el : el.closest(selector) as HTMLElement;
        if (targetEl.dataset.wordHovered) return;
        targetEl.dataset.wordHovered = 'true';
        
        // Find all child text nodes
        const walk = document.createTreeWalker(targetEl, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        const textNodes: Node[] = [];
        while ((node = walk.nextNode())) {
          if (node.nodeValue && node.nodeValue.trim()) {
            textNodes.push(node);
          }
        }
        
        textNodes.forEach(textNode => {
          const parent = textNode.parentNode;
          if (!parent) return;
          const parentElement = parent as HTMLElement;
          if (parentElement.tagName === 'SPAN' && parentElement.classList.contains('word-hover-span')) return;
          if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'BUTTON'].includes(parentElement.tagName)) return;
          
          if (!textNode.nodeValue) return;
          const words = textNode.nodeValue.split(/(\s+)/);
          const fragment = document.createDocumentFragment();
          
          words.forEach(word => {
            if (/\s+/.test(word)) {
              fragment.appendChild(document.createTextNode(word));
            } else {
              const span = document.createElement('span');
              span.className = 'word-hover-span';
              span.textContent = word;
              fragment.appendChild(span);
            }
          });
          
          parentElement.replaceChild(fragment, textNode);
        });
      }
    };

    // Run on initial query selector
    const run = () => {
      const elements = document.querySelectorAll(
        'p, li span, .side-description, .about-text-block p, .equipment-overlay-description, .service-card-description, .hero-subtext, .subpage-hero-text, .faq-answer, .privacy-text, .careers-description'
      );
      elements.forEach(el => handleElement(el as HTMLElement));
    };

    const timer = setTimeout(run, 150);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            handleElement(el);
            const selector = 'p, li span, .side-description, .about-text-block p, .equipment-overlay-description, .service-card-description, .hero-subtext, .subpage-hero-text, .faq-answer, .privacy-text, .careers-description';
            el.querySelectorAll(selector).forEach(child => handleElement(child as HTMLElement));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isCountdown = location.pathname.includes('countdown');

  return (
    <div className="app-wrapper">
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/security" element={<SecurityTerms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/capabilities/ndt-analysis-engine" element={<NdtAnalysis />} />
          <Route path="/capabilities/ndt analysis engine" element={<NdtAnalysis />} />
          <Route path="/capabilities/is-code-compliance" element={<IsCompliance />} />
          <Route path="/capabilities/is code compliance" element={<IsCompliance />} />
          <Route path="/capabilities/multi-model-consensus" element={<Consensus />} />
          <Route path="/capabilities/multi model consensus" element={<Consensus />} />
          <Route path="/capabilities/service-life-prediction" element={<ServiceLife />} />
          <Route path="/capabilities/service life prediction" element={<ServiceLife />} />
          <Route path="/how-it-works/field-data-in" element={<FieldDataIn />} />
          <Route path="/how-it-works/ai-analysis" element={<AiAnalysis />} />
          <Route path="/how-it-works/report-out" element={<ReportOut />} />
          <Route path="/ox1" element={<OX1 />} />
          <Route path="/ox-1" element={<OX1 />} />
          <Route path="/ox1-countdown" element={<OX1Countdown />} />
          <Route path="/ox1/countdown" element={<OX1Countdown />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isCountdown && <Footer />}
      {!isCountdown && <Chatbot />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LoaderOverlay />
      <Router>
        <GlobalWordHover />
        <AppContent />
      </Router>
    </ErrorBoundary>
  )
}

export default App;
