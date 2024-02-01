const quizData = [
    {
      question: 'HTML stands for ',
      options: ['home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Text Markup Language'],
      answer: 'Hyper Text Markup Language',
    },
    {
      question: 'Choose the correct HTML element for the large heading?',
      options: ['<h1>', '<h6>', '<heading>', '<head>'],
      answer: '<h1>',
    },
    {
      question: 'What is the correct html element for inserting line breaking?',
      options: ['<ibr>', '<break>', '<br>', 'All'],
      answer: '<br>',
    },
    {
      question: 'What is the correct HTML for adding a background color?',
      options: ['<body style="background-color:yellow;">', '<body bg="yellow>"', '<background>yellow</background>', 'color:yellow'],
      answer: '<body style="background-color:yellow;">',
    },
    {
      question: 'CHOOSE the correct HTML element  to define important text',
      options: [
        '<strong>',
        '<i>',
        '<b>',
        '<important>',
      ],
      answer: '<i>',
    },
    {
      question: 'Choose the correct HTML element to define emphasized text',
      options: ['<em>', '<italic>', '<i>', 'None'],
      answer: '<em>',
    },
    {
      question: 'Which character is used to indicate an end tag?',
      options: [
        '/',
        '<',
        '*',
        '^',
      ],
      answer: '/',
    },
    {
      question: 'How can you make a numbered list?',
      options: ['<list>', '<ul>', '<dl>', '<ol>'],
      answer: '<ol>',
    },
    {
      question: 'How can you make a bulleted list?',
      options: [
        '<dl>',
        '<ul>',
        '<ol>',
        '<list>',
      ],
      answer: '<ul>',
    },
    {
      question: 'What is the correct Html for making a drop-down list?',
      options: ['<list>', '<select>', '<input type="list">', '<input type="dropdown">'],
      answer: '<input type="dropdown">'
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();