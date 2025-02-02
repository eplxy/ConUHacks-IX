import { useState } from "react";
import DialogueBox from "./DialogueBox";
import scenesData from "../data/script.json";
import { Choice, Scene, TraitTracker, TraitChange } from "../models/models";
import { Box } from "@mui/material";

const scenes: Scene[] = scenesData as Scene[];

const DEFAULT_BACKGROUNDS_FOLDER_PATH = "/backgrounds/";
const DEFAULT_CHARACTERS_FOLDER_PATH = "/characters/";

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);

  const [userTraits, setUserTraits] = useState<TraitTracker>({
    Agreeableness: 0,
    Extroversion: 0,
    Openness: 0,
    Neuroticism: 0,
    Conscientiousness: 0,
  });

  const handleChoice = (choice: Choice) => {
    const nextScene = scenes.find((scene: Scene) => scene.id === choice.next);

    if (choice.traitChanges) {
      const updatedTraits = { ...userTraits };

      // not exactly what i expected but ok
      choice.traitChanges.forEach((traitChange: TraitChange) => {
        switch (traitChange.trait) {
          case 1:
            updatedTraits.Agreeableness += traitChange.change;
            break;
          case 2:
            updatedTraits.Extroversion += traitChange.change;
            break;
          case 3:
            updatedTraits.Openness += traitChange.change;
            break;
          case 4:
            updatedTraits.Neuroticism += traitChange.change;
            break;
          case 5:
            updatedTraits.Conscientiousness += traitChange.change;
            break;
          default:
            break;
        }
      });

      setUserTraits(updatedTraits);
    }

    if (nextScene) {
      setCurrentScene(nextScene);
    } else {
      console.error(`Scene with id ${choice.next} not found`);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        className="scene"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: currentScene.background
            ? `url(${DEFAULT_BACKGROUNDS_FOLDER_PATH}${currentScene.background})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
          filter: "blur(8px)",
        }}
        sx={{ alignItems: "flex-end", zIndex: 10 }}
      ></Box>
      {currentScene.characters?.map(
        (char) =>
          char.sprite && (
            <img
              style={{
                position: "absolute",
                height: "100%",
                right: "10%",
                zIndex: 50,
              }}
              key={char.name}
              src={`${DEFAULT_CHARACTERS_FOLDER_PATH}${char.sprite}`}
              className={`character ${char.position}`}
            />
          )
      )}
      <DialogueBox
        dialogue={currentScene.dialogue}
        onChoice={handleChoice}
        traitTracker={userTraits}
      />
    </Box>
  );
}
