export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  year: string;
  image: string;
  images?: string[];
  description: string;
}

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Вилла "Эвкалипт"',
    category: 'private',
    location: 'Сочи, Хоста',
    area: '420 м²',
    year: '2024',
    image: '/images/project1.jpg',
    description: 'Современная вилла в стиле хай-тек с эксплуатируемой кровлей и панорамным бассейном-инфинити.',
  },
  {
    id: '2',
    title: 'ЖК "Морской Бриз"',
    category: 'residential',
    location: 'Адлер',
    area: '15 400 м²',
    year: '2023',
    image: '/images/project2.jpg',
    description: 'Жилой комплекс комфорт-класса с собственной парковой зоной и подземным паркингом.',
  },
  {
    id: '3',
    title: 'Резиденция "Олимп"',
    category: 'private',
    location: 'Красная Поляна',
    area: '580 м²',
    year: '2024',
    image: '/images/project3.jpg',
    description: 'Шале премиум-класса из клееного бруса и натурального камня с видом на Кавказский хребет.',
  },
  {
    id: '4',
    title: 'Отель "Azura Resort"',
    category: 'commercial',
    location: 'Сочи, Центр',
    area: '8 200 м²',
    year: '2025',
    image: '/images/contacts_hero.jpg',
    description: 'Бутик-отель на первой береговой линии с авторским дизайном интерьеров и СПА-комплексом.',
  },
  {
    id: '5',
    title: 'Бизнес-центр "Вертикаль"',
    category: 'commercial',
    location: 'Сочи, Дагомыс',
    area: '4 500 м²',
    year: '2023',
    image: '/images/project1.jpg',
    description: 'Современное офисное здание класса А с фасадным остеклением и открытыми террасами.',
  },
  {
    id: '6',
    title: 'Дом "Кедровая Роща"',
    category: 'private',
    location: 'Геленджик',
    area: '320 м²',
    year: '2024',
    image: '/images/project2.jpg',
    description: 'Загородный дом в средиземноморском стиле с ландшафтным дизайном и зоной барбекю.',
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
  {
    id: '8',
    title: 'Ресторан "Терраса"',
    category: 'commercial',
    location: 'Сириус',
    area: '1 200 м²',
    year: '2024',
    image: '/images/about_hero.jpg',
    description: 'Реконструкция и отделка панорамного ресторана с видом на Олимпийский парк.',
  },
];
