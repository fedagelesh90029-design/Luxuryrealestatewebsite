import { useState } from 'react';
import { Plus, Info, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useData } from '../context/DataContext';
import { useEstimate } from '../context/EstimateContext';
import { WorkItem } from '../data/workItems';

export function Catalog() {
  const { services, categories } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<WorkItem | null>(null);
  const { addItem } = useEstimate();
  const navigate = useNavigate();

  const filteredItems = services.filter(item => {
    if (activeCategory === 'all') return item.isActive;
    return item.category === activeCategory && item.isActive;
  });

  const handleQuickAdd = (e: React.MouseEvent, item: WorkItem) => {
    e.stopPropagation();
    addItem(item, 1);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h1 className="mb-12">Каталог работ</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#1A1A1A] text-[#F5F5F0]'
                : 'bg-white text-[#1A1A1A] hover:bg-[#F5F5F0]'
            }`}
          >
            Все работы
          </button>
          {categories.map(category => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-6 py-2 transition-colors ${
                activeCategory === category.slug
                  ? 'bg-[#1A1A1A] text-[#F5F5F0]'
                  : 'bg-white text-[#1A1A1A] hover:bg-[#F5F5F0]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Work Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item)}
              className="bg-white p-6 group hover:shadow-lg transition-shadow cursor-pointer relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="mb-2">{item.name}</h4>
                  <p className="text-sm text-[#1A1A1A]/60">Единица: {item.unit}</p>
                </div>
              </div>
              <div className="text-xs text-[#1A1A1A]/40 uppercase tracking-wider">
                {categories.find(c => c.slug === item.category)?.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/80 p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white max-w-xl w-full p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 hover:text-[#B58B52] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mb-6">
              <div className="text-xs text-[#B58B52] uppercase tracking-widest mb-2">
                {categories.find(c => c.slug === selectedService.category)?.name}
              </div>
              <h2 className="mb-2">{selectedService.name}</h2>
              <p className="text-sm text-[#1A1A1A]/60">Единица измерения: {selectedService.unit}</p>
            </div>
            
            <div className="prose prose-sm max-w-none text-[#1A1A1A]/70 mb-8">
              <h4 className="text-[#1A1A1A] mb-2 font-serif">Описание услуги:</h4>
              <p>
                {selectedService.description || 'Описание для данной услуги находится в процессе наполнения. Пожалуйста, свяжитесь с нашим менеджером для получения подробной консультации по данному виду работ.'}
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  addItem(selectedService, 1);
                  navigate('/calculator');
                }}
                className="flex-1 bg-[#1A1A1A] text-white py-3 hover:bg-[#B58B52] transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Рассчитать стоимость
              </button>
              <button 
                onClick={() => setSelectedService(null)}
                className="flex-1 border border-[#1A1A1A]/20 py-3 hover:bg-[#F5F5F0] transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
