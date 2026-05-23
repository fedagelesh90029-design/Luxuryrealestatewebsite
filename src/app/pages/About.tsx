import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { siteConfig } from '../data/siteConfig';

export function About() {
  const values = [
    {
      title: 'Надежность',
      description: 'Строим как для себя. Каждый узел и каждый шов проходят строгий технический контроль.',
    },
    {
      title: 'Сроки',
      description: 'Мы ценим ваше время. Четкое планирование позволяет нам сдавать объекты точно в срок.',
    },
    {
      title: 'Прозрачность',
      description: 'Честные сметы без скрытых платежей. Вы всегда знаете, за что платите.',
    },
    {
      title: 'Гарантия',
      description: 'Несем полную ответственность за результат. Гарантия на все виды работ по договору.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/about_hero.jpg"
            alt="О компании"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-white uppercase">О КОМПАНИИ</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-8 font-serif">{siteConfig.name}: Качество, проверенное делом</h2>
              <div className="space-y-6 text-[#1A1A1A]/70 leading-relaxed text-lg">
                <p>
                  Мы — команда профессионалов, объединенных одной целью: строить дома, которые станут крепостью для нескольких поколений. Наш подход основан на исключении «халтуры» и строгом соблюдении строительных норм.
                </p>
                <p>
                  В условиях Сочи строительство требует особого внимания к грунтам и сейсмике. Мы специализируемся на возведении сложных фундаментов и монолитных каркасов, адаптированных под местный ландшафт.
                </p>
                <p>
                  Для нас строительство — это не просто бизнес, это искусство создания пространства для жизни. Мы берем на себя все хлопоты: от детального расчета сметы до финишной отделки.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ImageWithFallback 
                  src="/images/project3.jpg" 
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="bg-[#B58B52] p-8 text-[#1A1A1A]">
                  <div className="text-4xl font-serif mb-2">50+</div>
                  <div className="text-sm uppercase tracking-wider font-bold">Проектов</div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-[#1A1A1A] p-8 text-white">
                  <div className="text-4xl font-serif mb-2">100%</div>
                  <div className="text-sm uppercase tracking-wider font-bold">Гарантия</div>
                </div>
                <ImageWithFallback 
                  src="/images/project4.jpg" 
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="absolute top-0 right-0 opacity-10 text-[200px] font-serif select-none pointer-events-none -translate-y-1/4 translate-x-1/4">
            {siteConfig.shortName}
          </div>
          <div className="max-w-3xl">
            <h2 className="mb-12 text-white border-l-4 border-[#B58B52] pl-8">Почему выбирают нас?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <div key={index}>
                  <h4 className="text-[#B58B52] mb-4 text-xl font-serif">{value.title}</h4>
                  <p className="text-white/60 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
