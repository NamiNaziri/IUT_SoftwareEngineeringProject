import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import moment from "moment";
import { Check } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { red, green, yellow, grey } from "@material-ui/core/colors";

import classes from "./style.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    flexGrow: 1,
    textAlign: "right",
  },
  red: {
    color: red[500],
  },
  green: {
    color: green[500],
  },
  yellow: {
    color: yellow[900],
  },
  grey: {
    color: grey[500],
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const renderTime = (classNames, done, pending, failed, { remainingTime }) => {
  const names = ["Seconds", "Minutes", "Hours", "Days", "Months", "Years"];
  const times = [60, 60, 24, 30, 12, 1];
  let index = 0;
  let time = remainingTime;
  for (; index < names.length; index++) {
    const next = Math.floor(time / times[index]);
    if (next > 0) time = next;
    else break;
  }
  let text;
  if (done) {
    text = (
      <div key={time} className={classNames.green}>
        Done
      </div>
    );
  } else if (pending) {
    text = (
      <div key={time} className={classNames.yellow}>
        Pending
      </div>
    );
  } else if (failed) {
    text = (
      <div key={time} className={classNames.red}>
        Failed
      </div>
    );
  } else if (remainingTime > 0) {
    text = (
      <>
        <div key={time}>{time}</div>
        <div key={names[index]} className={classNames.grey}>
          {names[index]}
        </div>
      </>
    );
  } else {
    text = (
      <div key={time} className={classNames.red}>
        Expired
      </div>
    );
  }

  return <div className={classes.timeWrapper}>{text}</div>;
};

const Timer = ({ deadline, done, pending, failed }) => {
  const classNames = useStyles();

  const seconds = moment.duration(moment(deadline).diff(moment())).asSeconds();

  let colors;

  if (done) {
    colors = [["#66A103", 0.33], ["#66A103", 0.33], ["#66A103"]];
  } else if (pending) {
    colors = [["#F7B801", 0.33], ["#F7B801", 0.33], ["#F7B801"]];
  } else if (failed) {
    colors = [["#A30000", 0.33], ["#A30000", 0.33], ["#A30000"]];
  } else {
    colors = [["#66A103", 0.33], ["#F7B801", 0.33], ["#A30000"]];
  }

  return (
    <div className={classes.timerWrapper}>
      <CountdownCircleTimer
        key={deadline}
        isPlaying={!(done || pending || failed)}
        duration={isNaN(seconds) ? 0 : Math.max(seconds, 0)}
        colors={colors}
      >
        {renderTime.bind(this, classNames, done, pending, failed)}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
