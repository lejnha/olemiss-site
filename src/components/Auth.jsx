import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('로그인 링크가 이메일로 전송되었습니다!');
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded max-w-md mx-auto mt-10">
      <h2 className="text-xl mb-2">📩 이메일 로그인</h2>
      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-black text-white p-2 w-full" type="submit">
        Magic Link 전송
      </button>
    </form>
  );
}
