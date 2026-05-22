import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 (${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1655794387399-6dd29236eaa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyYWwlMjBkZXRhaWx8ZW58MXx8fHwxNzc2MjM5MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Контакты"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-white">Контакты</h1>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="mb-8">Свяжитесь с нами</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B58B52] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2">Телефон</h4>
                    <a href="tel:+74951234567" className="text-[#1A1A1A]/70 hover:text-[#B58B52] transition-colors">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B58B52] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2">Email</h4>
                    <a href="mailto:info@architect.ru" className="text-[#1A1A1A]/70 hover:text-[#B58B52] transition-colors">
                      info@architect.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B58B52] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2">Адрес</h4>
                    <p className="text-[#1A1A1A]/70">
                      119991, Москва<br />
                      ул. Архитекторов, д. 15, офис 301
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B58B52] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2">Режим работы</h4>
                    <p className="text-[#1A1A1A]/70">
                      Пн-Пт: 9:00 - 18:00<br />
                      Сб-Вс: Выходной
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-[#E0E0DB] flex items-center justify-center">
                <p className="text-[#1A1A1A]/40">Карта</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <h3 className="mb-4 text-[#3A5A40]">Спасибо!</h3>
                  <p className="text-[#1A1A1A]/70">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <>
                  <h3 className="mb-8">Напишите нам</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors"
                        placeholder="Иван Петров"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Сообщение *</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors resize-none"
                        placeholder="Расскажите о вашем проекте..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Отправить сообщение
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
