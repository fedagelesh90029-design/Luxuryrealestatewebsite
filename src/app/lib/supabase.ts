import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfefcekbemyechbokeik.supabase.co';
const supabaseAnonKey = 'sb_publishable_KjmFaodIDIKsoPXYiyFckw__2xHYjUf';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
