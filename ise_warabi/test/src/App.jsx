import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'

function App() {
  
  const videoRef = useRef(null)

  useEffect(() => {
    // 外カメラ（背面カメラ）を優先して起動
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } }
    })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(err => {
        console.error('Webカメラの取得に失敗しました:', err)
      })
  }, [])

  return (
    <>
      
      
      
      {/* Webカメラ映像の表示 */}
      <div>
        <h2>Webカメラ映像</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline // iOSでインライン再生
          width="320"
          height="240"
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App