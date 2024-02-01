const quizData = [
    {
      question: 'The .container class provides a full width container, spanning the entire width of the screen ',
      options: ['False', 'True'],
      answer: 'True',
    },
    {
      question: 'Which class provides a responsive fixed width container??',
      options: ['.container-responsive', '.container', '.container-fixed', '.container-fluid'],
      answer: '.container-fixed',
    },
    {
      question: 'Which contextual class is used to create an orange text color?',
      options: ['.txt-orange', '.txt-warning', '.text-warning', '.bg-warning'],
      answer: '.bg-warning',
    },
    {
      question: 'The Bootstrap grid system is based on how many columns?',
      options: ['9', '6', '12', '3'],
      answer: '12',
    },
    {
      question: 'Which of the following class in Bootstrap is used to create a dropdown menu?',
      options: [
        '.dropdown',
        '.select',
        '.select-list',
        'none of the above',
      ],
      answer: '.dropdown',
    },
    {
      question: 'The content must be placed within ________ in bootstrap',
      options: ['Rows', 'Containers', 'Columns', 'None'],
      answer: 'Columns',
    },
    {
      question: 'Which of the following is the default size of H3 bootstrap heading?',
      options: [
        '12px',
        '24px',
        '36px',
        '48px',
      ],
      answer: '24px',
    },
    {
      question: 'Which of the following class applies hover color to a specific row or a cell?',
      options: ['Warning', 'Active', 'Success', 'Danger'],
      answer: 'ActiveS',
    },
    {
      question: 'Which plugin is used to cycle through elements, like a slideshow?',
      options: [
        'Carousel Plugin',
        'Modal Plugin',
        'Tooltip Plugin',
        'None',
      ],
      answer: 'Carousel Plugin',
    },
    {
      question: 'Which of the following bootstrap version should be used to support?',
      options: ['Bootstrap 1', 'Bootstrap 2', 'Bootstrap 3', 'Bootstrap 4'],
      answer: 'Bootstrap 3'
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