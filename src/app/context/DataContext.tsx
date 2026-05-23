import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { WorkItem, Category } from '../data/workItems';
import { Project } from '../data/portfolioItems';

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
  loading: boolean;
  addService: (service: Omit<WorkItem, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<WorkItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addRequest: (request: Omit<Request, 'id' | 'status' | 'date'>) => Promise<void>;
  updateRequestStatus: (id: string, status: Request['status']) => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id' | 'slug'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<WorkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        { data: servicesData },
        { data: categoriesData },
        { data: projectsData },
        { data: requestsData }
      ] = await Promise.all([
        supabase.from('services').select('*').order('name'),
        supabase.from('categories').select('*').order('name'),
        supabase.from('portfolio').select('*').order('id', { ascending: false }),
        supabase.from('requests').select('*').order('created_at', { ascending: false })
      ]);

      if (servicesData) setServices(servicesData);
      if (categoriesData) setCategories(categoriesData);
      if (projectsData) setProjects(projectsData);
      if (requestsData) {
        setRequests(requestsData.map(r => ({
          ...r,
          date: new Date(r.created_at).toLocaleString('ru-RU'),
          grandTotal: r.grand_total
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addService = async (service: Omit<WorkItem, 'id'>) => {
    const { error } = await supabase.from('services').insert([service]);
    if (!error) fetchData();
  };

  const updateService = async (id: string, updatedFields: Partial<WorkItem>) => {
    const { error } = await supabase.from('services').update(updatedFields).eq('id', id);
    if (!error) fetchData();
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) fetchData();
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const { error } = await supabase.from('portfolio').insert([project]);
    if (!error) fetchData();
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    const { error } = await supabase.from('portfolio').update(updatedFields).eq('id', id);
    if (!error) fetchData();
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('portfolio').delete().eq('id', id);
    if (!error) fetchData();
  };

  const addRequest = async (requestData: Omit<Request, 'id' | 'status' | 'date'>) => {
    const { error } = await supabase.from('requests').insert([{
      name: requestData.name,
      phone: requestData.phone,
      comment: requestData.comment,
      grand_total: requestData.grandTotal,
      items: requestData.items,
      status: 'new'
    }]);
    if (!error) fetchData();
  };

  const updateRequestStatus = async (id: string, status: Request['status']) => {
    const { error } = await supabase.from('requests').update({ status }).eq('id', id);
    if (!error) fetchData();
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from('requests').delete().eq('id', id);
    if (!error) fetchData();
  };

  const addCategory = async (categoryData: Omit<Category, 'id' | 'slug'>) => {
    const slug = categoryData.name.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('categories').insert([{ ...categoryData, slug }]);
    if (!error) fetchData();
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) fetchData();
  };

  return (
    <DataContext.Provider value={{ 
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
