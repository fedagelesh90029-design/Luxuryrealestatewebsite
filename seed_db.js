import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfefcekbemyechbokeik.supabase.co';
const supabaseAnonKey = 'sb_publishable_KjmFaodIDIKsoPXYiyFckw__2xHYjUf';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Starting database seeding...');

  // 1. Seed Categories
  const { data: catData, error: catError } = await supabase.from('categories').upsert([
    { name: 'Фундаментные работы', slug: 'foundation' },
    { name: 'Стены и перекрытия', slug: 'walls' },
    { name: 'Кровельные работы', slug: 'roof' },
    { name: 'Внутренняя отделка', slug: 'interior' },
    { name: 'Инженерные системы', slug: 'engineering' }
  ], { onConflict: 'slug' });

  if (catError) console.error('Error seeding categories:', catError);
  else console.log('Categories seeded successfully.');

  // 2. Seed Services
  const { error: servError } = await supabase.from('services').upsert([
    { name: 'Земляные работы', unit: 'м³', price: 1200, category: 'foundation' },
    { name: 'Монолитный ленточный фундамент', unit: 'м³', price: 12500, category: 'foundation' },
    { name: 'Устройство песчаной подушки', unit: 'м³', price: 800, category: 'foundation' },
    { name: 'Возведение стен из газобетона', unit: 'м³', price: 4500, category: 'walls' },
    { name: 'Монтаж металлочерепицы', unit: 'м²', price: 1800, category: 'roof' },
    { name: 'Электромонтажные работы', unit: 'м²', price: 1800, category: 'engineering' },
    { name: 'Штукатурка стен', unit: 'м²', price: 650, category: 'interior' }
  ]);

  if (servError) console.error('Error seeding services:', servError);
  else console.log('Services seeded successfully.');

  // 3. Seed Portfolio
  const { error: portError } = await supabase.from('portfolio').upsert([
    { title: 'Жилой комплекс "Резиденция"', category: 'residential', location: 'Москва', area: '12 000 м²', year: '2025', image: '/images/project1.jpg', description: 'Премиальный жилой комплекс с развитой инфраструктурой' },
    { title: 'Офисное здание "Квартал"', category: 'commercial', location: 'Санкт-Петербург', area: '8 500 м²', year: '2024', image: '/images/project2.jpg', description: 'Современное бизнес-пространство класса А' },
    { title: 'Загородный дом "Panorama"', category: 'private', location: 'Подмосковье', area: '450 м²', year: '2024', image: '/images/project3.jpg', description: 'Загородная резиденция с панорамным остеклением' },
    { title: 'Вилла "Отражение"', category: 'private', location: 'Сочи, Красная Поляна', area: '520 м²', year: '2026', image: '/images/project4.jpg', description: 'Современный дом в стиле минимализма с панорамным видом на горы.' }
  ]);

  if (portError) console.error('Error seeding portfolio:', portError);
  else console.log('Portfolio seeded successfully.');

  console.log('Seeding completed.');
}

seed();
