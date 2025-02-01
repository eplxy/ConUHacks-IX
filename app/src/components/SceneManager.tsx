import { useState } from "react";
import DialogueBox from "./DialogueBox";
import scenesData from "../data/script.json";
import { Scene } from "../models/models";

const scenes: Scene[] = scenesData as Scene[];

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);

  const handleChoice = (nextSceneId: string) => {
    const nextScene = scenes.find((scene: Scene) => scene.id === nextSceneId);
    if (nextScene) {
      setCurrentScene(nextScene);
    } else {
      console.error(`Scene with id ${nextSceneId} not found`);
    }
  };

  return (
    <div
      className="scene"
      style={{ backgroundImage: `url(${currentScene.background})` }}
    >
      {currentScene.characters?.map((char) => (
        <img
          key={char.name}
          src={char.sprite}
          className={`character ${char.position}`}
        />
      ))}
      <DialogueBox dialogue={currentScene.dialogue} onChoice={handleChoice} />
    </div>
  );
}
