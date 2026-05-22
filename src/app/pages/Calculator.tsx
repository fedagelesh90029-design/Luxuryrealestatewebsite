import { useState } from 'react';
import { Search, Plus, Minus, X } from 'lucide-react';
import { categories, workItems } from '../data/workItems';
import { useEstimate } from '../context/EstimateContext';
import { Button } from '../components/Button';
import { SubmitModal } from '../components/SubmitModal';

export function Calculator() {
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);
  const [searchQuery, setSearchQuery] = useState('');
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
  const [showModal, setShowModal] = useState(false);
  const { items, addItem, removeItem, updateQuantity, clearAll } = useEstimate();

  const filteredItems = workItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.isActive;
  });

  const handleAddToEstimate = (itemId: string) => {
    const quantity = localQuantities[itemId] || 1;
    const workItem = workItems.find(item => item.id === itemId);
    if (workItem) {
      addItem(workItem, quantity);
      setLocalQuantities(prev => ({ ...prev, [itemId]: 1 }));
    }
  };

  const incrementLocal = (itemId: string) => {
    setLocalQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  };

  const decrementLocal = (itemId: string) => {
    setLocalQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h1 className="mb-12">Калькулятор работ</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Work Catalog */}
          <div className="lg:col-span-2 bg-white p-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-6 mb-8 border-b border-[#1A1A1A]/10">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`pb-4 text-sm tracking-wide transition-colors relative ${
                    activeCategory === category.slug
                      ? 'text-[#1A1A1A]'
                      : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                  }`}
                >
                  {category.name}
                  {activeCategory === category.slug && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B58B52]" />
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A1A1A]/40" />
              <input
                type="text"
                placeholder="Поиск работ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors"
              />
            </div>

            {/* Work Items List */}
            <div className="space-y-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-6 border border-[#1A1A1A]/10 hover:border-[#B58B52]/50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="mb-1">{item.name}</h4>
                    <p className="text-sm text-[#1A1A1A]/60">Единица: {item.unit}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#1A1A1A]/20">
                      <button
                        onClick={() => decrementLocal(item.id)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F0] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={localQuantities[item.id] || 1}
                        onChange={(e) => setLocalQuantities(prev => ({
                          ...prev,
                          [item.id]: Math.max(1, parseInt(e.target.value) || 1),
                        }))}
                        className="w-16 h-10 text-center border-x border-[#1A1A1A]/20 focus:outline-none"
                      />
                      <button
                        onClick={() => incrementLocal(item.id)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F0] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add Button */}
                    <Button
                      onClick={() => handleAddToEstimate(item.id)}
                      variant="outline"
                      className="px-6"
                    >
                      Добавить
                    </Button>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-[#1A1A1A]/60">
                  Работы не найдены
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Estimate Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 sticky top-24">
              <h3 className="mb-6">Ваша смета</h3>

              {items.length === 0 ? (
                <p className="text-sm text-[#1A1A1A]/60 py-8 text-center">
                  Добавьте работы из каталога
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                    {items.map(item => (
                      <div key={item.workItem.id} className="pb-4 border-b border-[#1A1A1A]/10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 pr-2">
                            <h4 className="text-sm">{item.workItem.name}</h4>
                          </div>
                          <button
                            onClick={() => removeItem(item.workItem.id)}
                            className="text-[#1A1A1A]/40 hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.workItem.id, parseInt(e.target.value) || 1)}
                            className="w-20 px-2 py-1 text-sm border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none"
                          />
                          <span className="text-sm text-[#1A1A1A]/60">{item.workItem.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F5F5F0] p-4 mb-6">
                    <p className="text-sm text-[#1A1A1A]/70 text-center">
                      Смета будет рассчитана менеджером
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowModal(true)}
                      variant="primary"
                      className="w-full"
                    >
                      Отправить смету
                    </Button>
                    <Button
                      onClick={clearAll}
                      variant="outline"
                      className="w-full"
                    >
                      Очистить всё
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <SubmitModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
