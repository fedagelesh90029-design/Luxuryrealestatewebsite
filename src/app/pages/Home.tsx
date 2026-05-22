import { Link } from 'react-router';
import { ArrowRight, Building2, Ruler, Users, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const stats = [
    { value: '120+', label: 'Реализованных проектов' },
    { value: '15', label: 'Лет на рынке' },
    { value: '98%', label: 'Довольных клиентов' },
    { value: '50+', label: 'Специалистов в команде' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Жилой комплекс "Резиденция"',
      location: 'Москва',
      area: '12 000 м²',
      image: 'https://images.unsplash.com/photo-1775733923991-e7223f9f44bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvciUyMGNvbmNyZXRlfGVufDF8fHx8MTc3NjIzOTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Офисное здание "Квартал"',
      location: 'Санкт-Петербург',
      area: '8 500 м²',
      image: 'https://images.unsplash.com/photo-1767336470847-dd0b77398367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzaWRlbnRpYWwlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzYyMzkwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Загородный дом "Panorama"',
      location: 'Подмосковье',
      area: '450 м²',
      image: 'https://images.unsplash.com/photo-1758184432345-3a433cf2c421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjByZXNpZGVudGlhbCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc3NjIzOTA4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: 'Торговый центр "Метрополис"',
      location: 'Казань',
      area: '25 000 м²',
      image: 'https://images.unsplash.com/photo-1655794387399-6dd29236eaa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyYWwlMjBkZXRhaWx8ZW58MXx8fHwxNzc2MjM5MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const services = [
    {
      icon: Building2,
      title: 'Фундаментные работы',
      description: 'Устройство надежного основания любой сложности',
    },
    {
      icon: Ruler,
      title: 'Возведение стен',
      description: 'Кирпич, газобетон, монолитные конструкции',
    },
    {
      icon: Users,
      title: 'Отделочные работы',
      description: 'Внутренняя и внешняя отделка под ключ',
    },
    {
      icon: Award,
      title: 'Инженерные системы',
      description: 'Полный комплекс инженерного обеспечения',
    },
  ];

  return (
    <div className="bg-[#F5F5F0]">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1775733923991-e7223f9f44bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvciUyMGNvbmNyZXRlfGVufDF8fHx8MTc3NjIzOTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Архитектура"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center text-white">
          <h1 className="mb-6 text-white">РАССЧИТАЙТЕ СТОИМОСТЬ ПРОЕКТА</h1>
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Получите детальную смету от профессионального генерального подрядчика
          </p>
          <Link to="/calculator">
            <Button variant="primary" className="bg-[#B58B52] hover:bg-[#3A5A40] text-[#1A1A1A]">
              Собрать смету
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1A1A1A] text-[#F5F5F0]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-serif mb-3 text-[#B58B52]">{stat.value}</div>
                <div className="text-sm text-[#F5F5F0]/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="mb-16 text-center">Реализованные проекты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to="/portfolio"
                className="group relative overflow-hidden bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between text-sm text-[#1A1A1A]/60">
                    <span>{project.location}</span>
                    <span>{project.area}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="mb-16 text-center">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="text-center p-8 border border-[#1A1A1A]/10">
                  <Icon className="w-12 h-12 mx-auto mb-6 text-[#B58B52]" />
                  <h3 className="mb-4">{service.title}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#3A5A40] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="mb-6 text-white">Начните свой проект сегодня</h2>
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Воспользуйтесь нашим калькулятором для получения предварительной сметы
          </p>
          <Link to="/calculator">
            <Button variant="primary" className="bg-[#B58B52] hover:bg-[#1A1A1A] text-[#1A1A1A]">
              Рассчитать смету
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
