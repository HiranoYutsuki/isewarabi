// クイズデータ
const quiz = {
    question: "日本で一番高い山は何でしょう？",
    choices: ["富士山", "北岳", "槍ヶ岳"],
    answer: 0,
    explanation: "日本一高い山は標高3776mの富士山です。静岡県と山梨県にまたがっています。"
};

const questionDiv = document.getElementById("question");
const stopBtn = document.getElementById("stopBtn");
const choicesDiv = document.getElementById("choices");
const resultDiv = document.getElementById("result");
const explanationDiv = document.getElementById("explanation");

let index = 0;
let interval;

// 問題文を少しずつ表示
function startTyping() {
    interval = setInterval(() => {
    questionDiv.textContent += quiz.question[index];
    index++;
    if (index >= quiz.question.length) {
        clearInterval(interval);
    }
  }, 80); // 文字表示スピード
}

// 画像をクリックしたとき
stopBtn.addEventListener("click", () => {
    clearInterval(interval); // タイピング停止
    showChoices();
});

// 選択肢を表示
function showChoices() {
    stopBtn.style.display = "none";
    choicesDiv.style.display = "block";
    quiz.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => {
    showResult(i);
    });
    choicesDiv.appendChild(btn);
  });
}

// 結果と解説を表示
function showResult(selectedIndex) {
    choicesDiv.style.display = "none"; // 選択肢を消す

    if (selectedIndex === quiz.answer) {
        resultDiv.textContent = "✅ 正解！";
        resultDiv.style.color = "lime";
    } else {
        resultDiv.textContent = "❌ 不正解…";
        resultDiv.style.color = "red";
    }

  // 結果アニメーション
    resultDiv.style.opacity = 1;
    resultDiv.style.transform = "scale(1)";

  // 解説アニメーション
    setTimeout(() => {
        explanationDiv.textContent = "解説: " + quiz.explanation;
        explanationDiv.style.opacity = 1;
        explanationDiv.style.transform = "translateY(0)";
    }, 500);
}

startTyping();