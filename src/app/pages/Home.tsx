import { Link } from 'react-router';
import { ArrowRight, Building2, Ruler, Users, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useData } from '../context/DataContext';

export function Home() {
  const { projects: allProjects } = useData();
  
  // Get first 4 projects for homepage
  const projects = allProjects.slice(0, 4);

  const stats = [
    { value: '50+', label: 'Успешных проектов' },
    { value: '100%', label: 'Качество по ГОСТ' },
    { value: '24/7', label: 'Поддержка клиентов' },
    { value: '100%', label: 'Прозрачная стройка' },
  ];

  const services = [
    {
      icon: Building2,
      title: 'Фундамент и стены',
      description: 'Строим надежный каркас вашего будущего дома с соблюдением всех технологических норм',
    },
    {
      icon: Ruler,
      title: 'Проектирование',
      description: 'Индивидуальные архитектурные решения, адаптированные под ландшафт Сочи',
    },
    {
      icon: Users,
      title: 'Отделка под ключ',
      description: 'Создаем уютные интерьеры: от черновых работ до финального декора',
    },
    {
      icon: Award,
      title: 'Гарантия качества',
      description: 'Несем полную ответственность за каждый этап строительства и используемые материалы',
    },
  ];

  return (
    <div className="bg-[#F5F5F0]">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/hero.jpg"
            alt="Архитектура"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center text-white">
          <h1 className="mb-6 text-white uppercase text-3xl md:text-5xl lg:text-7xl leading-tight">РАССЧИТАЙТЕ СТОИМОСТЬ ПРОЕКТА</h1>
          <p className="text-base md:text-xl mb-10 text-white/90 max-w-2xl mx-auto px-4">
            Получите детальную смету от профессионального генерального подрядчика
          </p>
          <Link to="/calculator">
            <Button variant="primary" className="bg-[#B58B52] hover:bg-[#3A5A40] text-[#1A1A1A] py-4 px-8 text-sm md:text-base">
              Собрать смету
              <ArrowRight className="inline-block ml-2 w-4 h-4 md:w-5 md:h-5" />
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
      <section className="py-24 bg-[#2C2C2C] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="mb-6 text-white">Начните свой проект сегодня</h2>
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Воспользуйтесь нашим калькулятором для получения предварительной сметы
          </p>
          <Link to="/calculator">
            <Button variant="primary" className="bg-[#B58B52] hover:bg-[#3A5A40] text-[#1A1A1A]">
              Рассчитать смету
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
