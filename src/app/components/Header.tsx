import { Link, useLocation } from 'react-router';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/calculator', label: 'Калькулятор' },
    { path: '/catalog', label: 'Каталог работ' },
    { path: '/portfolio', label: 'Портфолио' },
    { path: '/about', label: 'О нас' },
    { path: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A1A] text-[#F5F5F0]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              {siteConfig.logo ? (
                <img 
                  src={siteConfig.logo} 
                  alt={siteConfig.shortName} 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              ) : (
                <div className="w-full h-full bg-[#B58B52] flex items-center justify-center">
                  <span className="font-serif text-xl text-[#1A1A1A]">{siteConfig.shortName}</span>
                </div>
              )}
            </div>
            <span className="font-serif text-xl">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors relative ${
                  location.pathname === link.path
                    ? 'text-[#B58B52]'
                    : 'text-[#F5F5F0] hover:text-[#B58B52]'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-6 left-0 right-0 h-[2px] bg-[#B58B52]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="hidden md:flex items-center gap-2 text-[#F5F5F0] hover:text-[#B58B52] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">{siteConfig.contact.phone}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#F5F5F0] hover:text-[#B58B52] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-t border-[#F5F5F0]/10">
          <nav className="px-6 py-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-sm tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#B58B52]'
                    : 'text-[#F5F5F0] hover:text-[#B58B52]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-2 py-3 text-sm text-[#F5F5F0] hover:text-[#B58B52] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
