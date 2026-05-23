import { useState } from 'react';
import { Search, Plus, Minus, X, Home as HomeIcon, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useEstimate } from '../context/EstimateContext';
import { Button } from '../components/Button';
import { SubmitModal } from '../components/SubmitModal';

export function Calculator() {
  const { services, categories } = useData();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
  const [showModal, setShowModal] = useState(false);
  const [prefillComment, setPrefillComment] = useState('');
  const { items, addItem, removeItem, updateQuantity, clearAll } = useEstimate();

  const filteredItems = services.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.isActive;
  });

  const handleAddToEstimate = (itemId: string) => {
    const quantity = localQuantities[itemId] || 1;
    const workItem = services.find(item => item.id === itemId);
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

  const handleTurnkeyRequest = (type: string) => {
    setPrefillComment(`Интересует расчет дома под ключ: ${type}`);
    setShowModal(true);
  };

  const turnkeyPackages = [
    {
      title: 'Стандарт',
      price: 'от 45 000 ₽/м²',
      features: ['Фундамент монолитный', 'Стены газобетон', 'Кровля металлочерепица', 'Черновая отделка'],
      icon: HomeIcon
    },
    {
      title: 'Комфорт',
      price: 'от 65 000 ₽/м²',
      features: ['Фундамент плита', 'Стены кирпич/блок', 'Утепленная кровля', 'Предчистовая отделка', 'Разводка инженерии'],
      icon: CheckCircle
    },
    {
      title: 'Премиум',
      price: 'от 95 000 ₽/м²',
      features: ['Индивидуальный проект', 'Монолитно-каркасная технология', 'Панорамное остекление', 'Фасад натуральный камень', 'Дизайнерский ремонт'],
      icon: HomeIcon
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-6 md:py-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <h1 className="mb-8 md:mb-12 text-2xl md:text-4xl font-serif text-[#1A1A1A]">Калькулятор работ</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Left Column: Work Catalog */}
          <div className="lg:col-span-2 bg-white p-4 md:p-8 shadow-sm">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-8 border-b border-[#1A1A1A]/10">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`pb-4 text-xs md:text-sm tracking-wide transition-colors relative ${
                    activeCategory === category.slug
                      ? 'text-[#1A1A1A] font-bold'
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
                className="w-full pl-12 pr-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors text-sm md:text-base"
              />
            </div>

            {/* Work Items List */}
            <div className="space-y-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border border-[#1A1A1A]/10 hover:border-[#B58B52]/50 transition-colors gap-4"
                >
                  <div className="flex-1">
                    <h4 className="mb-1 text-sm md:text-base font-medium">{item.name}</h4>
                    <p className="text-xs md:text-sm text-[#1A1A1A]/60">Единица: {item.unit}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex items-center border border-[#1A1A1A]/20 bg-white rounded-sm overflow-hidden">
                      <button onClick={() => decrementLocal(item.id)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-[#F5F5F0] transition-colors"><Minus className="w-3 h-3 md:w-4 md:h-4" /></button>
                      <input type="number" min="1" value={localQuantities[item.id] || 1} onChange={(e) => setLocalQuantities(prev => ({...prev, [item.id]: Math.max(1, parseInt(e.target.value) || 1)}))} className="w-10 h-8 md:w-16 md:h-10 text-center border-none focus:outline-none text-sm" />
                      <button onClick={() => incrementLocal(item.id)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-[#F5F5F0] transition-colors"><Plus className="w-3 h-3 md:w-4 md:h-4" /></button>
                    </div>
                    <Button onClick={() => handleAddToEstimate(item.id)} variant="outline" className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm whitespace-nowrap">Добавить</Button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && <div className="text-center py-12 text-[#1A1A1A]/60">Работы не найдены</div>}
            </div>
          </div>

          {/* Right Column: Estimate Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 sticky top-24 shadow-md border-t-4 border-[#B58B52]">
              <h3 className="mb-6 text-xl font-serif">Ваша смета</h3>
              {items.length === 0 ? (
                <p className="text-sm text-[#1A1A1A]/60 py-8 text-center border-2 border-dashed border-[#1A1A1A]/10">Добавьте работы из каталога</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map(item => (
                      <div key={item.workItem.id} className="pb-4 border-b border-[#1A1A1A]/10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 pr-2"><h4 className="text-xs md:text-sm font-medium">{item.workItem.name}</h4></div>
                          <button onClick={() => removeItem(item.workItem.id)} className="text-[#1A1A1A]/40 hover:text-red-600 transition-colors p-1"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.workItem.id, parseInt(e.target.value) || 1)} className="w-16 md:w-20 px-2 py-1 text-xs md:text-sm border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none" />
                          <span className="text-xs md:text-sm text-[#1A1A1A]/60">{item.workItem.unit}</span>
                          <span className="ml-auto text-xs md:text-sm font-bold">{(item.quantity * item.workItem.price).toLocaleString()} ₽</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#F5F5F0] p-4 mb-6">
                    <div className="flex justify-between items-center mb-1 font-bold">
                      <span className="text-sm uppercase tracking-wider opacity-60">Итого:</span>
                      <span className="text-lg text-[#B58B52] font-serif">{items.reduce((sum, i) => sum + i.quantity * i.workItem.price, 0).toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button onClick={() => { setPrefillComment(''); setShowModal(true); }} variant="primary" className="w-full py-4 text-xs md:text-sm uppercase tracking-widest font-bold">Оформить заявку</Button>
                    <button onClick={clearAll} className="w-full py-2 text-[10px] text-[#1A1A1A]/40 hover:text-red-600 transition-colors uppercase tracking-widest">Очистить всё</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Turnkey Section */}
        <section className="mt-12 md:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#1A1A1A]">Строительство домов под ключ</h2>
            <div className="w-20 h-1 bg-[#B58B52] mx-auto mb-6"></div>
            <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto">
              Выберите готовое решение или оставьте заявку на индивидуальный расчет вашего будущего дома в Сочи.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {turnkeyPackages.map((pkg, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 border border-[#1A1A1A]/5 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="mb-6">
                  <pkg.icon className="w-12 h-12 text-[#B58B52] mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-serif mb-2">{pkg.title}</h3>
                  <div className="text-xl text-[#B58B52] font-medium mb-6">{pkg.price}</div>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-sm text-[#1A1A1A]/70">
                      <div className="w-1.5 h-1.5 bg-[#B58B52] mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleTurnkeyRequest(pkg.title)}
                  variant="outline" 
                  className="w-full py-4 text-xs uppercase tracking-widest group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors"
                >
                  Оставить заявку
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#1A1A1A] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B58B52] opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full" />
            <h3 className="text-2xl md:text-3xl font-serif mb-6 relative z-10">Нужен индивидуальный расчет по вашему проекту?</h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto relative z-10 text-sm md:text-base">
              Пришлите нам свой проект или техническое задание, и наши инженеры подготовят детальную смету в течение 24 часов.
            </p>
            <Button 
              onClick={() => handleTurnkeyRequest('Индивидуальный проект')}
              variant="primary" 
              className="bg-[#B58B52] hover:bg-white hover:text-[#1A1A1A] transition-colors relative z-10 px-12 py-5"
            >
              Заказать расчет проекта
            </Button>
          </div>
        </section>
      </div>

      <SubmitModal 
        isOpen={showModal} 
        onClose={() => { setShowModal(false); setPrefillComment(''); }} 
        prefillComment={prefillComment}
      />
    </div>
  );
}
