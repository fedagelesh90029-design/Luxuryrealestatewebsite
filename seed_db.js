import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfefcekbemyechbokeik.supabase.co';
const supabaseAnonKey = 'sb_publishable_KjmFaodIDIKsoPXYiyFckw__2xHYjUf';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Starting database seeding...');

  // 1. Portfolio cleanup
  console.log('Cleaning portfolio...');
  await supabase.from('portfolio').delete().not('id', 'is', null);

  // 2. Services cleanup
  console.log('Cleaning services...');
  await supabase.from('services').delete().not('id', 'is', null);

  // 3. Categories cleanup
  console.log('Cleaning categories...');
  await supabase.from('categories').delete().not('id', 'is', null);

  // 4. Seed Categories
  const categories = [
    { name: 'Подготовительный этап', slug: 'prep' },
    { name: 'Фундамент', slug: 'foundation' },
    { name: 'Коробка здания', slug: 'walls' },
    { name: 'Кровля', slug: 'roofing' },
    { name: 'Фасады и остекление', slug: 'facade' },
    { name: 'Инженерные сети', slug: 'engineering' },
    { name: 'Черновая отделка', slug: 'interior_rough' }
  ];

  console.log('Seeding categories...');
  const { error: catError } = await supabase.from('categories').insert(categories);
  if (catError) console.error('Error seeding categories:', catError);
  else console.log('Categories seeded successfully.');

  // 5. Seed Services
  const services = [
    { name: 'Геодезическая разбивка осей', unit: 'усл.ед', price: 15000, category: 'prep', isActive: true },
    { name: 'Разработка грунта экскаватором', unit: 'м³', price: 850, category: 'prep', isActive: true },
    { name: 'Вывоз грунта и утилизация', unit: 'м³', price: 650, category: 'prep', isActive: true },
    { name: 'Устройство щебеночно-песчаного основания', unit: 'м³', price: 2800, category: 'foundation', isActive: true },
    { name: 'Монтаж опалубки фундамента', unit: 'м²', price: 950, category: 'foundation', isActive: true },
    { name: 'Вязка арматурного каркаса', unit: 'т', price: 45000, category: 'foundation', isActive: true },
    { name: 'Бетонирование фундаментной плиты (с бетоном)', unit: 'м³', price: 14500, category: 'foundation', isActive: true },
    { name: 'Гидроизоляция фундамента обмазочная', unit: 'м²', price: 550, category: 'foundation', isActive: true },
    { name: 'Возведение стен из газобетона (D500)', unit: 'м³', price: 5500, category: 'walls', isActive: true },
    { name: 'Кладка перегородок из кирпича', unit: 'м²', price: 1200, category: 'walls', isActive: true },
    { name: 'Устройство монолитного армопояса', unit: 'м.п.', price: 2200, category: 'walls', isActive: true },
    { name: 'Монтаж сборных ж/б перекрытий', unit: 'шт', price: 4500, category: 'walls', isActive: true },
    { name: 'Монолитное перекрытие (работа+материалы)', unit: 'м²', price: 8500, category: 'walls', isActive: true },
    { name: 'Монтаж стропильной системы', unit: 'м²', price: 1800, category: 'roofing', isActive: true },
    { name: 'Утепление кровли (200мм)', unit: 'м²', price: 1100, category: 'roofing', isActive: true },
    { name: 'Монтаж металлочерепицы Grand Line', unit: 'м²', price: 1450, category: 'roofing', isActive: true },
    { name: 'Устройство плоской кровли (ПВХ-мембрана)', unit: 'м²', price: 2900, category: 'roofing', isActive: true },
    { name: 'Утепление фасада (базальтовая плита)', unit: 'м²', price: 1650, category: 'facade', isActive: true },
    { name: 'Нанесение декоративной штукатурки (Короед)', unit: 'м²', price: 1200, category: 'facade', isActive: true },
    { name: 'Облицовка фасада термопанелями', unit: 'м²', price: 3500, category: 'facade', isActive: true },
    { name: 'Монтаж ПВХ окон (Rehau 70мм)', unit: 'м²', price: 9500, category: 'facade', isActive: true },
    { name: 'Разводка труб водоснабжения (Rehau)', unit: 'тчк', price: 4500, category: 'engineering', isActive: true },
    { name: 'Монтаж водяного теплого пола', unit: 'м²', price: 1800, category: 'engineering', isActive: true },
    { name: 'Электромонтажные работы (черновые)', unit: 'тчк', price: 1100, category: 'engineering', isActive: true },
    { name: 'Установка и обвязка котла', unit: 'шт', price: 25000, category: 'engineering', isActive: true },
    { name: 'Штукатурка стен механизированная', unit: 'м²', price: 750, category: 'interior_rough', isActive: true },
    { name: 'Полусухая стяжка пола', unit: 'м²', price: 950, category: 'interior_rough', isActive: true },
    { name: 'Монтаж ГКЛ на потолок', unit: 'м²', price: 1400, category: 'interior_rough', isActive: true }
  ];

  console.log('Seeding services...');
  const { error: servError } = await supabase.from('services').insert(services);
  if (servError) console.error('Error seeding services:', servError);
  else console.log('Services seeded successfully.');

  // 6. Seed Portfolio
  const portfolio = [
    { title: 'Вилла "Эвкалипт"', category: 'private', location: 'Сочи, Хоста', area: '420 м²', year: '2024', image: '/images/project1.jpg', description: 'Современная вилла в стиле хай-тек с эксплуатируемой кровлей и панорамным бассейном-инфинити.' },
    { title: 'ЖК "Морской Бриз"', category: 'residential', location: 'Адлер', area: '15 400 м²', year: '2023', image: '/images/project2.jpg', description: 'Жилой комплекс комфорт-класса с собственной парковой зоной и подземным паркингом.' },
    { title: 'Резиденция "Олимп"', category: 'private', location: 'Красная Поляна', area: '580 м²', year: '2024', image: '/images/project3.jpg', description: 'Шале премиум-класса из клееного бруса и натурального камня с видом на Кавказский хребет.' },
    { title: 'Отель "Azura Resort"', category: 'commercial', location: 'Сочи, Центр', area: '8 200 м²', year: '2025', image: '/images/contacts_hero.jpg', description: 'Бутик-отель на первой береговой линии с авторским дизайном интерьеров и СПА-комплексом.' },
    { title: 'Бизнес-центр "Вертикаль"', category: 'commercial', location: 'Сочи, Дагомыс', area: '4 500 м²', year: '2023', image: '/images/project1.jpg', description: 'Современное офисное здание класса А with фасадным остеклением и открытыми террасами.' },
    { title: 'Дом "Кедровая Роща"', category: 'private', location: 'Геленджик', area: '320 м²', year: '2024', image: '/images/project2.jpg', description: 'Загородный дом в средиземноморском стиле с ландшафтным дизайном и зоной барбекю.' },
    { title: 'Вилла "Отражение"', category: 'private', location: 'Сочи, Красная Поляна', area: '520 м²', year: '2026', image: '/images/project4.jpg', description: 'Современный дом в стиле минимализма с панорамным видом на горы.' },
    { title: 'Ресторан "Терраса"', category: 'commercial', location: 'Сириус', area: '1 200 м²', year: '2024', image: '/images/about_hero.jpg', description: 'Реконструкция и отделка панорамного ресторана с видом на Олимпийский парк.' }
  ];

  console.log('Seeding portfolio...');
  const { error: portError } = await supabase.from('portfolio').insert(portfolio);
  if (portError) console.error('Error seeding portfolio:', portError);
  else console.log('Portfolio seeded successfully.');

  console.log('Seeding completed.');
}

seed();
