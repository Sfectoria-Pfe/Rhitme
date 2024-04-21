import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useEffect } from "react";
import "./Pomodoro.css";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import audio from "./toAudio.mp3";
import bell from "./bell.mp3";

function Pomodoro() {
  const [phase, setPhase] = useState("work");
  const [duration, setDuration] = useState(0);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTitmer, setShowTimer] = useState(false);

  const bellsound = new Audio(bell);
  const audiosound = new Audio(audio);

  const handleWorkChange = (e) => {
    if (e.target.value === "") {
      setWorkDuration(0);
    } else setWorkDuration(parseInt(e.target.value));
  };

  const handleBreakChange = (e) => {
    if (e.target.value === "") {
      setBreakDuration(0);
    } else setBreakDuration(parseInt(e.target.value));
  };

  useEffect(() => {
    if (phase === "work") {
      setDuration(workDuration);
    } else {
      setDuration(breakDuration);
    }
  }, [phase, workDuration, breakDuration]);

  const handleComplete = () => {
    if (phase === "work") {
      setPhase("break");

      bellsound.play();
    } else {
      setPhase("work");

      audiosound.play();
    }
  };

  return (
    <div className="p-container ">
      <div className={`p-timer ${showTitmer ? "d-flex" : "d-none"}`}>
        <div className="p-phase">
          <div className={phase === "work" ? "p-active" : ""}>Work</div>
          <div className={phase === "break" ? "p-active" : ""}>Break</div>
        </div>
        <CountdownCircleTimer
          key={phase}
          isPlaying={isPlaying}
          size="100"
          duration={duration * 60}
          colors={["#3ac978", "#3ac977", "#ff5e5e", "#A30000"]}
          colorsTime={[
            duration * 60,
            duration * 0.75 * 60,
            duration * 0.3 * 60,
            0,
          ]}
          onComplete={handleComplete}
          trailStrokeWidth="15"
          className="p-countdown"
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            return (
              <div className="p-countdown">
                {`${minutes < 10 ? "0" + minutes : minutes}:${
                  seconds < 10 ? "0" : ""
                }${seconds}`}
              </div>
            );
          }}
        </CountdownCircleTimer>
        <div className="p-controle">
          {isPlaying ? (
            <FaCirclePause onClick={() => setIsPlaying(!isPlaying)} />
          ) : (
            <FaCirclePlay onClick={() => setIsPlaying(!isPlaying)} />
          )}
        </div>
      </div>

      <div className="p-config">
        <div className="p-setwork ">
          <label htmlFor="work" className="unselectable">
            Work duration
          </label>
          <input
            id="work"
            type="number"
            placeholder="n minutes"
            onChange={handleWorkChange}
            value={workDuration}
            min="0"
          />
        </div>
        <div className="p-setbreak">
          <label htmlFor="break" className="unselectable">
            Break duration
          </label>
          <input
            id="break"
            type="number"
            placeholder="n minutes"
            onChange={handleBreakChange}
            value={breakDuration}
            min="0"
          />
        </div>
        <div className="p-timer-state-container">
          <button
            className="p-timer-state d-flex justify-content-center align-items-center"
            onClick={() => setShowTimer(!showTitmer)}
          >
            {showTitmer ? "Hide Timer" : "Show Timer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
