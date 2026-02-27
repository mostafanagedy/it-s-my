import React from 'react';
import { ABOUT_CONTENT } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
            {ABOUT_CONTENT.sectionLabel}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            {ABOUT_CONTENT.headline}
          </h3>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
            {ABOUT_CONTENT.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ABOUT_CONTENT.cards.map((card, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {card.title}
              </h4>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;