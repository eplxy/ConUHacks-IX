import { useState } from "react";
import DialogueBox from "./DialogueBox";
import scenes from "../data/script.json";
import style from "../style/style.css";

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState(scenes[0]);

  const handleChoice = (nextSceneId:number) => {
    const nextScene = scenes.find(scene: scene => scene.id === nextSceneId);
    setCurrentScene(nextScene);
  };

  return (
    <div className="scene" style={{ backgroundImage: `url(${currentScene.background})` }}>
      {currentScene.characters.map(char => (
        <img key={char.name} src={char.sprite} className={`character ${char.position}`} />
      ))}
      <DialogueBox dialogue={currentScene.dialogue} onChoice={handleChoice} />
    </div>
  );
}
