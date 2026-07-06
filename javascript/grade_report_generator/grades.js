const feedbacks = {
    A: 'Excellent work',
    B: 'Good job',
    C: 'You passed',
    D: 'You passed',
    F: 'Keep practicing'
};

function getLetterGrade(score) {
    if (score >= 90) {
        return 'A';
    }
    
    if (score >= 80) {
        return 'B';
    }
    
    if (score >= 70) {
        return 'C';
    }
    
    if (score >= 60) {
        return 'D';
    }
    
    return 'F';
}

function hasPassed(score) {
    return score >= 60;
}

function getFeedback(grade) {
    return feedbacks[grade];
}

function createGradeReport(name, score) {
    const grade = getLetterGrade(score);
    return {
        name,
        score,
        grade,
        passed: hasPassed(score),
        feedback: getFeedback(grade)
    }
}


const gradeForm = document.querySelector('#grade-form');
const nameInput = document.querySelector('#name-input');
const gradeInput = document.querySelector('#grade-input');
const reportText = document.querySelector('#report-text');

gradeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const report = createGradeReport(nameInput.value, Number(gradeInput.value));
    const passedText = report.passed ? 'Passed' : 'Failed';
    reportText.textContent = `${report.name}'s score: ${report.score} (${report.grade}). ${passedText}. ${report.feedback}`;
});