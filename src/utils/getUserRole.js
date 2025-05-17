import { supabase } from '../supabaseClient';

export async function getUserRole(userId) {
  const { data, error } = await supabase
    .from('roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.warn('권한 없음 (기본: 읽기 전용)');
    return null;
  }
  return data.role;
}
