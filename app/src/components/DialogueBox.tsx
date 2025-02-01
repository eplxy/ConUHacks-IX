import { useState } from "react";
import { Line } from "../models/models";

export interface IDialogueBoxProps {
  dialogue: Line[];
  onChoice: (nextSceneId: string) => void;
}

export default function DialogueBox(props: IDialogueBoxProps) {
  const [index, setIndex] = useState(0);
  const currentLine: Line = props.dialogue[index];

  const nextLine = () => {
    if (index < props.dialogue.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="dialogue-box">
      {currentLine && (
        <p>
          {currentLine.speaker}: {currentLine.text}
        </p>
      )}
      {currentLine && currentLine.choices ? (
        currentLine.choices.map((choice, idx) => (
          <button key={idx} onClick={() => props.onChoice(choice.next)}>
            {choice.text}
          </button>
        ))
      ) : (
        <button onClick={nextLine}>Next</button>
      )}
    </div>
  );
}
