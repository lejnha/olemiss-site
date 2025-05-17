import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import { getUserRole } from './utils/getUserRole';
import BlockEditor from './components/BlockEditor';
import BlockList from './components/BlockList';

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

  // 로그인 및 권한 가져오기
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        const userRole = await getUserRole(session.user.id);
        setRole(userRole);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const userRole = await getUserRole(session.user.id);
        setRole(userRole);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 로그인 전 화면
  if (!session) return <Auth />;

  return (
    <div className="p-6 max-w-2xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-2">🎓 교환학생 정보 허브</h1>
      <p className="text-sm text-gray-600">로그인된 사용자: {session.user.email}</p>
      <p className="text-sm text-gray-600 mb-4">권한: <strong>{role || '읽기 전용'}</strong></p>

      {/* 관리자: 블럭 작성 */}
      {role === 'admin' && <BlockEditor user={session.user} />}

      {/* 전체 블럭 + 댓글 출력 */}
      <BlockList user={session.user} role={role} />

      {/* 로그아웃 버튼 */}
      <button
        className="mt-8 p-2 bg-red-600 text-white rounded"
        onClick={() => supabase.auth.signOut()}
      >
        로그아웃
      </button>
    </div>
  );
}

export default App;
