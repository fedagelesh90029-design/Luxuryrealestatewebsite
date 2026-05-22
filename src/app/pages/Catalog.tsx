import { useState } from 'react';
import { Plus } from 'lucide-react';
import { categories, workItems } from '../data/workItems';
import { useEstimate } from '../context/EstimateContext';

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem } = useEstimate();

  const filteredItems = workItems.filter(item => {
    if (activeCategory === 'all') return item.isActive;
    return item.category === activeCategory && item.isActive;
  });

  const handleQuickAdd = (itemId: string) => {
    const workItem = workItems.find(item => item.id === itemId);
    if (workItem) {
      addItem(workItem, 1);
    }
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
              className="bg-white p-6 group hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="mb-2">{item.name}</h4>
                  <p className="text-sm text-[#1A1A1A]/60">Единица: {item.unit}</p>
                </div>
                <button
                  onClick={() => handleQuickAdd(item.id)}
                  className="w-10 h-10 flex items-center justify-center bg-[#F5F5F0] group-hover:bg-[#B58B52] group-hover:text-white transition-colors"
                  title="Добавить в смету"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-[#1A1A1A]/40 uppercase tracking-wider">
                {categories.find(c => c.slug === item.category)?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
