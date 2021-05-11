"use strict";
(function() {

    function generateQuiz() {
        const out = [];
        //for every question create a radio button for every answer
        questionsMathSimple.forEach(
            (currentQuestion, questionNumber) => {
                //list of all possible answers
                const answers = [];
                //add button for every answer ( Create html with template literals)
                for(letter in currentQuestion.answers){
                    answers.push(
                        `<label><input type="button" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}</label>`
                    );
                }
                //add the question and answers to output
                out.push(
                    `<div class="task">
                    <div class="question"> ${currentQuestion.question}</div>
                    <div class="answers"> ${answers.join("")}</div>
                </div>`
                );
            }
        );

        //push the output list into the html element
        taskContainer.innerHTML = out.join('');
    }

    function showResult(){
        //get the answer containers
        const answerContainer = taskContainer.querySelectorAll('.answers');

        //count the correct answers
        let correctAnswers = 0;

        //for each question get wether its correct

    }

    //Variables
    const taskContainer = document.getElementById('task')
    const questionsMathSimple = [
        {
            question: '1 + 1 =...',
            answers: {
                a: '3',
                b: '5',
                c: '129',
                d: '2'
            },
            correctAnswer: 'd'
        },
        {
            question: '2 * 3 =...',
            answers: {
                a: '5',
                b: '6',
                c: '9',
                d: '3'
            },
            correctAnswer: 'b'
        },
        {
            question: '11 + 10 =...',
            answers: {
                a: '120',
                b: '4',
                c: '21',
                d: '2'
            },
            correctAnswer: 'c'
        },
        {
            question: '4 * 5 =...',
            answers: {
                a: '20',
                b: '0',
                c: '12123',
                d: '90'
            },
            correctAnswer: 'a'
        },
        {
            question: '90 + 1000=...',
            answers: {
                a: '9120',
                b: '1923',
                c: '1100',
                d: '1090'
            },
            correctAnswer: 'd'
        }
    ];

    generateQuiz();

})();