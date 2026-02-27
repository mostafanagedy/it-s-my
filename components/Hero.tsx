import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {HERO_CONTENT.status}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            {HERO_CONTENT.headline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              {HERO_CONTENT.headlineHighlight}
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg transition-colors duration-300">
            {HERO_CONTENT.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-cyan-600 text-white dark:text-slate-950 font-bold rounded-lg transition-all transform hover:-translate-y-0.5">
              {HERO_CONTENT.primaryAction}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white font-medium rounded-lg transition-all">
              {HERO_CONTENT.secondaryAction}
            </button>
          </div>
        </div>

        {/* Right Column: Code Window */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          {/* Decorative blurs - Opacity adjusted for light mode */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100"></div>
          
          <div className="relative rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden group hover:border-slate-600 transition-colors duration-300">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-slate-400 font-mono opacity-70">
                {HERO_CONTENT.codeSnippet.fileName}
              </div>
              <div className="w-8"></div> {/* Spacer for balance */}
            </div>
            
            {/* Code Content */}
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code className="block text-slate-300">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span className="text-slate-400">=</span> {'{'}
                  {'\n'}  <span className="text-sky-300">name</span>: <span className="text-green-400">'{HERO_CONTENT.codeSnippet.code.match(/name: '(.*?)'/)?.[1] || "[Your Name]"}'</span>,
                  {'\n'}  <span className="text-sky-300">role</span>: <span className="text-green-400">'{HERO_CONTENT.codeSnippet.code.match(/role: '(.*?)'/)?.[1] || "[Your Role]"}'</span>,
                  {'\n'}  <span className="text-sky-300">passion</span>: <span className="text-green-400">'Building Scalable Systems'</span>,
                  {'\n'}  <span className="text-sky-300">coffee_level</span>: <span className="text-yellow-400">Infinity</span>,
                  {'\n'}  <span className="text-sky-300">skills</span>: [
                  {'\n'}    <span className="text-green-400">'React'</span>, <span className="text-green-400">'Node.js'</span>, <span className="text-green-400">'Python'</span>,
                  {'\n'}    <span className="text-green-400">'PostgreSQL'</span>, <span className="text-green-400">'TypeScript'</span>
                  {'\n'}  ],
                  {'\n'}  <span className="text-sky-300">status</span>: <span className="text-green-400">'Ready to Code'</span>
                  {'\n'}{'};'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;