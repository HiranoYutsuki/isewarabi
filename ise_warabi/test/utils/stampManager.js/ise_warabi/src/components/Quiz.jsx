import React from 'react';
import { useState, useEffect } from 'react';
import { addStamp, getStampCount } from '../utils/stampManager';

const Quiz = ({ quizId, quizzes, onQuizComplete }) => {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stampCount, setStampCount] = useState(0);

  useEffect(() => {
    const count = getStampCount();
    setStampCount(count);
  }, []);

  const handleChoice = (idx) => {
    setSelected(idx);
    setShowExplanation(true);
    if (idx === quizzes[quizId].answer) {
      addStamp();
      setStampCount(prevCount => prevCount + 1);
      if (stampCount + 1 === 5) {
        onQuizComplete(); // Notify parent component to show stamp image
      }
    }
  };

  const handleBack = () => {
    setSelected(null);
    setShowExplanation(false);
  };

  return (
    <div className="quiz-screen">
      {!showExplanation ? (
        <>
          <div className="quiz-question">
            <h3>{quizzes[quizId].question}</h3>
          </div>
          <ul className="quiz-choices">
            {quizzes[quizId].choices.map((choice, idx) => (
              <li key={idx}>
                <button onClick={() => handleChoice(idx)}>{choice}</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="explanation-box">
          <div className="explanation-result">
            {selected === quizzes[quizId].answer ? "正解" : "不正解"}
          </div>
          <button className="back-button" onClick={handleBack}>戻る</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;