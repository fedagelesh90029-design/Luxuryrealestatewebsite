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
  { id: '1', name: 'Подготовительный этап', slug: 'prep' },
  { id: '2', name: 'Фундамент', slug: 'foundation' },
  { id: '3', name: 'Коробка здания', slug: 'walls' },
  { id: '4', name: 'Кровля', slug: 'roofing' },
  { id: '5', name: 'Фасады и остекление', slug: 'facade' },
  { id: '6', name: 'Инженерные сети', slug: 'engineering' },
  { id: '7', name: 'Черновая отделка', slug: 'interior_rough' },
];

export const workItems: WorkItem[] = [
  // Подготовительный этап
  { id: '1', name: 'Геодезическая разбивка осей', unit: 'усл.ед', price: 15000, category: 'prep', isActive: true },
  { id: '2', name: 'Разработка грунта экскаватором', unit: 'м³', price: 850, category: 'prep', isActive: true },
  { id: '3', name: 'Вывоз грунта и утилизация', unit: 'м³', price: 650, category: 'prep', isActive: true },
  
  // Фундамент
  { id: '4', name: 'Устройство щебеночно-песчаного основания', unit: 'м³', price: 2800, category: 'foundation', isActive: true },
  { id: '5', name: 'Монтаж опалубки фундамента', unit: 'м²', price: 950, category: 'foundation', isActive: true },
  { id: '6', name: 'Вязка арматурного каркаса', unit: 'т', price: 45000, category: 'foundation', isActive: true },
  { id: '7', name: 'Бетонирование фундаментной плиты (с бетоном)', unit: 'м³', price: 14500, category: 'foundation', isActive: true },
  { id: '8', name: 'Гидроизоляция фундамента обмазочная', unit: 'м²', price: 550, category: 'foundation', isActive: true },
  
  // Коробка здания
  { id: '9', name: 'Возведение стен из газобетона (D500)', unit: 'м³', price: 5500, category: 'walls', isActive: true },
  { id: '10', name: 'Кладка перегородок из кирпича', unit: 'м²', price: 1200, category: 'walls', isActive: true },
  { id: '11', name: 'Устройство монолитного армопояса', unit: 'м.п.', price: 2200, category: 'walls', isActive: true },
  { id: '12', name: 'Монтаж сборных ж/б перекрытий', unit: 'шт', price: 4500, category: 'walls', isActive: true },
  { id: '13', name: 'Монолитное перекрытие (работа+материалы)', unit: 'м²', price: 8500, category: 'walls', isActive: true },
  
  // Кровля
  { id: '14', name: 'Монтаж стропильной системы', unit: 'м²', price: 1800, category: 'roofing', isActive: true },
  { id: '15', name: 'Утепление кровли (200мм)', unit: 'м²', price: 1100, category: 'roofing', isActive: true },
  { id: '16', name: 'Монтаж металлочерепицы Grand Line', unit: 'м²', price: 1450, category: 'roofing', isActive: true },
  { id: '17', name: 'Устройство плоской кровли (ПВХ-мембрана)', unit: 'м²', price: 2900, category: 'roofing', isActive: true },
  
  // Фасады и остекление
  { id: '18', name: 'Утепление фасада (базальтовая плита)', unit: 'м²', price: 1650, category: 'facade', isActive: true },
  { id: '19', name: 'Нанесение декоративной штукатурки (Короед)', unit: 'м²', price: 1200, category: 'facade', isActive: true },
  { id: '20', name: 'Облицовка фасада термопанелями', unit: 'м²', price: 3500, category: 'facade', isActive: true },
  { id: '21', name: 'Монтаж ПВХ окон (Rehau 70мм)', unit: 'м²', price: 9500, category: 'facade', isActive: true },
  
  // Инженерные сети
  { id: '22', name: 'Разводка труб водоснабжения (Rehau)', unit: 'тчк', price: 4500, category: 'engineering', isActive: true },
  { id: '23', name: 'Монтаж водяного теплого пола', unit: 'м²', price: 1800, category: 'engineering', isActive: true },
  { id: '24', name: 'Электромонтажные работы (черновые)', unit: 'тчк', price: 1100, category: 'engineering', isActive: true },
  { id: '25', name: 'Установка и обвязка котла', unit: 'шт', price: 25000, category: 'engineering', isActive: true },
  
  // Черновая отделка
  { id: '26', name: 'Штукатурка стен механизированная', unit: 'м²', price: 750, category: 'interior_rough', isActive: true },
  { id: '27', name: 'Полусухая стяжка пола', unit: 'м²', price: 950, category: 'interior_rough', isActive: true },
  { id: '28', name: 'Монтаж ГКЛ на потолок', unit: 'м²', price: 1400, category: 'interior_rough', isActive: true },
];
