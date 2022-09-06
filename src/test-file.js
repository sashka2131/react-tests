const fs= require("fs")

let chunkArray = []

fs.readFile("tests-1.txt", (err, data) => {
    if (err) throw err;

    var re=/\r\n|\n\r|\n|\r/g; 
    var rows = data.toString().replace(re,"\n").split("\n")
    


    const chunkSize = 8;
    
    for(let i =0;i< rows.length; i+=chunkSize){
        var chunk = rows.slice(i, i+chunkSize);
        var question = createQuestionObject(chunk)
        chunkArray.push(question)
    }

    chunkArray.forEach(elem => console.log(getQuestion(elem)))

  
    
  });

  function createQuestionObject(chunk){
    return {
        "q":chunk[0],
        "answers":[
            {"1":chunk[1]},
            {"2":chunk[2]},
            {"3":chunk[3]},
            {"4":chunk[4]},
            {"5":chunk[5]},
        ],
        "right":chunk[6],
        "number":chunk[7]
    }
  }

  function randomizeAnswers(answers){
    var shuffledList = answers.sort(()=>Math.random()-0.5);
    number =  1
    var listUi = []
    shuffledList.forEach(elem => listUi.push({"num":number++,"ans":elem[Object.keys(elem)[0]]}))
    return listUi
  }

  function getQuestion(question){
    return question["number"] +"\n"+ question["q"]+"\n" + JSON.stringify(randomizeAnswers(question["answers"]))
  }
