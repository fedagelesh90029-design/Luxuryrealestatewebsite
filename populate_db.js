import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfefcekbemyechbokeik.supabase.co';
const supabaseAnonKey = 'sb_publishable_KjmFaodIDIKsoPXYiyFckw__2xHYjUf';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = [
  { name: 'Фундаментные работы', slug: 'foundation' },
  { name: 'Стены и перекрытия', slug: 'walls' },
  { name: 'Кровельные работы', slug: 'roof' },
  { name: 'Внутренняя отделка', slug: 'interior' },
  { name: 'Инженерные системы', slug: 'engineering' }
];

const services = [
  { name: 'Земляные работы', unit: 'м³', price: 1200, category: 'foundation', isActive: true },
  { name: 'Монолитный ленточный фундамент', unit: 'м³', price: 12500, category: 'foundation', isActive: true },
  { name: 'Возведение стен из газобетона', unit: 'м³', price: 4500, category: 'walls', isActive: true },
  { name: 'Монтаж металлочерепицы', unit: 'м²', price: 1800, category: 'roof', isActive: true },
  { name: 'Электромонтажные работы', unit: 'м²', price: 1800, category: 'engineering', isActive: true }
];

const portfolio = [
  { title: 'Жилой комплекс "Резиденция"', category: 'residential', location: 'Москва', area: '12 000 м²', year: '2025', image: '/images/project1.jpg', description: 'Премиальный жилой комплекс' },
  { title: 'Загородный дом "Panorama"', category: 'private', location: 'Подмосковье', area: '450 м²', year: '2024', image: '/images/project3.jpg', description: 'Загородная резиденция' }
];

async function populate() {
  console.log('Populating categories...');
  const { error: catError } = await supabase.from('categories').insert(categories);
  if (catError) console.error('Error inserting categories:', catError);
  else console.log('Categories inserted successfully.');

  console.log('Populating services...');
  const { error: servError } = await supabase.from('services').insert(services);
  if (servError) console.error('Error inserting services:', servError);
  else console.log('Services inserted successfully.');

  console.log('Populating portfolio...');
  const { error: portError } = await supabase.from('portfolio').insert(portfolio);
  if (portError) console.error('Error inserting portfolio:', portError);
  else console.log('Portfolio inserted successfully.');
}

populate().catch(console.error);
