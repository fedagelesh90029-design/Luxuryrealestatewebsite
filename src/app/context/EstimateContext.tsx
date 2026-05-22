import { createContext, useContext, useState, ReactNode } from 'react';
import { WorkItem } from '../data/workItems';

export interface EstimateItem {
  workItem: WorkItem;
  quantity: number;
}

interface EstimateContextType {
  items: EstimateItem[];
  addItem: (workItem: WorkItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearAll: () => void;
}

const EstimateContext = createContext<EstimateContextType | undefined>(undefined);

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EstimateItem[]>([]);

  const addItem = (workItem: WorkItem, quantity: number) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.workItem.id === workItem.id);
      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + quantity };
        return updated;
      }
      return [...prev, { workItem, quantity }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.workItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems(prev => {
      const updated = prev.map(item =>
        item.workItem.id === itemId ? { ...item, quantity } : item
      );
      return updated.filter(item => item.quantity > 0);
    });
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <EstimateContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearAll }}>
      {children}
    </EstimateContext.Provider>
  );
}

export function useEstimate() {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error('useEstimate must be used within EstimateProvider');
  }
  return context;
}
