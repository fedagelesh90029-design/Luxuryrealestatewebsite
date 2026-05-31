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
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative overflow-hidden bg-[#1A1A1A]" 
              style={{ height: '50vh', minHeight: '300px' }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <ImageWithFallback
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-center"
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
