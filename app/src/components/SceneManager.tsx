import { useState } from "react";
import DialogueBox from "./DialogueBox";
import scenesData from "../data/script.json";
import { Scene } from "../models/models";
import GameLayout from "./GameLayout";
import "../assets/picture.png";
import { Box } from "@mui/material";

const scenes: Scene[] = scenesData as Scene[];

const DEFAULT_BACKGROUNDS_FOLDER_PATH = "../assets/backgrounds/";

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
    <Box
      className="scene"
      // style={{ backgroundImage: `url(${currentScene.background})` }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "tan",
      }}
      sx={{ alignItems: "flex-end" }}
    >
      {currentScene.characters?.map((char) => (
        <img
          style={{ position: "absolute" }}
          key={char.name}
          src={char.sprite}
          className={`character ${char.position}`}
        />
      ))}
      <DialogueBox dialogue={currentScene.dialogue} onChoice={handleChoice} />
    </Box>
  );
}
