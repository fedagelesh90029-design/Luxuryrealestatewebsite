import { useState } from 'react';
import { X } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  area: string;
  year: string;
  image: string;
  description: string;
}

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Жилой комплекс "Резиденция"',
      category: 'residential',
      location: 'Москва',
      area: '12 000 м²',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1775733923991-e7223f9f44bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvciUyMGNvbmNyZXRlfGVufDF8fHx8MTc3NjIzOTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Премиальный жилой комплекс с развитой инфраструктурой',
    },
    {
      id: 2,
      title: 'Офисное здание "Квартал"',
      category: 'commercial',
      location: 'Санкт-Петербург',
      area: '8 500 м²',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1767336470847-dd0b77398367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzaWRlbnRpYWwlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzYyMzkwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Современное бизнес-пространство класса А',
    },
    {
      id: 3,
      title: 'Загородный дом "Panorama"',
      category: 'private',
      location: 'Подмосковье',
      area: '450 м²',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1758184432345-3a433cf2c421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjByZXNpZGVudGlhbCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc3NjIzOTA4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Загородная резиденция с панорамным остеклением',
    },
    {
      id: 4,
      title: 'Торговый центр "Метрополис"',
      category: 'commercial',
      location: 'Казань',
      area: '25 000 м²',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1655794387399-6dd29236eaa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyYWwlMjBkZXRhaWx8ZW58MXx8fHwxNzc2MjM5MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Многофункциональный торговый комплекс',
    },
    {
      id: 5,
      title: 'Реконструкция промздания',
      category: 'industrial',
      location: 'Екатеринбург',
      area: '15 000 м²',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1646809669486-10fea26c5f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBjb25zdHJ1Y3Rpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc2MjM5MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Адаптивная реконструкция промышленного объекта',
    },
    {
      id: 6,
      title: 'Частная вилла "Horizon"',
      category: 'private',
      location: 'Сочи',
      area: '680 м²',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1675962206444-fae52ce23a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYXJjaGl0ZWN0dXJhbCUyMHByb2dyZXNzfGVufDF8fHx8MTc3NjIzOTA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Эксклюзивная вилла с видом на море',
    },
  ];

  const filters = [
    { value: 'all', label: 'Все проекты' },
    { value: 'residential', label: 'Жилые комплексы' },
    { value: 'commercial', label: 'Коммерческие' },
    { value: 'private', label: 'Частные дома' },
    { value: 'industrial', label: 'Промышленные' },
  ];

  const filteredProjects = projects.filter(
    project => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h1 className="mb-12">Портфолио</h1>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 transition-colors ${
                activeFilter === filter.value
                  ? 'bg-[#1A1A1A] text-[#F5F5F0]'
                  : 'bg-white text-[#1A1A1A] hover:bg-[#F5F5F0]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="24px">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white cursor-pointer group overflow-hidden"
              >
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between text-sm text-[#1A1A1A]/60">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/90 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <ImageWithFallback
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto"
              />
            </div>
            <div className="p-12">
              <h2 className="mb-4">{selectedProject.title}</h2>
              <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-[#1A1A1A]/10">
                <div>
                  <div className="text-sm text-[#1A1A1A]/60 mb-1">Локация</div>
                  <div>{selectedProject.location}</div>
                </div>
                <div>
                  <div className="text-sm text-[#1A1A1A]/60 mb-1">Площадь</div>
                  <div>{selectedProject.area}</div>
                </div>
                <div>
                  <div className="text-sm text-[#1A1A1A]/60 mb-1">Год</div>
                  <div>{selectedProject.year}</div>
                </div>
              </div>
              <p className="text-[#1A1A1A]/70">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}