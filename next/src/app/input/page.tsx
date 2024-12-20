"use client";

import React, { useState } from "react";

const characterRows = {
  あ: ["あ", "い", "う", "え", "お"],
  か: ["か", "き", "く", "け", "こ"],
  さ: ["さ", "し", "す", "せ", "そ"],
  た: ["た", "ち", "つ", "て", "と"],
  な: ["な", "に", "ぬ", "ね", "の"],
};

const CharacterInput = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // 現在選ばれている行
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null); // 選ばれた文字
  const [message, setMessage] = useState<string>(""); // メッセージボックスに表示する文字

  // 行を選択した時の処理
  const handleRowSelect = (row: string) => {
    setSelectedRow(row);
    setSelectedCharacter(null); // 前回選ばれた文字をリセット
  };

  // 文字を選択した時の処理
  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setMessage(`選択された文字: ${character}`); // メッセージボックスに選ばれた文字を表示
    setSelectedRow(null); // 文字選択後、行選択に戻す
  };

  // メッセージボックスが表示される場合に、その後再度アカサタナ行を選べるようにする
  const handleBackToRows = () => {
    setMessage(""); // メッセージボックスをクリア
    setSelectedRow(""); // 再度行選択に戻る
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>文字入力</h2>

      {/* メッセージボックス */}
      {message && (
        <div style={{ backgroundColor: "#f0f0f0", padding: "10px", marginBottom: "20px" }}>
          <h3>{message}</h3>
          <button onClick={handleBackToRows}>アカサタナ行を再選択</button>
        </div>
      )}

      {/* アカサタナ行の選択 */}
      {!selectedCharacter && !message && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => handleRowSelect("あ")}>あ行</button>
          <button onClick={() => handleRowSelect("か")}>か行</button>
          <button onClick={() => handleRowSelect("さ")}>さ行</button>
          <button onClick={() => handleRowSelect("た")}>た行</button>
          <button onClick={() => handleRowSelect("な")}>な行</button>
        </div>
      )}

      {/* 選択された行の文字を表示 */}
      {selectedRow && (
        <div style={{ marginBottom: "20px" }}>
          <h3>{selectedRow}行の文字:</h3>
          {characterRows[selectedRow].map((char) => (
            <button
              key={char}
              onClick={() => handleCharacterSelect(char)}
              style={{
                margin: "5px",
                padding: "10px",
                fontSize: "18px",
                cursor: "pointer",
                backgroundColor: selectedCharacter === char ? "#ddd" : "#fff",
              }}
            >
              {char}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterInput;