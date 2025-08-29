import React, { useState, useEffect } from 'react';
import { getStamps, addStamp } from '../utils/stampManager';
import stampImage from '../assets/stamp.png'; // Assuming you have a stamp image in your assets

function StampPage() {
  const [stamps, setStamps] = useState(0);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const initialStamps = getStamps();
    setStamps(initialStamps);
    if (initialStamps >= 5) {
      setShowImage(true);
    }
  }, []);

  const handleAddStamp = () => {
    const newStampCount = addStamp();
    setStamps(newStampCount);
    if (newStampCount >= 5) {
      setShowImage(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <h2>スタンプ管理ページ</h2>
      <p>現在のスタンプ数: {stamps}</p>
      <button onClick={handleAddStamp} style={{ padding: '10px 20px', fontSize: '1em' }}>
        クイズ成功でスタンプを貯める
      </button>
      {showImage && (
        <div style={{ marginTop: 20 }}>
          <h3>おめでとうございます！5つのスタンプを集めました！</h3>
          <img src={stampImage} alt="スタンプ" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default StampPage;