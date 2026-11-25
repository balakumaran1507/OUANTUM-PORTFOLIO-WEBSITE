import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import IntercomBottomCTA from './components/home/IntercomBottomCTA'
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
const Pricing = lazy(() => import('./pages/Pricing'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionDetail = lazy(() => import('./pages/solutions/SolutionDetail'))
const CuringDelays = lazy(() => import('./pages/solutions/CuringDelays'))
const DataTampering = lazy(() => import('./pages/solutions/DataTampering'))
const MilestoneDisputes = lazy(() => import('./pages/solutions/MilestoneDisputes'))
const SubsurfaceVoids = lazy(() => import('./pages/solutions/SubsurfaceVoids'))
const StructuralCorrosion = lazy(() => import('./pages/solutions/StructuralCorrosion'))
const Integrations = lazy(() => import('./pages/Integrations'))
const Changelog = lazy(() => import('./pages/Changelog'))
const Demo = lazy(() => import('./pages/Demo'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const SecurityTerms = lazy(() => import('./pages/SecurityTerms'))
const TermsAndPolicies = lazy(() => import('./pages/TermsAndPolicies'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const NdtAnalysis = lazy(() => import('./pages/NdtAnalysis'))
const IsCompliance = lazy(() => import('./pages/IsCompliance'))
const Consensus = lazy(() => import('./pages/Consensus'))
const ServiceLife = lazy(() => import('./pages/ServiceLife'))
const WhyChooseOuantum = lazy(() => import('./pages/WhyChooseOuantum'))
const OX1Platform = lazy(() => import('./pages/OX1Platform'))
const OX1Countdown = lazy(() => import('./pages/OX1Countdown'))
const NotFound = lazy(() => import('./pages/NotFound'))

function GlobalWordHover() {
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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/curing-delays" element={<CuringDelays />} />
          <Route path="/solutions/data-tampering" element={<DataTampering />} />
          <Route path="/solutions/milestone-disputes" element={<MilestoneDisputes />} />
          <Route path="/solutions/subsurface-voids" element={<SubsurfaceVoids />} />
          <Route path="/solutions/structural-corrosion" element={<StructuralCorrosion />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/security" element={<SecurityTerms />} />
          <Route path="/terms" element={<TermsAndPolicies initialTab="terms" />} />
          <Route path="/legal" element={<TermsAndPolicies initialTab="terms" />} />
          <Route path="/legal/terms-and-policies" element={<TermsAndPolicies initialTab="terms" />} />
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
          <Route path="/why-choose-ouantum" element={<WhyChooseOuantum />} />
          <Route path="/why-choose-quantum" element={<WhyChooseOuantum />} />
          <Route path="/why-ouantum" element={<WhyChooseOuantum />} />
          <Route path="/why-quantum" element={<WhyChooseOuantum />} />
          <Route path="/products/ox1" element={<OX1Platform />} />
          <Route path="/products/omni-extelligence-1" element={<OX1Platform />} />
          <Route path="/products/ox-1" element={<OX1Platform />} />
          <Route path="/ox1-platform" element={<OX1Platform />} />
          <Route path="/ox1" element={<Navigate to="/products/ox1" replace />} />
          <Route path="/ox-1" element={<Navigate to="/products/ox1" replace />} />
          <Route path="/ox1-countdown" element={<OX1Countdown />} />
          <Route path="/ox1/countdown" element={<OX1Countdown />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isCountdown && <IntercomBottomCTA />}
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
