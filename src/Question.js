import React, { useState } from "react";
import TodoList from "./TodoList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, TextField, Typography } from "@material-ui/core";

let prevQuestionNumber = -1;

let answerList = [];

const Question = ({ questions }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checkedNumber, setCheckedNumber] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userQuestionNumber, setUserQuestionNumber] = useState("");

  const [searchText, setSearchText] = useState("llllll");
  const [foundList, setFoundList] = useState([]);

  const question = questions[questionNumber];

  if (questionNumber == 0 && prevQuestionNumber != 0) {
    updateQuestions(0);
    prevQuestionNumber = 0;
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

  const handleFindChange = (event) => {
    setSearchText(event.target.value);
  };

  function handleUserQuestionChoose() {
    setShowAnswer(false);
    setCheckedNumber(-1);
    var qNumber = userQuestionNumber - 1;
    setQuestionNumber(qNumber);
    updateQuestions(qNumber);
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
    prevQuestionNumber = questionNumber;
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
    prevQuestionNumber = questionNumber;
    setShowAnswer(false);
    setCheckedNumber(-1);
    var qNumber = questionNumber - 1 < 0 ? questionNumber : questionNumber - 1;

    updateQuestions(qNumber);
    return qNumber;
  }

  function generateNextRandom() {
    prevQuestionNumber = questionNumber;
    setShowAnswer(false);
    setCheckedNumber(-1);
    var newRandomQustionNumber = Math.floor(Math.random() * 501);
    updateQuestions(newRandomQustionNumber);
    return newRandomQustionNumber;
  }

  function getRightQuestion(question) {
    console.log(question);
    var res = "not found";
    question.answers.forEach((answer) => {
      console.log(question.right);
      if (answer.number == question.right) {
        console.log("popad:" + answer.text);
        res = answer.text;
        return answer.text;
      }
    });
    return res;
  }

  function findByWord() {
    var word = searchText;
    if(word.length<2){
      return;
    }
    let matchedQuestionArray = [];
    questions.forEach((element) => {
      if (element.q.toLowerCase().includes(word.toLowerCase())) {
        matchedQuestionArray.push(element);
      }
    });

    setFoundList(
      <div>
        <List>
          {matchedQuestionArray.map((question) => (
            <div>
              <Typography>{question.q}</Typography>
              <Typography>{getRightQuestion(question)}</Typography>
            </div>
          ))}
        </List>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Button onClick={() => findByWord()}>Find</Button>
        <TextField
          inputProps={{ inputMode: "text" }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={handleFindChange}
        ></TextField>
        <br></br>
        {foundList}
      </div>
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
        <div class="submit">
          <Button
            variant="contained"
            size="large"
            onClick={() => chooseAnswer()}
          >
            SUBMIT
          </Button>
        </div>

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

        <div class="find-question">
          <Button
            size="large"
            onClick={() => setQuestionNumber(generateNextRandom())}
          >
            NEXT RANDOM
          </Button>
        </div>

        <div class="find-question">
          <Button size="large" onClick={() => handleUserQuestionChoose()}>
            GET TEST
          </Button>

          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            id="outlined-basic"
            label="Number"
            variant="outlined"
            onChange={handleInputChange}
          ></TextField>
        </div>
      </div>
    </div>
  );
};

export default Question;
