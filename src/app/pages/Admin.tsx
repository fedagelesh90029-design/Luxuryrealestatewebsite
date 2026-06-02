import { useState } from 'react';
import { LayoutDashboard, FileText, Package, FolderOpen, Plus, Pencil, Trash2, Download, Image as ImageIcon, X, Check, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Button } from '../components/Button';
import { WorkItem, Category } from '../data/workItems';
import { Project } from '../data/portfolioItems';
import { siteConfig } from '../data/siteConfig';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type View = 'requests' | 'works' | 'categories' | 'portfolio';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { 
    services, 
    categories, 
    projects, 
    requests, 
    loading,
    addService, 
    updateService, 
    deleteService, 
    addProject, 
    updateProject,
    deleteProject,
    updateRequestStatus,
    deleteRequest,
    addCategory,
    deleteCategory
  } = useData();
  
  const [activeView, setActiveView] = useState<View>('requests');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  
  const [editingService, setEditingService] = useState<WorkItem | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [newService, setNewService] = useState<Omit<WorkItem, 'id'>>({
    name: '',
    unit: 'м²',
    price: 0,
    category: categories[0]?.slug || '',
    isActive: true,
    description: ''
  });

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'residential',
    location: '',
    area: '',
    year: new Date().getFullYear().toString(),
    image: '',
    description: ''
  });

  const [newCatName, setNewCatName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'belstroy' && password === 'belstroy') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
        <div className="bg-white p-8 shadow-xl max-w-sm w-full border-t-4 border-[#B58B52]">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl mb-2">{siteConfig.name}</h1>
            <p className="text-xs uppercase tracking-widest opacity-40">Вход в панель управления</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Логин</label>
              <input 
                type="text" 
                className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none"
                value={login}
                onChange={e => setLogin(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Пароль</label>
              <input 
                type="password" 
                className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 text-[10px] uppercase tracking-widest text-center">{error}</p>}
            <Button type="submit" className="w-full py-4 uppercase tracking-widest text-[10px] font-bold">Войти</Button>
          </form>
          <div className="mt-8 text-center">
            <a href="/" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">← Вернуться на сайт</a>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'requests' as View, label: 'Заявки', icon: FileText },
    { id: 'works' as View, label: 'Работы', icon: Package },
    { id: 'portfolio' as View, label: 'Портфолио', icon: ImageIcon },
    { id: 'categories' as View, label: 'Категории', icon: FolderOpen },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-[#B58B52] text-white',
      contacted: 'bg-[#3A5A40] text-white',
      completed: 'bg-[#1A1A1A]/20 text-[#1A1A1A]',
    };
    return colors[status] || '';
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, newService);
      setEditingService(null);
    } else {
      addService(newService);
    }
    setShowAddService(false);
    setNewService({ name: '', unit: 'м²', price: 0, category: categories[0]?.slug || '', isActive: true, description: '' });
  };

  const handleEditService = (service: WorkItem) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      unit: service.unit,
      price: service.price,
      category: service.category,
      isActive: service.isActive,
      description: service.description || ''
    });
    setShowAddService(true);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, newProject);
      setEditingProject(null);
    } else {
      addProject(newProject);
    }
    setShowAddProject(false);
    setNewProject({ title: '', category: 'residential', location: '', area: '', year: '2026', image: '', description: '' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setNewProject(prev => ({ ...prev, image: compressedBase64 }));
          setIsUploading(false);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      category: project.category,
      location: project.location,
      area: project.area,
      year: project.year,
      image: project.image,
      description: project.description
    });
    setShowAddProject(true);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory({ name: newCatName.trim() });
      setNewCatName('');
      setShowAddCategory(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex text-[#1A1A1A]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] text-[#F5F5F0] p-6 flex flex-col">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              {siteConfig.logo ? (
                <img src={siteConfig.logo} alt={siteConfig.shortName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#B58B52] flex items-center justify-center">
                  <span className="font-serif text-xl text-[#1A1A1A]">{siteConfig.shortName}</span>
                </div>
              )}
            </div>
            <span className="font-serif text-xl">{siteConfig.name}</span>
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
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {/* Requests View */}
        {activeView === 'requests' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Заявки на расчет</h2>
              <div className="text-sm opacity-50">{requests.length} заявок всего</div>
            </div>

            <div className="space-y-6">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-6 border-l-4 border-[#B58B52]/20 shadow-sm animate-pulse">
                    <div className="h-6 bg-[#1A1A1A]/5 w-1/4 mb-4" />
                    <div className="h-20 bg-[#1A1A1A]/5 w-full mb-4" />
                    <div className="h-32 bg-[#1A1A1A]/5 w-full" />
                  </div>
                ))
              ) : requests.length === 0 ? (
                <div className="bg-white p-12 text-center text-[#1A1A1A]/40 border-2 border-dashed">
                  Заявок пока нет
                </div>
              ) : (
                requests.map(request => (
                  <div key={request.id} className="bg-white p-6 border-l-4 border-[#B58B52] shadow-sm relative group text-[#1A1A1A]">
                    <button 
                      onClick={() => deleteRequest(request.id)}
                      className="absolute top-4 right-4 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl mb-1">{request.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/60">
                          <span className="font-medium text-[#1A1A1A]">{request.phone}</span>
                          <span>•</span>
                          <span>{request.date}</span>
                        </div>
                      </div>
                      <select 
                        value={request.status}
                        onChange={(e) => updateRequestStatus(request.id, e.target.value as any)}
                        className={`text-xs px-3 py-1 border-none focus:outline-none ${getStatusColor(request.status)}`}
                      >
                        <option value="new">Новая</option>
                        <option value="contacted">Связались</option>
                        <option value="completed">Завершена</option>
                      </select>
                    </div>

                    <div className="mb-6 p-4 bg-[#F5F5F0] border-l-2 border-[#1A1A1A]/10 italic text-sm">
                      {request.comment}
                    </div>

                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#1A1A1A]/10 opacity-40 uppercase tracking-widest text-left">
                          <th className="py-3">Работа</th>
                          <th className="text-right py-3">Кол-во</th>
                          <th className="text-right py-3">Цена</th>
                          <th className="text-right py-3">Сумма</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1A1A1A]/5">
                        {request.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-3 font-medium">{item.name}</td>
                            <td className="text-right py-3 opacity-60">{item.quantity} {item.unit}</td>
                            <td className="text-right py-3 opacity-60">{item.price.toLocaleString()} ₽</td>
                            <td className="text-right py-3 font-bold">{item.total.toLocaleString()} ₽</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="text-right py-4 font-serif text-sm uppercase">Итого:</td>
                          <td className="text-right py-4 font-serif text-lg text-[#B58B52]">{request.grandTotal.toLocaleString()} ₽</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Works View */}
        {activeView === 'works' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Справочник работ</h2>
              <Button variant="primary" className="flex items-center gap-2" onClick={() => {
                setEditingService(null);
                setNewService({ name: '', unit: 'м²', price: 0, category: categories[0]?.slug || '', isActive: true, description: '' });
                setShowAddService(true);
              }}>
                <Plus className="w-4 h-4" />
                Добавить работу
              </Button>
            </div>

            <div className="bg-white overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-[#F5F5F0]">
                  <tr>
                    <th className="text-left py-4 px-6 uppercase tracking-widest text-[10px]">Название</th>
                    <th className="text-left py-4 px-6 uppercase tracking-widest text-[10px]">Категория</th>
                    <th className="text-center py-4 px-6 uppercase tracking-widest text-[10px]">Ед. изм.</th>
                    <th className="text-right py-4 px-6 uppercase tracking-widest text-[10px]">Цена</th>
                    <th className="text-center py-4 px-6 uppercase tracking-widest text-[10px]">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/5">
                  {loading ? (
                    [1, 2, 3, 4, 5].map(i => (
                      <tr key={i} className="animate-pulse">
                        <td className="py-4 px-6"><div className="h-4 bg-[#1A1A1A]/5 w-3/4" /></td>
                        <td className="py-4 px-6"><div className="h-4 bg-[#1A1A1A]/5 w-1/2" /></td>
                        <td className="py-4 px-6"><div className="h-4 bg-[#1A1A1A]/5 w-1/4 mx-auto" /></td>
                        <td className="py-4 px-6"><div className="h-4 bg-[#1A1A1A]/5 w-1/4 ml-auto" /></td>
                        <td className="py-4 px-6"><div className="h-8 bg-[#1A1A1A]/5 w-16 mx-auto" /></td>
                      </tr>
                    ))
                  ) : services.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F5F5F0]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium">{item.name}</div>
                        {item.description && <div className="text-[10px] opacity-40 line-clamp-1">{item.description}</div>}
                      </td>
                      <td className="py-4 px-6 text-[#1A1A1A]/60">
                        {categories.find(c => c.slug === item.category)?.name}
                      </td>
                      <td className="text-center py-4 px-6">{item.unit}</td>
                      <td className="text-right py-4 px-6 font-bold">{item.price.toLocaleString()} ₽</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleEditService(item)} className="p-2 hover:bg-[#F5F5F0] transition-colors"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => deleteService(item.id)} className="p-2 hover:bg-[#F5F5F0] transition-colors text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Portfolio View */}
        {activeView === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Управление портфолио</h2>
              <Button variant="primary" className="flex items-center gap-2" onClick={() => {
                setEditingProject(null);
                setNewProject({ title: '', category: 'residential', location: '', area: '', year: '2026', image: '', description: '' });
                setShowAddProject(true);
              }}>
                <Plus className="w-4 h-4" />
                Добавить проект
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white overflow-hidden border border-[#1A1A1A]/10 shadow-sm animate-pulse">
                    <div className="h-48 bg-[#1A1A1A]/5" />
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-[#1A1A1A]/5 w-3/4" />
                      <div className="h-4 bg-[#1A1A1A]/5 w-1/2" />
                    </div>
                  </div>
                ))
              ) : projects.map(project => (
                <div key={project.id} className="bg-white group overflow-hidden border border-[#1A1A1A]/10 shadow-sm">
                  <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => handleEditProject(project)}>
                    <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <Pencil className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-start">
                    <div>
                      <h3 className="text-lg mb-1">{project.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-[#B58B52]">{project.category} • {project.year}</p>
                    </div>
                    <button onClick={() => deleteProject(project.id)} className="text-red-600 p-2 hover:bg-[#F5F5F0] rounded-full transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories View */}
        {activeView === 'categories' && (
          <div>
            {selectedCategorySlug ? (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedCategorySlug(null)}
                      className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h2>Работы в категории: {categories.find(c => c.slug === selectedCategorySlug)?.name}</h2>
                  </div>
                  <Button variant="primary" className="flex items-center gap-2" onClick={() => {
                    setEditingService(null);
                    setNewService({ name: '', unit: 'м²', price: 0, category: selectedCategorySlug, isActive: true, description: '' });
                    setShowAddService(true);
                  }}>
                    <Plus className="w-4 h-4" />
                    Добавить работу
                  </Button>
                </div>

                <div className="bg-white overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F5F5F0]">
                      <tr>
                        <th className="text-left py-4 px-6 uppercase tracking-widest text-[10px]">Название</th>
                        <th className="text-center py-4 px-6 uppercase tracking-widest text-[10px]">Ед. изм.</th>
                        <th className="text-right py-4 px-6 uppercase tracking-widest text-[10px]">Цена</th>
                        <th className="text-center py-4 px-6 uppercase tracking-widest text-[10px]">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]/5">
                      {services.filter(s => s.category === selectedCategorySlug).map((item) => (
                        <tr key={item.id} className="hover:bg-[#F5F5F0]/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-medium">{item.name}</div>
                            {item.description && <div className="text-[10px] opacity-40 line-clamp-1">{item.description}</div>}
                          </td>
                          <td className="text-center py-4 px-6">{item.unit}</td>
                          <td className="text-right py-4 px-6 font-bold">{item.price.toLocaleString()} ₽</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleEditService(item)} className="p-2 hover:bg-[#F5F5F0] transition-colors"><Pencil className="w-4 h-4" /></button>
                              <button onClick={() => deleteService(item.id)} className="p-2 hover:bg-[#F5F5F0] transition-colors text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2>Категории работ</h2>
                  <Button variant="primary" className="flex items-center gap-2" onClick={() => setShowAddCategory(true)}>
                    <Plus className="w-4 h-4" />
                    Создать категорию
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(category => {
                    const count = services.filter(item => item.category === category.slug).length;
                    return (
                      <div 
                        key={category.id} 
                        onClick={() => setSelectedCategorySlug(category.slug)}
                        className="bg-white p-8 border-t-4 border-[#B58B52] shadow-sm relative group cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCategory(category.id);
                          }}
                          className="absolute top-4 right-4 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-[#F5F5F0]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <h3 className="mb-2 text-xl">{category.name}</h3>
                        <p className="text-sm text-[#1A1A1A]/40 mb-6 uppercase tracking-widest">{count} работ привязано</p>
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-[#1A1A1A]/20 font-mono">Slug: {category.slug}</div>
                          <span className="text-[10px] uppercase tracking-widest text-[#B58B52] font-bold">Открыть →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {/* Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/80 p-4">
          <div className="bg-white w-full max-w-md p-8 relative overflow-y-auto max-h-[90vh] text-[#1A1A1A]">
            <button onClick={() => setShowAddService(false)} className="absolute top-4 right-4"><X /></button>
            <h3 className="mb-6 font-serif">{editingService ? 'Редактировать работу' : 'Добавить работу'}</h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Название</label>
                <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Ед. изм.</label>
                  <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newService.unit} onChange={e => setNewService({...newService, unit: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Цена</label>
                  <input type="number" className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newService.price} onChange={e => setNewService({...newService, price: Number(e.target.value)})} required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Категория</label>
                <select className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none bg-white" value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})}>
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Описание</label>
                <textarea className="w-full border border-[#1A1A1A]/10 p-3 h-24 focus:border-[#B58B52] outline-none resize-none text-sm" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} placeholder="Опишите услугу..." />
              </div>
              <Button type="submit" className="w-full py-4 uppercase tracking-widest text-[10px] font-bold">Сохранить</Button>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/80 p-4">
          <div className="bg-white w-full max-w-lg p-8 relative overflow-y-auto max-h-[90vh] text-[#1A1A1A]">
            <button onClick={() => setShowAddProject(false)} className="absolute top-4 right-4"><X /></button>
            <h3 className="mb-6 font-serif">{editingProject ? 'Редактировать проект' : 'Добавить проект'}</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Заголовок</label>
                <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Категория</label>
                  <select className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none bg-white" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}>
                    <option value="residential">Жилые комплексы</option>
                    <option value="commercial">Коммерческие</option>
                    <option value="private">Частные дома</option>
                    <option value="industrial">Промышленные</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Год</label>
                  <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Локация</label>
                  <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Площадь</label>
                  <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newProject.area} onChange={e => setNewProject({...newProject, area: e.target.value})} required />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-dashed border-[#1A1A1A]/10 p-4 text-center">
                  {isUploading ? (
                    <div className="py-8 flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-[#B58B52] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs opacity-50">Сжатие фото...</p>
                    </div>
                  ) : newProject.image ? (
                    <div className="relative group inline-block">
                      <img src={newProject.image} alt="Preview" className="max-h-48 mx-auto" />
                      <button 
                        type="button"
                        onClick={() => setNewProject(prev => ({ ...prev, image: '' }))}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-10" />
                      <p className="text-xs opacity-40">Выберите файл или вставьте ссылку ниже</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Загрузить файл</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">URL или Data-строка</label>
                    <textarea 
                      className="w-full border border-[#1A1A1A]/10 p-2 h-10 focus:border-[#B58B52] outline-none resize-none text-[8px] font-mono break-all" 
                      value={newProject.image} 
                      onChange={e => setNewProject({...newProject, image: e.target.value})} 
                      placeholder="https://... или data:image/..." 
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Описание</label>
                <textarea className="w-full border border-[#1A1A1A]/10 p-3 h-24 focus:border-[#B58B52] outline-none resize-none text-sm" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
              </div>
              <Button type="submit" className="w-full py-4 uppercase tracking-widest text-[10px] font-bold">Сохранить</Button>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/80 p-4">
          <div className="bg-white w-full max-w-sm p-8 relative text-[#1A1A1A]">
            <button onClick={() => setShowAddCategory(false)} className="absolute top-4 right-4"><X /></button>
            <h3 className="mb-6 font-serif">Новая категория</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Название раздела</label>
                <input className="w-full border-b border-[#1A1A1A]/20 py-2 focus:border-[#B58B52] outline-none" value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Напр. Отделка фасадов" required />
              </div>
              <Button type="submit" className="w-full py-4 uppercase tracking-widest text-[10px] font-bold">Создать</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
