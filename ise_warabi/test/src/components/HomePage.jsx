import React from 'react';
import Header from '../header';
import Footer from '../footer';

const story = [
  {
    title: "① 出発 ― 猫との出会い",
    text: "伊勢神宮の参道を歩いていると、突然後ろから現れた一匹の猫が「わらび餅」をくわえて逃げ出す。参拝者の流れとは逆に駆け抜ける猫を追いかけると、足跡と「ニャーン」という鳴き声が不思議な力に導かれるように響き渡る。"
  },
  {
    title: "② 外宮 ― 最初の謎",
    text: "追いかけていくと外宮に辿りつく。ここで「衣食住を司る神にまつわる謎」が現れ、正しく答えると次の道が開かれる。外宮の森の中に猫の足跡が続いており、参拝の第一歩を踏み出す。"
  },
  {
    title: "③ 内宮への参道 ― 試練の連続",
    text: "森を抜け、五十鈴川の清流へ。猫は石橋を渡りながら鳴き声を響かせ、そのたびに「伊勢神宮の歴史」や「神話に関する謎」が出題される。答えを間違えれば道は霞み、正解すれば光が差して次の参道が現れる。"
  },
  {
    title: "④ 正宮 ― 最後の難問",
    text: "参拝の中心に辿り着くと、猫は御正宮の前で立ち止まる。ここで最後に「伊勢の参拝順序」や「神々の役割」に関する謎が現れる。正しい順路を思い出して答えると、境内に柔らかな光が満ち、猫が再び姿を現す。"
  },
  {
    title: "⑤ ゴール ― 猫とわらび餅の帰還",
    text: "すべての謎を解いたあなたの前に、猫が「ニャーン」と鳴いてわらび餅を差し出す。その目は「よくぞ正しい道を歩んだ」と語りかけるよう。猫は森の奥へ消えていき、手元には無事戻ったわらび餅と、伊勢神宮の参拝を通じて得た深い学びが残される。"
  }
];

function HomePage({ onStart }) {
  return (
    <>
      <Header />
      <div style={{
        maxWidth: 700,
        margin: "3em auto",
        background: "rgba(245,236,220,0.95)",
        borderRadius: "1.5em",
        boxShadow: "0 2px 16px rgba(34,27,21,0.12)",
        padding: "2em",
        fontFamily: "'Noto Serif JP', 'Yu Mincho', serif"
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#bfa76f",
          fontSize: "2em",
          marginBottom: "1.5em"
        }}>伊勢神宮 猫とわらび餅の物語</h1>
        {story.map((scene, idx) => (
          <div key={idx} style={{ marginBottom: "2em" }}>
            <h2 style={{
              color: "#4c3a1a",
              fontSize: "1.2em",
              marginBottom: "0.5em",
              borderLeft: "6px solid #bfa76f",
              paddingLeft: "0.7em"
            }}>{scene.title}</h2>
            <p style={{
              color: "#222",
              fontSize: "1.1em",
              lineHeight: "1.7",
              letterSpacing: "0.03em"
            }}>{scene.text}</p>
            {idx < story.length - 1 && (
              <div style={{
                textAlign: "center",
                color: "#bfa76f",
                fontSize: "1.5em",
                margin: "1.5em 0"
              }}>⸻</div>
            )}
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: "2em" }}>
          <button
            onClick={onStart}
            style={{
              background: "#bfa76f",
              color: "#fff",
              fontSize: "1.2em",
              border: "none",
              borderRadius: "1em",
              padding: "0.8em 2em",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(34,27,21,0.10)"
            }}
          >
            参拝の旅を始める
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;