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

  // スタンプ票（最大5個、ビンゴ風グリッド）
  const gridSize = 3; // 3x2グリッド（中央は空欄）
  const totalStamps = 5;
  const positions = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2]
  ];

  let stampIndex = 0;
  const grid = [];
  for (let row = 0; row < gridSize; row++) {
    const cols = [];
    for (let col = 0; col < gridSize; col++) {
      // 真ん中(1,1)は空欄
      if (row === 1 && col === 1) {
        cols.push(
          <div key={`empty-${row}-${col}`} style={{ width: 100, height: 100 }}></div>
        );
      } else if (stampIndex < totalStamps) {
        cols.push(
          <div key={`stamp-${row}-${col}`} style={{
            width: 100,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f4e6",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(34,27,21,0.10)",
            margin: "8px"
          }}>
            <img
              src={stampIndex < count ? "/stamp.png" : "/stamp_grey.png"}
              alt={stampIndex < count ? "獲得スタンプ" : "未獲得"}
              style={{
                width: 80,
                height: 80,
                opacity: stampIndex < count ? 1 : 0.3,
                filter: stampIndex < count ? "none" : "grayscale(100%)"
              }}
            />
          </div>
        );
        stampIndex++;
      } else {
        cols.push(
          <div key={`blank-${row}-${col}`} style={{ width: 100, height: 100 }}></div>
        );
      }
    }
    grid.push(
      <div key={`row-${row}`} style={{ display: "flex", justifyContent: "center" }}>
        {cols}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>スタンプ管理ページ</h2>
      <div style={{ margin: '2em 0' }}>
        <div style={{ fontSize: '1.2em', marginBottom: '1em' }}>スタンプ票</div>
        <div style={{
          display: "inline-block",
          background: "#fffbe6",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 4px 24px rgba(34,27,21,0.10)"
        }}>
          {grid}
        </div>
        <div style={{ marginTop: '1em', fontSize: '1.1em' }}>
          {count} / 5 スタンプ獲得
        </div>
      </div>
      {count >= 5 && (
        <img src="/stamp_clear.png" alt="コンプリート画像" style={{ width: 200 }} />
      )}
      <button onClick={handleReset} style={{
        marginTop: "2em",
        padding: "0.7em 2em",
        fontSize: "1.1em",
        borderRadius: "1em",
        background: "#bfa76f",
        color: "#fff",
        border: "none",
        boxShadow: "0 2px 8px rgba(34,27,21,0.10)"
      }}>
        スタンプをリセット
      </button>
    </div>
  );
}

export default StampPage;