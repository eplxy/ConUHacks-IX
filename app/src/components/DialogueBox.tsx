import { useEffect, useState } from "react";
import { Choice, Line, TraitTracker } from "../models/models";
import "../style/dialoguecontainer.css";
import { Box, Button } from "@mui/material";

export interface IDialogueBoxProps {
  dialogue: Line[];
  onChoice: (choice: Choice) => void;
  traitTracker?: TraitTracker;
  goToNextScene: () => void;
  changeSprite: (newSprite: string) => void;
  changeBackground: (newBackground: string) => void;
  retrieveUserName: () => void;
  username: string;
}

export default function DialogueBox(props: IDialogueBoxProps) {
  const [index, setIndex] = useState<number>(0);
  const [areChoicesVisible, setAreChoicesVisible] = useState<boolean>(false);
  const [currentLine, setCurrentLine] = useState<Line>(props.dialogue[index]);

  useEffect(() => {
    setCurrentLine(props.dialogue?.[0]);
  }, [props.dialogue]);

  const formatMessage = (message: string) => {
    return message.replace("${name}", props.username);
  };

  const handleScreenClicked = () => {
    // remove later, but notice how traits go up!
    console.log(
      "🚀 ~ handleScreenClicked ~ props.traitTracker:",
      props.traitTracker
    );

    if (currentLine.nameChoice) {
      props.retrieveUserName();
    }

    if (index < props.dialogue.length - 1) {
      const nextLine = props.dialogue[index + 1];
      if (nextLine.newSprite || nextLine.newSprite === "") {
        props.changeSprite(nextLine.newSprite);
      }
      if (nextLine.newBackground) {
        props.changeBackground(nextLine.newBackground);
      }
      setCurrentLine(props.dialogue[index + 1]);
      setIndex(index + 1);
    } else {
      if ((currentLine?.choices?.length ?? 0) == 0) {
        props.goToNextScene();
        setIndex(0);
      }
    }
    if (!areChoicesVisible && (currentLine?.choices?.length ?? 0) > 0) {
      setAreChoicesVisible(true);
    }
  };

  const handleOnChoiceClicked = (choice: Choice) => {
    setAreChoicesVisible(false);
    setIndex(0);
    props.onChoice(choice);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        zIndex: 100,
      }}
      onClick={handleScreenClicked}
    >
      <Box
        sx={{
          margin: "10% 0px 10% 50%",
          width: "35%",
          display: areChoicesVisible ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        {currentLine?.choices &&
          currentLine.choices.length > 0 &&
          currentLine.choices.map((choice, idx) => (
            <Button
              size={"medium"}
              variant="contained"
              key={idx}
              onClick={() => handleOnChoiceClicked(choice)}
              sx={{ color: "#FFEED5", boxShadow: 3 }}
            >
              {choice.text}
            </Button>
          ))}
      </Box>

      <div
        style={{
          alignSelf: "flex-end",
          width: "75%",
          height: "20%",
          padding: "24px 36px",
          left: "10.5%",
          top: "70%",
          position: "absolute",
          background: "#FFEED5",
          borderRadius: 30,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 10,
          display: "inline-flex",
          boxShadow: "2px 2px 2px rgb(123, 104, 75)",
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "left",
            height: 126.73,
            color: "#5A755A",
            fontSize: 28,
            fontFamily: "'Accidental Presidency'",
            fontWeight: "400",
            letterSpacing: 1.96,
            wordWrap: "break-word",
          }}
        >
          <div className="dialogue-text">
            {currentLine && (
              <p style={{ userSelect: "none", marginTop: "6px" }}>
                {formatMessage(currentLine.text)}
              </p>
            )}
          </div>
        </div>
      </div>
      {currentLine?.speaker && (
        <div
          style={{
            width: 300,
            height: 60,
            padding: "18px 20px",
            left: "5%",
            top: "62%",
            position: "absolute",
            transform: "rotate(-3deg)",
            transformOrigin: "0 0",
            background: "#5A755A",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            display: "inline-flex",
            boxShadow: "2px 2px 2px rgb(57, 78, 57)",
          }}
        >
          <div
            className="dialogue-text"
            style={{
              userSelect: "none",
              textAlign: "center",
              color: "#FFEED5",
              fontSize: 28,
              wordWrap: "break-word",
            }}
          >
            {currentLine?.speaker}
          </div>
        </div>
      )}
    </Box>
  );
}
