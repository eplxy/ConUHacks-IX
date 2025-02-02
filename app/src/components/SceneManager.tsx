import { useEffect, useState } from "react";
import DialogueBox from "./DialogueBox";
import scenesData from "../data/script.json";
import { Choice, Scene, TraitTracker, TraitChange } from "../models/models";
import { Box } from "@mui/material";
import "../style/bounce.css";

const scenes: Scene[] = scenesData as Scene[];

const DEFAULT_BACKGROUNDS_FOLDER_PATH = "/backgrounds/";
const DEFAULT_CHARACTERS_FOLDER_PATH = "/characters/";

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);
  const [currentBackground, setCurrentBackground] = useState<string>("");
  const [currentSprite, setCurrentSprite] = useState<string>("");
  const [bounce, setBounce] = useState<boolean>(false);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ currentScene:", currentScene);
    if (currentScene.background) {
      setCurrentBackground(currentScene.background);
    }
    if (currentScene.characters[0].sprite) {
      setCurrentSprite(currentScene.characters[0].sprite);
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 2000); // duration of the bounce animation
      return () => clearTimeout(timer);
    } else if (currentScene?.characters?.[0].sprite === "") {
      setCurrentSprite("");
    }
  }, [currentScene]);

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

  const handleChangeSprite = (newSprite: string) => {
    setCurrentSprite(newSprite);
    setBounce(true);
    const timer = setTimeout(() => setBounce(false), 2000); // duration of the bounce animation
    return () => clearTimeout(timer);
  };

  const handleNextScene = () => {
    const nextScene = scenes.find(
      (scene: Scene) => scene.id === currentScene.nextSceneId
    );
    if (nextScene) {
      setCurrentScene(nextScene);
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
          backgroundImage: currentBackground
            ? `url(${DEFAULT_BACKGROUNDS_FOLDER_PATH}${currentBackground})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
          filter: "blur(4px)",
        }}
        sx={{ alignItems: "flex-end", zIndex: 10 }}
      ></Box>
      {currentSprite && (
        <img
          style={{
            userSelect: "none",
            position: "absolute",
            height: "100%",
            left: "5%",
            // right: "10%",
            zIndex: 50,
          }}
          src={`${DEFAULT_CHARACTERS_FOLDER_PATH}${currentSprite}`}
          className={`character ${bounce ? "bounce" : ""}`}
        />
      )}
      <DialogueBox
        dialogue={currentScene.dialogue}
        onChoice={handleChoice}
        goToNextScene={handleNextScene}
        traitTracker={userTraits}
        changeSprite={handleChangeSprite}
        changeBackground={(newBackground: string) =>
          setCurrentBackground(newBackground)
        }
      />
    </Box>
  );
}
