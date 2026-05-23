export interface WorkItem {
  id: string;
  name: string;
  unit: string;
  price: number; // Hidden from public, shown in admin
  category: string;
  isActive: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Фундаментные работы', slug: 'foundation' },
  { id: '2', name: 'Стены и перекрытия', slug: 'walls' },
  { id: '3', name: 'Кровельные работы', slug: 'roofing' },
  { id: '4', name: 'Фасадные работы', slug: 'facade' },
  { id: '5', name: 'Внутренняя отделка', slug: 'interior' },
  { id: '6', name: 'Инженерные системы', slug: 'engineering' },
];

export const workItems: WorkItem[] = [
  // Фундаментные работы
  { id: '1', name: 'Земляные работы', unit: 'м³', price: 1200, category: 'foundation', isActive: true },
  { id: '2', name: 'Устройство песчаной подушки', unit: 'м³', price: 800, category: 'foundation', isActive: true },
  { id: '3', name: 'Монолитный ленточный фундамент', unit: 'м³', price: 12500, category: 'foundation', isActive: true },
  { id: '4', name: 'Монолитная плита фундамента', unit: 'м²', price: 5800, category: 'foundation', isActive: true },
  { id: '5', name: 'Гидроизоляция фундамента', unit: 'м²', price: 450, category: 'foundation', isActive: true },
  
  // Стены и перекрытия
  { id: '6', name: 'Кладка стен из газобетона', unit: 'м³', price: 4200, category: 'walls', isActive: true },
  { id: '7', name: 'Кладка стен из кирпича', unit: 'м³', price: 6800, category: 'walls', isActive: true },
  { id: '8', name: 'Монолитные перекрытия', unit: 'м²', price: 4500, category: 'walls', isActive: true },
  { id: '9', name: 'Армирование конструкций', unit: 'т', price: 68000, category: 'walls', isActive: true },
  { id: '10', name: 'Устройство перемычек', unit: 'шт', price: 3200, category: 'walls', isActive: true },
  
  // Кровельные работы
  { id: '11', name: 'Стропильная система', unit: 'м²', price: 1800, category: 'roofing', isActive: true },
  { id: '12', name: 'Обрешетка и контробрешетка', unit: 'м²', price: 650, category: 'roofing', isActive: true },
  { id: '13', name: 'Металлочерепица (монтаж)', unit: 'м²', price: 980, category: 'roofing', isActive: true },
  { id: '14', name: 'Мягкая кровля (монтаж)', unit: 'м²', price: 1450, category: 'roofing', isActive: true },
  { id: '15', name: 'Водосточная система', unit: 'м.п.', price: 1100, category: 'roofing', isActive: true },
  
  // Фасадные работы
  { id: '16', name: 'Утепление фасада минватой', unit: 'м²', price: 1250, category: 'facade', isActive: true },
  { id: '17', name: 'Штукатурка фасада', unit: 'м²', price: 850, category: 'facade', isActive: true },
  { id: '18', name: 'Покраска фасада', unit: 'м²', price: 420, category: 'facade', isActive: true },
  { id: '19', name: 'Облицовка фасада кирпичом', unit: 'м²', price: 3800, category: 'facade', isActive: true },
  { id: '20', name: 'Вентилируемый фасад', unit: 'м²', price: 2900, category: 'facade', isActive: true },
  
  // Внутренняя отделка
  { id: '21', name: 'Штукатурка стен', unit: 'м²', price: 480, category: 'interior', isActive: true },
  { id: '22', name: 'Шпаклевка под покраску', unit: 'м²', price: 380, category: 'interior', isActive: true },
  { id: '23', name: 'Укладка керамогранита', unit: 'м²', price: 1200, category: 'interior', isActive: true },
  { id: '24', name: 'Монтаж гипсокартона', unit: 'м²', price: 650, category: 'interior', isActive: true },
  { id: '25', name: 'Устройство стяжки пола', unit: 'м²', price: 720, category: 'interior', isActive: true },
  
  // Инженерные системы
  { id: '26', name: 'Система отопления', unit: 'м²', price: 2400, category: 'engineering', isActive: true },
  { id: '27', name: 'Водоснабжение', unit: 'м²', price: 1600, category: 'engineering', isActive: true },
  { id: '28', name: 'Канализация', unit: 'м²', price: 1400, category: 'engineering', isActive: true },
  { id: '29', name: 'Электромонтажные работы', unit: 'м²', price: 1800, category: 'engineering', isActive: true },
  { id: '30', name: 'Система вентиляции', unit: 'м²', price: 2200, category: 'engineering', isActive: true },
];
