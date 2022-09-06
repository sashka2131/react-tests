import React, { useState } from "react";
import TodoList from "./TodoList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Typography } from "@material-ui/core";

const Question = ({ questions }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checkedNumber, setCheckedNumber] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userQuestionNumber, setUserQuestionNumber] = useState();

  const question = questions[questionNumber];

  var checkBoxChange = (num) => {
    setCheckedNumber(num);
  };

  const handleInputChange = (event) => {
    setUserQuestionNumber(event.target.value);
  };

  return (
    <div>
      <Typography variant="h2">{question.number}</Typography>
      <Typography class="question-text" variant="h4">
        {question.q}
      </Typography>
      <List>
        {question.answers.map((ans, index) => (
          <div className={colorizeAnswer(checkedNumber == ans.number)}>
            <ListItem key={index.toString()} dense button>
              <Checkbox
                type="radio"
                checked={checkedNumber == ans.number}
                onChange={() => checkBoxChange(ans.number)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText
                primary={
                  <Typography variant="h5">{ans.text.substring(3)}</Typography>
                }
              />
            </ListItem>
          </div>
        ))}
      </List>

      <div>
        <div class="nav-buttons">
          <Button
            size="large"
            onClick={() => setQuestionNumber(previousQuestion())}
          >
            PREV
          </Button>
          <Button
            size="large"
            onClick={() => setQuestionNumber(nextQuestion())}
          >
            NEXT
          </Button>
        </div>

        <div class="submit">
          <Button
            variant="contained"
            size="large"
            onClick={() => chooseAnswer()}
          >
            SUBMIT
          </Button>
        </div>

        <div>
          <Button onClick={() => handleUserQuestionChoose()}>GET TEST</Button>
          <input
            onChange={handleInputChange}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );

  function handleUserQuestionChoose() {
    setShowAnswer(false);
    setCheckedNumber(-1);
    setQuestionNumber(userQuestionNumber - 1);
  }

  function chooseAnswer() {
    if (checkedNumber != -1) {
      setShowAnswer(true);
      if (question.right == checkedNumber) {
      } else {
      }
    }
  }

  function colorizeAnswer(checked) {
    if (showAnswer) {
      if (checkedNumber != question.right && checked) {
        return "false-answer";
      } else if (checkedNumber == question.right && checked) {
        return "right-answer";
      }
    }
  }

  function nextQuestion() {
    setShowAnswer(false);
    setCheckedNumber(-1);
    return questionNumber + 1 > questions.length - 1
      ? questionNumber
      : questionNumber + 1;
  }

  function previousQuestion() {
    setShowAnswer(false);
    setCheckedNumber(-1);
    return questionNumber - 1 < 0 ? questionNumber : questionNumber - 1;
  }
};

export default Question;
