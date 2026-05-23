import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfefcekbemyechbokeik.supabase.co';
const supabaseAnonKey = 'sb_publishable_KjmFaodIDIKsoPXYiyFckw__2xHYjUf';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('requests').select('*').limit(1);
  console.log('Requests check:', { data, error });
}

check();
