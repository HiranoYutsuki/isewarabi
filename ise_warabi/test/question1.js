// クイズデータ
const quiz = {
    question: "伊勢神宮は、2つの宮から成り立っています。食べ物や衣など“衣食住”を司る神様を祀っているのは、内宮と外宮どちらでしょう？",
    choices: ["外宮", "中宮", "内宮"],
    answer: 0,
    explanation: "伊勢神宮は「内宮（ないくう）」と「外宮（げくう）」に分かれており、外宮では「豊受大御神（とようけのおおみかみ）」が祀られています。食や産業を司る神様で、参拝は「外宮から内宮へ」と進むのが古くからの習わしです。"
};

const questionDiv = document.getElementById("question");
const stopBtn = document.getElementById("stopBtn");
const choicesDiv = document.getElementById("choices");
const resultDiv = document.getElementById("result");
const explanationDiv = document.getElementById("explanation");

const retryBtn = document.createElement("button");
retryBtn.textContent = "🔄 もう一回";
retryBtn.style.display = "none";
retryBtn.style.marginTop = "20px";
document.body.appendChild(retryBtn);

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