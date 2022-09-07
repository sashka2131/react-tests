import React, { useState } from "react";
import TodoList from "./TodoList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Typography } from "@material-ui/core";

let prevQuestionNumber = -1;

let answerList = [];

const Question = ({ questions }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checkedNumber, setCheckedNumber] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userQuestionNumber, setUserQuestionNumber] = useState();

  const question = questions[questionNumber];

  if (questionNumber == 0 && prevQuestionNumber !=0) {
    updateQuestions(0)
    prevQuestionNumber=0;
  }

  function updateQuestions(newQuestionNumber) {
    var sortedArray = [...questions[newQuestionNumber].answers].sort(
      () => Math.random() - 0.5
    );
    answerList = sortedArray;
  }

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
        {answerList.map((ans, index) => (
          <div className={colorizeAnswer(ans.number)}>
            <ListItem
              key={index.toString()}
              dense
              button
              onClick={() => checkBoxChange(ans.number)}
            >
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

  function colorizeAnswer(ansNumber) {
    var checked = ansNumber == checkedNumber;

    if (showAnswer) {
      console.log(checked);
      if (checkedNumber != question.right && checked) {
        return "false-answer";
      } else if (checkedNumber == question.right && checked) {
        return "right-answer";
      }

      if (ansNumber == question.right) {
        return "right-answer";
      }
    }
  }

  function nextQuestion() {
    prevQuestionNumber=questionNumber;
    setShowAnswer(false);
    setCheckedNumber(-1);
    var qNumber =
      questionNumber + 1 > questions.length - 1
        ? questionNumber
        : questionNumber + 1;

    updateQuestions(qNumber);
    return qNumber;
  }

  function previousQuestion() {
    prevQuestionNumber=questionNumber;
    setShowAnswer(false);
    setCheckedNumber(-1);
    var qNumber = questionNumber - 1 < 0 ? questionNumber : questionNumber - 1;

    updateQuestions(qNumber);
    return qNumber;
  }
};

export default Question;
