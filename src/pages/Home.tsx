import React from 'react';
import Hero from '../components/home/Hero';
import Problem from '../components/home/Problem';
import Services from '../components/home/Services';
import HowItWorks from '../components/home/HowItWorks';
import Difference from '../components/home/Difference';
import Partners from '../components/home/Partners';
import Geography from '../components/home/Geography';
import Projects from '../components/home/Projects';
import Contact from '../components/home/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Problem />
      <Services />
      <HowItWorks />
      <Difference />
      <Partners />
      <Geography />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
