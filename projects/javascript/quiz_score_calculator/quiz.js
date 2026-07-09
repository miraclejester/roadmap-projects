const possibleAnswers = ['A', 'B', 'C', 'D', 'E'];

const questions = [
    { id: 1, correctAnswer: 'B' },
    { id: 2, correctAnswer: 'A' },
    { id: 3, correctAnswer: 'D' },
    { id: 4, correctAnswer: 'C' },
];

function isAnswerCorrect(question, userAnswer) {
    return question !== undefined && userAnswer.answer === question.correctAnswer;
}

function countCorrectAnswers(questions, userAnswers) {
    return userAnswers.reduce((total, answer) => {
        const isCorrect = isAnswerCorrect(questions.find((q) => q.id === answer.questionId), answer);
        total += isCorrect ? 1 : 0;
        return total;
    }, 0);
}

function calculatePercentage(correctCount, totalQuestions) {
    if (totalQuestions === 0) {
        return 0;
    }
    return (correctCount / totalQuestions) * 100;
}

function getResultMessage(percentage) {
    if (percentage >= 80) {
        return 'Great work';
    }
    
    if (percentage >= 60) {
        return 'You passed';
    }
    
    return 'Keep practicing';
}

function createQuizResult(questions, userAnswers) {
    const correctCount = countCorrectAnswers(questions, userAnswers);
    const percentage = calculatePercentage(correctCount, questions.length);
    return {
        correctCount,
        totalQuestions: questions.length,
        percentage,
        message: getResultMessage(percentage)
    }
}

function buildQuestionList(questions, parentElement) {
    const liElements = [];
    for (const question of questions) {
        const liElement = document.createElement('li');
        liElement.textContent = `Question ${question.id}. Answer: ${question.correctAnswer}`;
        liElements.push(liElement);
    }
    parentElement.replaceChildren(...liElements);
}

function createAnswerInputs(questions) {
    const elements = [];
    for (const question of questions) {
        const labelElement = document.createElement('label');
        labelElement.htmlFor = `answer-input-${question.id}`;
        labelElement.textContent = `Question ${question.id}`;
        
        const selectElement = document.createElement('select');
        selectElement.id = `answer-input-${question.id}`;
        
        const initialOption =  document.createElement('option');
        initialOption.textContent = 'No answer';
        initialOption.value = '';
        selectElement.append(initialOption);
        for (const answer of possibleAnswers) {
            const option = document.createElement('option');
            option.textContent = answer;
            option.value = answer;
            selectElement.appendChild(option);
        }
        elements.push(labelElement);
        elements.push(selectElement);
    }
    return elements;
}

function getAnswerObjects(questions) {
    return questions.map((question) => {
        const answerInput = document.querySelector(`#answer-input-${question.id}`);
        const answer = answerInput.value;
        return {
            questionId: question.id,
            answer
        }
    })
        .filter((answerObject) => possibleAnswers.includes(answerObject.answer));
}

const userAnswers = [
    { questionId: 1, answer: 'B' },
    { questionId: 2, answer: 'C' },
    { questionId: 3, answer: 'D' },
    { questionId: 4, answer: 'C' },
];

const questionsList = document.querySelector('#questions-list');
buildQuestionList(questions, questionsList);

const answersForm = document.querySelector('#answers-form');
const answerInputs = createAnswerInputs(questions)
answersForm.append(...answerInputs);
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.type = 'submit';
answersForm.append(submitButton);

const resultsMessage = document.querySelector('#quiz-results');
answersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const quizResult = createQuizResult(questions, getAnswerObjects(questions));
    resultsMessage.textContent = `
        Correct: ${quizResult.correctCount}. Questions: ${quizResult.totalQuestions}. 
        Percentage: ${quizResult.percentage}%. ${quizResult.message}
    `;
});
