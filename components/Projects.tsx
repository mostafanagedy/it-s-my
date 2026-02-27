import React from 'react';
import { PROJECTS_CONTENT } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
            {PROJECTS_CONTENT.sectionLabel}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {PROJECTS_CONTENT.headline}
          </h3>
        </div>
        
        {/* Project Placeholders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 group hover:border-primary/40 transition-all shadow-sm dark:shadow-none hover:shadow-lg hover:shadow-primary/5">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-primary text-white dark:text-slate-950 font-bold px-4 py-2 rounded-lg">View Project</span>
                        </div>
                        <span className="text-slate-300 dark:text-slate-600 font-mono text-4xl font-bold opacity-20">{i}</span>
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Project Name {i}</h4>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-4">A brief description of the project and the technical challenges solved.</p>
                        <div className="flex gap-2">
                            <span className="text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 px-2 py-1 rounded">React</span>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 px-2 py-1 rounded">Node</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;