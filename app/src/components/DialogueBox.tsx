import { useState } from "react";

export default function DialogueBox({ dialogue, onChoice }) {
  const [index, setIndex] = useState(0);
  const currentLine = dialogue[index];

  const nextLine = () => {
    if (index < dialogue.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="dialogue-box">
      <p>{currentLine.speaker}: {currentLine.text}</p>
      {currentLine.choices ? (
        currentLine.choices.map((choice, idx) => (
          <button key={idx} onClick={() => onChoice(choice.next)}>
            {choice.text}
          </button>
        ))
      ) : (
        <button onClick={nextLine}>Next</button>
      )}
    </div>
  );
}
