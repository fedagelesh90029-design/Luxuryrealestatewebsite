import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WorkItem, workItems as initialWorkItems, Category, categories as initialCategories } from '../data/workItems';
import { Project, initialProjects } from '../data/portfolioItems';

export interface RequestItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export interface Request {
  id: string;
  name: string;
  phone: string;
  comment: string;
  status: 'new' | 'contacted' | 'completed';
  date: string;
  items: RequestItem[];
  grandTotal: number;
}

interface DataContextType {
  services: WorkItem[];
  categories: Category[];
  projects: Project[];
  requests: Request[];
  addService: (service: Omit<WorkItem, 'id'>) => void;
  updateService: (id: string, service: Partial<WorkItem>) => void;
  deleteService: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addRequest: (request: Omit<Request, 'id' | 'status' | 'date'>) => void;
  updateRequestStatus: (id: string, status: Request['status']) => void;
  deleteRequest: (id: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'slug'>) => void;
  deleteCategory: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<WorkItem[]>(() => {
    const saved = localStorage.getItem('site_services');
    return saved ? JSON.parse(saved) : initialWorkItems;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('site_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('site_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [requests, setRequests] = useState<Request[]>(() => {
    const saved = localStorage.getItem('site_requests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('site_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('site_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('site_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('site_requests', JSON.stringify(requests));
  }, [requests]);

  const addService = (service: Omit<WorkItem, 'id'>) => {
    const newService = { ...service, id: Math.random().toString(36).substr(2, 9) };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updatedFields: Partial<WorkItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Math.random().toString(36).substr(2, 9) };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addRequest = (requestData: Omit<Request, 'id' | 'status' | 'date'>) => {
    const newRequest: Request = {
      ...requestData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'new',
      date: new Date().toLocaleString('ru-RU'),
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id: string, status: Request['status']) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const addCategory = (categoryData: Omit<Category, 'id' | 'slug'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Math.random().toString(36).substr(2, 9),
      slug: Math.random().toString(36).substr(2, 5) // Simplified slug
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      services, 
      categories, 
      projects, 
      requests,
      addService, 
      updateService, 
      deleteService,
      addProject,
      updateProject,
      deleteProject,
      addRequest,
      updateRequestStatus,
      deleteRequest,
      addCategory,
      deleteCategory
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
