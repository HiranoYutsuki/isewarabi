import React, { useState, useEffect } from 'react';
import { getStampCount, resetStamp } from '../../utils/stampManager';

function StampPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getStampCount());
  }, []);

  const handleReset = () => {
    resetStamp();
    setCount(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>スタンプ管理ページ</h2>
      <div style={{ fontSize: '2em', margin: '1em 0' }}>
        スタンプ: {count} / 5
      </div>
      {count >= 5 && (
        <img src="/stamp_clear.png" alt="コンプリート画像" style={{ width: 200 }} />
      )}
      <button onClick={handleReset}>スタンプをリセット</button>
    </div>
  );
}

export default StampPage;