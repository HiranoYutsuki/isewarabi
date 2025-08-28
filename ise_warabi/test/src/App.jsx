import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import jsQR from 'jsqr'
import './css/App.css'


// クイズデータ（ローカル定義）
const quizzes = {
  "quiz1": {
    question: "日本の首都はどこ？",
    choices: ["大阪", "東京", "京都", "福岡"],
    answer: 1,
    explanation: "日本の首都は東京です。"
  },
  "quiz2": {
    question: "富士山の標高は？",
    choices: ["2,776m", "3,776m", "4,776m", "5,776m"],
    answer: 1,
    explanation: "富士山の標高は3,776mです。"
  }
  // 必要に応じて追加
}

function App() {
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [quizId, setQuizId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)


  useEffect(() => {
    let animationId
    let stream

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' } // ←ここを修正
    })
      .then(s => {
        stream = s
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(err => {
        console.error('Webカメラの取得に失敗しました:', err)
      })

  // QRコード解析
    const scanQRCode = () => {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (video && canvas && !quizId) {
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, canvas.width, canvas.height)
        if (code && code.data) {
          // QRコードの内容がクイズIDなら表示
          if (quizzes[code.data]) {
            setQuizId(code.data)
          }
        }
      }
      animationId = requestAnimationFrame(scanQRCode)
    }
    const startScan = () => {
      scanQRCode()
    }
    if (videoRef.current) {
      videoRef.current.addEventListener('play', startScan)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (stream) stream.getTracks().forEach(track => track.stop())
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', startScan)
      }
    }
  }, [quizId]) 

    // クイズ選択肢クリック時
  const handleChoice = (idx) => {
    setSelected(idx)
    setShowExplanation(true)
  }

  // クイズ画面に戻る
  const handleBack = () => {
    setQuizId(null)
    setSelected(null)
    setShowExplanation(false)
  }

  return (
    <>
      {/* Webカメラ映像の表示 */}
      <div>
        <h2>Webカメラ映像</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline // iOSでインライン再生
          muted        // ←追加: 自動再生の安定化
          width="320"
          height="240"
          style={{ border: '1px solid #ccc' }}
        />
        <canvas
          ref={canvasRef}
          width="320"
          height="240"
          style={{ display: 'none' }}
        />
      </div>
            {/* クイズ表示 */}
      {quizId && quizzes[quizId] && (
        <div style={{ marginTop: 20 }}>
          {!showExplanation ? (
            <>
              <h3>{quizzes[quizId].question}</h3>
              <ul>
                {quizzes[quizId].choices.map((choice, idx) => (
                  <li key={idx}>
                    <button onClick={() => handleChoice(idx)}>
                      {choice}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3>解答・解説</h3>
              <p>
                {selected === quizzes[quizId].answer
                  ? "正解！"
                  : "不正解"}
              </p>
              <p>{quizzes[quizId].explanation}</p>
              <button onClick={handleBack}>戻る</button>
            </>
          )}
        </div>
      )}
      {!quizId && (
        <p className="read-the-docs">
          QRコードをかざすとクイズが表示されます
        </p>
      )}
    </>
  )
}

export default App