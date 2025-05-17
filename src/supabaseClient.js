import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyxivhnkxrtciillftko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5eGl2aG5reHJ0Y2lpbGxmdGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTcxMzQsImV4cCI6MjA2MzA3MzEzNH0.zuo_mpXGZqsvqP0ml0DR_a_wHFHxBJWiUHQrKWMqwrs';

export const supabase = createClient(supabaseUrl, supabaseKey);
