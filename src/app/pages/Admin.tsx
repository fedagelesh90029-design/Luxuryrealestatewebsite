import { useState } from 'react';
import { LayoutDashboard, FileText, Package, FolderOpen, Plus, Pencil, Trash2, Download } from 'lucide-react';
import { workItems, categories, WorkItem } from '../data/workItems';
import { Button } from '../components/Button';

type View = 'requests' | 'works' | 'categories';

interface Request {
  id: string;
  name: string;
  phone: string;
  comment: string;
  status: 'new' | 'contacted' | 'completed';
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
    price: number;
    total: number;
  }>;
  grandTotal: number;
}

export function Admin() {
  const [activeView, setActiveView] = useState<View>('requests');

  // Mock requests data
  const [requests] = useState<Request[]>([
    {
      id: '1',
      name: 'Иван Петров',
      phone: '+7 (495) 123-45-67',
      comment: 'Фундаментные работы для коттеджа 200м²',
      status: 'new',
      date: '2026-04-15 10:30',
      items: [
        { name: 'Земляные работы', quantity: 80, unit: 'м³', price: 1200, total: 96000 },
        { name: 'Монолитный ленточный фундамент', quantity: 20, unit: 'м³', price: 12500, total: 250000 },
        { name: 'Гидроизоляция фундамента', quantity: 120, unit: 'м²', price: 450, total: 54000 },
      ],
      grandTotal: 400000,
    },
    {
      id: '2',
      name: 'Елена Соколова',
      phone: '+7 (812) 987-65-43',
      comment: 'Полная смета на загородный дом',
      status: 'contacted',
      date: '2026-04-14 15:45',
      items: [
        { name: 'Земляные работы', quantity: 120, unit: 'м³', price: 1200, total: 144000 },
        { name: 'Кладка стен из газобетона', quantity: 45, unit: 'м³', price: 4200, total: 189000 },
        { name: 'Стропильная система', quantity: 180, unit: 'м²', price: 1800, total: 324000 },
      ],
      grandTotal: 657000,
    },
    {
      id: '3',
      name: 'Дмитрий Волков',
      phone: '+7 (495) 555-12-34',
      comment: 'Отделочные работы офиса',
      status: 'completed',
      date: '2026-04-13 09:15',
      items: [
        { name: 'Штукатурка стен', quantity: 250, unit: 'м²', price: 480, total: 120000 },
        { name: 'Укладка керамогранита', quantity: 80, unit: 'м²', price: 1200, total: 96000 },
      ],
      grandTotal: 216000,
    },
  ]);

  const menuItems = [
    { id: 'requests' as View, label: 'Заявки', icon: FileText },
    { id: 'works' as View, label: 'Работы', icon: Package },
    { id: 'categories' as View, label: 'Категории', icon: FolderOpen },
  ];

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'Новая',
      contacted: 'Связались',
      completed: 'Завершена',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-[#B58B52] text-white',
      contacted: 'bg-[#3A5A40] text-white',
      completed: 'bg-[#1A1A1A]/20 text-[#1A1A1A]',
    };
    return colors[status] || '';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] text-[#F5F5F0] p-6 flex flex-col">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#B58B52] flex items-center justify-center">
              <span className="font-serif text-xl text-[#1A1A1A]">АР</span>
            </div>
            <span className="font-serif text-xl">АРХИТЕКТОР</span>
          </div>
          <p className="text-xs text-[#F5F5F0]/50">Панель управления</p>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeView === item.id
                    ? 'bg-[#B58B52] text-[#1A1A1A]'
                    : 'text-[#F5F5F0] hover:bg-[#F5F5F0]/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-[#F5F5F0]/10">
          <a href="/" className="text-sm text-[#F5F5F0]/70 hover:text-[#B58B52] transition-colors">
            ← Вернуться на сайт
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Requests View */}
        {activeView === 'requests' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Заявки на расчет</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Экспорт в Excel
              </Button>
            </div>

            <div className="space-y-6">
              {requests.map(request => (
                <div key={request.id} className="bg-white p-6 border-l-4 border-[#B58B52]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">{request.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/60">
                        <span>{request.phone}</span>
                        <span>•</span>
                        <span>{request.date}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-1 text-sm ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </div>

                  <div className="mb-4 p-4 bg-[#F5F5F0]">
                    <p className="text-sm text-[#1A1A1A]/70">{request.comment}</p>
                  </div>

                  {/* Items Table */}
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1A1A1A]/10">
                          <th className="text-left py-3 px-2">Работа</th>
                          <th className="text-right py-3 px-2">Количество</th>
                          <th className="text-right py-3 px-2">Ед. изм.</th>
                          <th className="text-right py-3 px-2">Цена</th>
                          <th className="text-right py-3 px-2">Сумма</th>
                        </tr>
                      </thead>
                      <tbody>
                        {request.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#1A1A1A]/5">
                            <td className="py-3 px-2">{item.name}</td>
                            <td className="text-right py-3 px-2">{item.quantity}</td>
                            <td className="text-right py-3 px-2">{item.unit}</td>
                            <td className="text-right py-3 px-2">{item.price.toLocaleString()} ₽</td>
                            <td className="text-right py-3 px-2">{item.total.toLocaleString()} ₽</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={4} className="text-right py-3 px-2">
                            <strong>Итого:</strong>
                          </td>
                          <td className="text-right py-3 px-2">
                            <strong>{request.grandTotal.toLocaleString()} ₽</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Works View */}
        {activeView === 'works' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Справочник работ</h2>
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Добавить работу
              </Button>
            </div>

            <div className="bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F5F5F0]">
                  <tr>
                    <th className="text-left py-4 px-6">Название</th>
                    <th className="text-left py-4 px-6">Категория</th>
                    <th className="text-center py-4 px-6">Ед. изм.</th>
                    <th className="text-right py-4 px-6">Цена</th>
                    <th className="text-center py-4 px-6">Статус</th>
                    <th className="text-center py-4 px-6">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {workItems.map((item) => (
                    <tr key={item.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F5F5F0]/50">
                      <td className="py-4 px-6">{item.name}</td>
                      <td className="py-4 px-6 text-[#1A1A1A]/60">
                        {categories.find(c => c.slug === item.category)?.name}
                      </td>
                      <td className="text-center py-4 px-6">{item.unit}</td>
                      <td className="text-right py-4 px-6">{item.price.toLocaleString()} ₽</td>
                      <td className="text-center py-4 px-6">
                        <span className={`px-3 py-1 text-xs ${
                          item.isActive ? 'bg-[#3A5A40] text-white' : 'bg-[#1A1A1A]/20 text-[#1A1A1A]'
                        }`}>
                          {item.isActive ? 'Активна' : 'Неактивна'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-[#F5F5F0] transition-colors" title="Редактировать">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-[#F5F5F0] transition-colors text-destructive" title="Удалить">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories View */}
        {activeView === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Категории работ</h2>
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Добавить категорию
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => {
                const count = workItems.filter(item => item.category === category.slug && item.isActive).length;
                return (
                  <div key={category.id} className="bg-white p-6 border border-[#1A1A1A]/10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-2">{category.name}</h3>
                        <p className="text-sm text-[#1A1A1A]/60">{count} работ</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-[#F5F5F0] transition-colors" title="Редактировать">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-[#F5F5F0] transition-colors text-destructive" title="Удалить">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-[#1A1A1A]/40">
                      Slug: {category.slug}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
