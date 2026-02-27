import React from 'react';
import { CONTACT_CONTENT } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-t from-slate-100 to-white dark:from-slate-950 dark:to-slate-900 relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
          {CONTACT_CONTENT.sectionLabel}
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
          {CONTACT_CONTENT.headline}
        </h3>
        <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          {CONTACT_CONTENT.description}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_CONTENT.socials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.name}</h4>
              <span className="text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1 group-hover:text-primary transition-colors">
                {item.display}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;