import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
              {TECH_STACK.sectionLabel}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {TECH_STACK.headline}
            </h3>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {TECH_STACK.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TECH_STACK.skills.map((skill, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-xl hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="mb-4 text-slate-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                  <skill.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;