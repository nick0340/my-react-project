import { useState } from 'react';
import { Menu, X, PawPrint, Heart, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Dogs', page: 'pet', data: { pet: 'dogs' } },
    { label: 'Cats', page: 'pet', data: { pet: 'cats' } },
    { label: 'All Foods', page: 'foods' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container-main">
        {/* Main navigation row - flex with items-center for vertical alignment */}
        <div className="flex items-center justify-between h-16">
          {/* Logo - vertically centered */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0"
            aria-label="PetSafe Eats Home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-safe to-brand rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <PawPrint className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-lg font-bold text-text-primary leading-tight tracking-tight">
                PetSafe<span className="text-safe">Eats</span>
              </span>
              <span className="text-[10px] text-text-muted font-medium -mt-0.5 hidden sm:block">Pet Food Safety Guide</span>
            </div>
          </button>

          {/* Desktop Nav - Center, vertically centered */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page, item.data)}
                className={`flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.page || (item.data?.pet && currentPage === 'pet')
                    ? 'bg-brand/10 text-brand'
                    : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
                }`}
                aria-current={currentPage === item.page ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu - Right, vertically centered */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="hidden sm:flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-safe text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              aria-label="Save a Pet - Check food safety"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>Save a Pet</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden border-t border-slate-100 bg-white animate-slide-down"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container-main py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.page, item.data);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  currentPage === item.page
                    ? 'bg-brand/10 text-brand'
                    : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
                }`}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 opacity-50" aria-hidden="true" />
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-safe text-white px-4 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                Save a Pet
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
