import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/contact';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-primary/30 selection:text-white transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      
      <Chatbot />
      
      <footer className="py-8 text-center text-slate-500 dark:text-gray-500 text-sm border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
        <p>© {new Date().getFullYear()} Mostafa Nagedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
