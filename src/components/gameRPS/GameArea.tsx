import {
  Card,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import GameButton from "./GameButton";
import { ScoreTable } from "./ScoreTable";
import { getRobotChoice } from "./getRobotChoice";
import { Choice, Result } from "./choice";
import { GameStateOutput } from "./GameStateOutput";
import { getResult } from "./getResult";

const useStyles = makeStyles((theme) => ({
  play: {
    backgroundColor: theme.palette.primary.main,
    margin: 10,
    padding: 20,
  },
  buttonGroup: {
    padding: 10,
  },
}));
interface Props {}

export default function GameArea(_props: Props): ReactElement {
  const classes = useStyles();

  const [message, setMessage] = useState("--click to play--");
  const [playerChoice, setPlayerChoice] = useState(" - ");
  const [robotChoice, setRobotChoice] = useState<string>(" - ");
  const [playerName, setPlayerName] = useState("Player");

  const [robotScore, setRobotScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [tieCount, setTieCount] = useState(0);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0); //can these be exported?

  function buttonClick(text: string) {
    setTotalGamesPlayed(totalGamesPlayed + 1);

    const playerChoiceString = text;
    const robotChoiceString = getRobotChoice();

    setPlayerChoice(playerChoiceString);
    setRobotChoice(robotChoiceString);

    var [vsResult, result] = getResult(playerChoiceString, robotChoiceString);
    setMessage(vsResult + result);

    setScore(result);
  }

  function setScore(result: Result) {
    if (result === Result.PlayerWin) {
      setPlayerScore(playerScore + 1);
    } else if (result === Result.RobotWin) {
      setRobotScore(robotScore + 1);
    } else {
      setTieCount(tieCount + 1);
    }
  }

  return (
    <Card className={classes.play}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Play the Game</Typography>

        <TextField
          id="playerName"
          label="Player Name"
          variant="outlined"
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
        />

        <Typography variant="h5">Choose your action</Typography>

        <div className={classes.buttonGroup}>
          <GameButton handleClick={buttonClick} name={Choice.Rock} />
          <GameButton handleClick={buttonClick} name={Choice.Paper} />
          <GameButton handleClick={buttonClick} name={Choice.Scissors} />
        </div>

        <GameStateOutput
          robot={robotChoice}
          player={playerChoice}
          playerName={playerName}
          gameResult={message}
        />
        <ScoreTable
          numberOfGamesPlayed={totalGamesPlayed}
          robotScore={robotScore}
          playerScore={playerScore}
          tieCount={tieCount}
        />
      </Grid>
    </Card>
  );
}
