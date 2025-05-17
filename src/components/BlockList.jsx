import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function BlockList({ user, role }) {
  const [blocks, setBlocks] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetchBlocks();
  }, []);

  async function fetchBlocks() {
    const { data, error } = await supabase
      .from('blocks')
      .select('id, content, created_at')
      .order('created_at', { ascending: false });

    setBlocks(data || []);
  }

  async function postComment(blockId, content) {
    if (!content.trim()) return;

    const { error } = await supabase.from('comments').insert([
      {
        block_id: blockId,
        user_id: user.id,
        content,
      },
    ]);
    if (!error) {
      fetchBlocks(); // 댓글 반영
      setCommentInputs({ ...commentInputs, [blockId]: '' });
    }
  }

  return (
    <div className="space-y-4 mt-6">
      {blocks.map((block) => (
        <div key={block.id} className="border p-4">
          <p className="text-lg">{block.content}</p>

          {/* 댓글 리스트 */}
          <CommentList blockId={block.id} />

          {/* 댓글 입력 */}
          {(role === 'commenter' || role === 'admin') && (
            <div className="mt-2">
              <input
                className="border p-2 w-full"
                placeholder="댓글 입력..."
                value={commentInputs[block.id] || ''}
                onChange={(e) =>
                  setCommentInputs({ ...commentInputs, [block.id]: e.target.value })
                }
              />
              <button
                onClick={() => postComment(block.id, commentInputs[block.id] || '')}
                className="bg-gray-800 text-white mt-1 p-1 px-3"
              >
                작성
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CommentList({ blockId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    supabase
      .from('comments')
      .select('content, created_at')
      .eq('block_id', blockId)
      .order('created_at')
      .then(({ data }) => setComments(data || []));
  }, [blockId]);

  return (
    <div className="mt-3 space-y-1 text-sm text-gray-600">
      {comments.map((c, i) => (
        <div key={i} className="border-t pt-1">{c.content}</div>
      ))}
    </div>
  );
}
