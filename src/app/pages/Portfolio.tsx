import { useState } from 'react';
import { X } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useData } from '../context/DataContext';
import { Project } from '../data/portfolioItems';

export function Portfolio() {
  const { projects, loading } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white animate-pulse">
                  <div className="aspect-[4/3] bg-[#1A1A1A]/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-[#1A1A1A]/5 w-3/4" />
                    <div className="flex justify-between">
                      <div className="h-4 bg-[#1A1A1A]/5 w-1/4" />
                      <div className="h-4 bg-[#1A1A1A]/5 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Masonry gutter="24px">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white cursor-pointer group overflow-hidden"
                >
                  <div className="overflow-hidden relative">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                        {project.images.length} Фото
                      </div>
                    )}
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
          )}
        </ResponsiveMasonry>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/90 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-5xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white flex items-center justify-center hover:bg-[#B58B52] hover:text-white transition-all shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Gallery */}
              <div className="bg-[#1A1A1A]">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div className="space-y-4 p-4 lg:p-8">
                    {selectedProject.images.map((img, idx) => (
                      <div key={idx} className="w-full">
                        <ImageWithFallback
                          src={img}
                          alt={`${selectedProject.title} - ${idx + 1}`}
                          className="w-full h-auto object-contain max-h-[80vh] mx-auto shadow-2xl"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[60vh] min-h-[400px]">
                    <ImageWithFallback
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-12 lg:p-20 bg-white">
              <div className="max-w-3xl">
                <div className="text-[#B58B52] text-xs uppercase tracking-[0.3em] font-bold mb-4">
                  {filters.find(f => f.value === selectedProject.category)?.label}
                </div>
                <h2 className="text-4xl lg:text-5xl mb-12 font-serif leading-tight">{selectedProject.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 py-10 border-y border-[#1A1A1A]/10">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-3 font-bold">Локация</div>
                    <div className="text-lg">{selectedProject.location}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-3 font-bold">Площадь</div>
                    <div className="text-lg">{selectedProject.area}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-3 font-bold">Год реализации</div>
                    <div className="text-lg">{selectedProject.year}</div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-[#1A1A1A]/70 text-xl leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
