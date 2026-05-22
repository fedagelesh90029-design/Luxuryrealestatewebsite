import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  const team = [
    {
      name: 'Александр Петров',
      position: 'Генеральный директор',
      image: 'https://images.unsplash.com/photo-1749793716288-a5ab5ed3b0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc3NjIwMTU2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Елена Соколова',
      position: 'Главный архитектор',
      image: 'https://images.unsplash.com/photo-1749793716288-a5ab5ed3b0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc3NjIwMTU2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Дмитрий Волков',
      position: 'Технический директор',
      image: 'https://images.unsplash.com/photo-1749793716288-a5ab5ed3b0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc3NjIwMTU2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Мария Кузнецова',
      position: 'Руководитель проектов',
      image: 'https://images.unsplash.com/photo-1749793716288-a5ab5ed3b0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc3NjIwMTU2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const values = [
    {
      title: 'Качество',
      description: 'Используем только проверенные материалы и технологии строительства',
    },
    {
      title: 'Сроки',
      description: 'Соблюдаем договорные сроки благодаря четкому планированию',
    },
    {
      title: 'Прозрачность',
      description: 'Полная отчетность на каждом этапе реализации проекта',
    },
    {
      title: 'Гарантия',
      description: 'Предоставляем расширенную гарантию на все виды работ',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1646809669486-10fea26c5f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBjb25zdHJ1Y3Rpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc2MjM5MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="О компании"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-white">О компании</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="mb-6">15 лет строительного опыта</h2>
              <p className="mb-6 text-[#1A1A1A]/70 leading-relaxed">
                АРХИТЕКТОР — ведущая строительная компания полного цикла, специализирующаяся на
                возведении жилых, коммерческих и промышленных объектов.
              </p>
              <p className="mb-6 text-[#1A1A1A]/70 leading-relaxed">
                Мы предлагаем комплексный подход к реализации проектов: от разработки проектно-сметной
                документации до сдачи объекта заказчику под ключ.
              </p>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                За годы работы мы реализовали более 120 проектов различной сложности, заслужив репутацию
                надежного партнера и профессионального подрядчика.
              </p>
            </div>
            <div>
              <h2 className="mb-6">Наши ценности</h2>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="border-l-2 border-[#B58B52] pl-6">
                    <h4 className="mb-2">{value.title}</h4>
                    <p className="text-sm text-[#1A1A1A]/70">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="mb-16 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-6 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="mb-2">{member.name}</h4>
                <p className="text-sm text-[#1A1A1A]/60">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-[#1A1A1A] text-[#F5F5F0]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-serif mb-3 text-[#B58B52]">120+</div>
              <div className="text-sm text-[#F5F5F0]/70">Реализованных проектов</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-3 text-[#B58B52]">15</div>
              <div className="text-sm text-[#F5F5F0]/70">Лет на рынке</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-3 text-[#B58B52]">98%</div>
              <div className="text-sm text-[#F5F5F0]/70">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-3 text-[#B58B52]">50+</div>
              <div className="text-sm text-[#F5F5F0]/70">Специалистов</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
