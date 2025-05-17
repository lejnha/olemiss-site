import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function BlockEditor({ user }) {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const { error } = await supabase.from('blocks').insert([
      {
        content,
        created_by: user.id,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus('오류 발생!');
    } else {
      setStatus('✅ 저장되었습니다!');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 my-4">
      <h2 className="text-lg font-bold">✍️ 정보 블럭 작성</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border mt-2"
        rows={4}
        placeholder="교환학생에게 도움이 될 정보 작성..."
      />
      <button className="mt-2 p-2 bg-black text-white" type="submit">
        저장
      </button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </form>
  );
}
