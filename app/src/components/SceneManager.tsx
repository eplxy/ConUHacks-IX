import { useState } from "react";
import DialogueBox from "./DialogueBox";
import scenesData from "../data/script.json";
import { Scene } from "../models/models";
import GameLayout from "./GameLayout";
import { Box } from "@mui/material";

const scenes: Scene[] = scenesData as Scene[];

const DEFAULT_BACKGROUNDS_FOLDER_PATH = "/backgrounds/";
const DEFAULT_CHARACTERS_FOLDER_PATH = "/characters/";

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);

  const handleChoice = (nextSceneId: string) => {
    const nextScene = scenes.find((scene: Scene) => scene.id === nextSceneId);
    console.log("🚀 ~ handleChoice ~ nextScene:", nextScene)
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
        backgroundImage: currentScene.background
          ? `url(${DEFAULT_BACKGROUNDS_FOLDER_PATH}${currentScene.background})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
      sx={{ alignItems: "flex-end" }}
    >
      {currentScene.characters?.map((char) => (
        <img
          style={{ position: "absolute",
            height: "100%",
            right: "10%"
           }}
          key={char.name}
          src={`${DEFAULT_CHARACTERS_FOLDER_PATH}${char.sprite}`}
          className={`character ${char.position}`}
        />
      ))}
      <DialogueBox dialogue={currentScene.dialogue} onChoice={handleChoice} />
    </Box>
  );
}
