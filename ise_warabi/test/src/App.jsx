import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import jsQR from 'jsqr'
import './css/App.css'


// クイズデータ（ローカル定義）
const quizzes = {
  "quiz1": {
    question: "伊勢神宮は、2つの宮から成り立っています。食べ物や衣など“衣食住”を司る神様を祀っているのは、内宮と外宮どちらでしょう？",
    choices: ["内宮", "外宮"],
    answer: 1,
    explanation: "伊勢神宮は「内宮（ないくう）」と「外宮（げくう）」に分かれており、外宮では「豊受大御神（とようけのおおみかみ）」が祀られています。食や産業を司る神様で、参拝は「外宮から内宮へ」と進むのが古くからの習わしです。"
  },
  "quiz2": {
    question: "参拝前に身を清める場所で、川の水で手や口をすすぐ風習を何というでしょう？",
    choices: ["みそぎ", "てみず", "しんじ"],
    answer: 0,
    explanation: "御手洗場（みたらし）で川の水に手をつけ、身を清めることを「禊（みそぎ）」といいます。これは神道における浄化の大切な儀式で、清らかな心で神様にお参りできるようにするための習慣です。"
  },
  "quiz3": {
    question: "宇治橋を渡ることは、現世から神域へと入ることを意味しています。この橋は何年ごとに架け替えられているでしょう？",
    choices: ["10年ごと", "20年ごと", "50年ごと"],
    answer: 1,
    explanation: "宇治橋は「式年遷宮（しきねんせんぐう）」の一環として20年ごとに新しく架け替えられます。これは伊勢神宮の大切な伝統で、建物や橋を新しくすることで神様の力も新しくなるとされています。"
  },
  "quiz4": {
    question: "内宮で祀られている神様は、日本神話に登場する太陽の神様です。その名前は何でしょう？",
    choices: ["天照大御神（あまてらすおおみかみ）", "月読命（つくよみのみこと）", "須佐之男命（すさのおのみこと）"],
    answer: 0,
    explanation: "内宮に祀られているのは、日本の最高神「天照大御神」です。皇室の祖神とされ、伊勢神宮はその御鎮座地として特別な存在です。"
  },
  "quiz5": {
    question: "猫が奪ったものは何だったでしょう？",
    choices: ["信玄餅", "さくら餅", "わらび餅"],
    answer: 2,
    explanation: "伊勢地域は「赤福」など和菓子文化も盛んで、参拝のあとの甘味は旅の楽しみのひとつです。わらび餅を取り戻したあなたも、無事に参拝の旅を終えることができました。"
  }
  // 必要に応じて追加
}

function App() {
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [quizId, setQuizId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [scannedUrl, setScannedUrl] = useState(null)
  const [hideHeader, setHideHeader] = useState(false);


  useEffect(() => {
    let animationId
    let stream
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            // 下にスクロール → ヘッダーを隠す
            setHideHeader(true);
        } else {
            // 上にスクロール → ヘッダーを表示
            setHideHeader(false);
        }
        lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

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
      if (video && canvas && !quizId && !scannedUrl) {
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, canvas.width, canvas.height)
        if (code && code.data) {
          // QRコードの内容がクイズIDなら表示
          if (quizzes[code.data]) {
            setQuizId(code.data)
          } else if (/^https?:\/\/.+/.test(code.data)) {
            setScannedUrl(code.data)
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
      window.removeEventListener("scroll", handleScroll);
      if (animationId) cancelAnimationFrame(animationId)
      if (stream) stream.getTracks().forEach(track => track.stop())
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', startScan)
      }
    }
  }, [quizId, scannedUrl])

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
  
  // QRコード画面に戻る
  const handleBackToScan = () => {
    setScannedUrl(null)
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
      {!quizId && !scannedUrl && (
        <p className="read-the-docs">
          QRコードをかざすとクイズが表示されます
        </p>
      )}
      {scannedUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>QRコードから取得したURL</h3>
          <a href={scannedUrl} target="_blank" rel="noopener noreferrer">
            {scannedUrl}
          </a>
          <br />
          <button onClick={handleBackToScan}>戻る</button>
        </div>
      )}
    </>
  )
}

export default App