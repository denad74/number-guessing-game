import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.ceil(Math.random() * 100)
  );
  const [answerNumber, setAnswerNumber] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [prevAnswer, setPrevAnswer] = useState([]);
  const [messageAlert, setMessageAlert] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [styleClass, setStyleClass] = useState("");
  const [isdisable, setIsdisable] = useState(false);

  console.log(randomNumber);

  const submit = (event) => {
    event.preventDefault();

    if (answerNumber.trim() !== "") {
      if (!prevAnswer.length === 0 || prevAnswer.includes(answerNumber)) {
        return alert("You have already entered this number! Try again!");
      } else {
        if (attempts !== 1) {
          if (Number(answerNumber) === randomNumber) {
            setMessageAlert("Congratulations! You got it right!");
            setStyleClass("bg-success");
            setIsStart(true);
            setIsOver(true);
            setIsdisable(true);
            setAnswerNumber("");
          } else if (answerNumber > randomNumber) {
            setMessageAlert("PS! The last guess was too high!");
            setStyleClass("bg-denger");
            setAttempts(attempts - 1);
            setIsStart(true);
          } else if (answerNumber < randomNumber) {
            setMessageAlert("UPS! The last guess was too low");
            setStyleClass("bg-info");
            setAttempts(attempts - 1);
            setIsStart(true);
          }
        } else {
          setIsOver(true);
          setMessageAlert("GAME OVER!");
          setStyleClass("bg-warning");
          setIsStart(true);
          setPrevAnswer([]);
          setIsdisable(true);
        }
      }
      setPrevAnswer([...prevAnswer, answerNumber]);
      setAnswerNumber("");
    }
  };

  function handleChange(e) {
    e.preventDefault();
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAnswerNumber(e.target.value);

      console.log(e.target.value);
    } else {
      alert("please check your phone number");
    }
  }

  function startNewGame() {
    setRandomNumber(Math.ceil(Math.random() * 100));
    setAttempts(10);
    setPrevAnswer([]);
    setStyleClass("");
    setIsStart(false);
    setIsOver(false);
    setIsdisable(false);
    setAnswerNumber("");
    setMessageAlert("");
  }

  function reset() {
    if (!isOver) {
      setAttempts(10);
      setPrevAnswer([]);
      setStyleClass("");
      setMessageAlert("");
      setAnswerNumber("");
    }
  }

  function clear() {
    setAnswerNumber("");
  }

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <div className="container">
        <form onSubmit={submit}>
          <label htmlFor="number">Enter a number</label>
          <input type="number" onChange={handleChange} value={answerNumber} />
        </form>
        <button className="btn-big" onClick={submit} disabled={isdisable}>
          Submit number
        </button>
        <button className="btn-small" onClick={clear}>
          Clear
        </button>
        <button className="btn-small" onClick={reset}>
          Reset
        </button>

        <hr />
        <div
          className="attempts-box"
          style={{ visibility: isStart ? "visible" : "hidden" }}
        >
          <p>Remaining attempts: {attempts}</p>
        </div>
        <div style={{ visibility: isStart ? "visible" : "hidden" }}>
          <p>Previous guesses: {prevAnswer + ","} </p>
        </div>
        <div
          style={{
            visibility: isStart ? "visible" : "hidden",
          }}
          className={styleClass}
        >
          <p style={{ padding: "10px", color: "#fff" }}>{messageAlert}</p>
        </div>
        <div>
          <button
            style={{ visibility: isOver ? "visible" : "hidden" }}
            className="btn-big"
            onClick={startNewGame}
          >
            Star new game
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
