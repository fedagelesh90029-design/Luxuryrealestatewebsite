export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  year: string;
  image: string;
  description: string;
}

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Жилой комплекс "Резиденция"',
    category: 'residential',
    location: 'Москва',
    area: '12 000 м²',
    year: '2025',
    image: '/images/project1.jpg',
    description: 'Премиальный жилой комплекс с развитой инфраструктурой',
  },
  {
    id: '2',
    title: 'Офисное здание "Квартал"',
    category: 'commercial',
    location: 'Санкт-Петербург',
    area: '8 500 м²',
    year: '2024',
    image: '/images/project2.jpg',
    description: 'Современное бизнес-пространство класса А',
  },
  {
    id: '3',
    title: 'Загородный дом "Panorama"',
    category: 'private',
    location: 'Подмосковье',
    area: '450 м²',
    year: '2024',
    image: '/images/project3.jpg',
    description: 'Загородная резиденция с панорамным остеклением',
  },
  {
    id: '4',
    title: 'Торговый центр "Метрополис"',
    category: 'commercial',
    location: 'Казань',
    area: '25 000 м²',
    year: '2023',
    image: '/images/contacts_hero.jpg',
    description: 'Многофункциональный торговый комплекс',
  },
  {
    id: '5',
    title: 'Реконструкция промздания',
    category: 'industrial',
    location: 'Екатеринбург',
    area: '15 000 м²',
    year: '2023',
    image: '/images/project1.jpg',
    description: 'Адаптивная реконструкция промышленного объекта',
  },
  {
    id: '6',
    title: 'Частная вилла "Horizon"',
    category: 'private',
    location: 'Сочи',
    area: '680 м²',
    year: '2025',
    image: '/images/project2.jpg',
    description: 'Эксклюзивная вилла с видом на море',
  },
  {
    id: '7',
    title: 'Вилла "Отражение"',
    category: 'private',
    location: 'Сочи, Красная Поляна',
    area: '520 м²',
    year: '2026',
    image: '/images/project4.jpg',
    description: 'Современный дом в стиле минимализма с панорамным видом на горы. Использование натурального камня и дерева в отделке.',
  },
];
