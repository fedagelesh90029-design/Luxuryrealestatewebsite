import { Link } from 'react-router';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F5F5F0] py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#B58B52] flex items-center justify-center">
                <span className="font-serif text-xl text-[#1A1A1A]">АР</span>
              </div>
              <span className="font-serif text-xl">АРХИТЕКТОР</span>
            </div>
            <p className="text-sm text-[#F5F5F0]/70 leading-relaxed">
              Генеральный подрядчик полного цикла. Реализация проектов любой сложности.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-[#B58B52] font-serif">Навигация</h4>
            <nav className="space-y-3">
              {[
                { path: '/', label: 'Главная' },
                { path: '/calculator', label: 'Калькулятор' },
                { path: '/portfolio', label: 'Портфолио' },
                { path: '/about', label: 'О нас' },
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-[#F5F5F0]/70 hover:text-[#B58B52] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-[#B58B52] font-serif">Услуги</h4>
            <ul className="space-y-3 text-sm text-[#F5F5F0]/70">
              <li>Фундаментные работы</li>
              <li>Возведение стен</li>
              <li>Кровельные работы</li>
              <li>Отделка фасадов</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-[#B58B52] font-serif">Контакты</h4>
            <div className="space-y-4">
              <a href="tel:+74951234567" className="flex items-start gap-3 text-sm text-[#F5F5F0]/70 hover:text-[#B58B52] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </a>
              <a href="mailto:info@architect.ru" className="flex items-start gap-3 text-sm text-[#F5F5F0]/70 hover:text-[#B58B52] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@architect.ru</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-[#F5F5F0]/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Москва, ул. Архитекторов, 15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F5F5F0]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#F5F5F0]/50">
            <p>© 2026 АРХИТЕКТОР. Все права защищены.</p>
            <div className="flex gap-6">
              <Link to="/admin" className="hover:text-[#B58B52] transition-colors">
                Админ-панель
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
