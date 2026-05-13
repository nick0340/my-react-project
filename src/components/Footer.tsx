import { PawPrint, Heart, Shield, Mail, Phone } from 'lucide-react';
import AdSlot from './AdSlot';

interface FooterProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-text-primary text-white mt-20" role="contentinfo">
      {/* AdSense slot in footer */}
      <div className="border-b border-white/10">
        <div className="container-main py-8">
          <AdSlot variant="banner" />
        </div>
      </div>

      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 mb-5 cursor-pointer group"
              aria-label="PetSafe Eats Home"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-safe to-brand rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <PawPrint className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">
                PetSafe<span className="text-safe">Eats</span>
              </span>
            </button>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Your trusted resource for pet food safety. Expert-verified information to keep your furry friends safe and healthy.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Veterinarian reviewed content</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Dogs', page: 'pet', data: { pet: 'dogs' } },
                { label: 'Cats', page: 'pet', data: { pet: 'cats' } },
                { label: 'All Foods', page: 'foods' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.page, item.data)}
                    className="text-sm text-white/60 hover:text-safe transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular Searches */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">Popular Searches</h4>
            <ul className="space-y-3">
              {[
                'Can dogs eat grapes?',
                'Can cats eat chocolate?',
                'Can dogs eat chicken?',
                'Can cats eat tuna?',
              ].map(q => (
                <li key={q}>
                  <span className="text-sm text-white/60">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">Emergency Hotlines</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+18557647661" 
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-safe transition-colors"
                  aria-label="Call Pet Poison Helpline USA"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>🇺🇸 (855) 764-7661</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+18884264435" 
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-safe transition-colors"
                  aria-label="Call ASPCA Poison Control USA"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>🇺🇸 (888) 426-4435</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>🇬🇧 01202 509 000</span>
                </span>
              </li>
              <li className="pt-2">
                <a 
                  href="mailto:hello@petsafeeats.com" 
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-safe transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} PetSafe Eats. All rights reserved. Not a substitute for veterinary advice.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-danger fill-danger" aria-hidden="true" /> for pet parents everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
