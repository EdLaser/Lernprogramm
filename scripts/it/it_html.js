"use strict";

//variables
//model, view, presenter
let model;
let view;
let presenter;
let correctAnswers = 0;
let questionIndex = 0;

const questionsMathSimple = [
    {
        question: 'Welches ist kein Block-Level-Element ?',
        answers: {
            a: 'DIV',
            b: 'H1-H6',
            c: 'P',
            d: 'SPAN'
        },
        correctAnswer: 'd'
    },
    {
        question: 'Welches Agrument muss ein img immer haben ?',
        answers: {
            a: 'class',
            b: 'src',
            c: 'style',
            d: 'alt'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Was ist kein Type-Wert im Element form ?',
        answers: {
            a: 'submit',
            b: 'passwort',
            c: 'check',
            d: 'checkbox'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Mit welcher Zeile beginnt jede Webseite ?',
        answers: {
            a: '<!DOCYTPE html>',
            b: '<head>',
            c: '<title>',
            d: '<html xmlns>'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Welches Element gehört nicht zur Textstrukturierung ?',
        answers: {
            a: 'ul',
            b: 'p',
            c: 'hr',
            d: 'aside'
        },
        correctAnswer: 'd'
    }
];

//load when document is loaded
document.addEventListener('DOMContentLoaded', function (){
    //initialize the variables
    model = new Model();
    presenter = new Presenter();
    view = new View(presenter);
    presenter.setModelAndView(model,view);
    //setTimeout(presenter, 3000);
    presenter.displayQuestion();
});

// ##### Model #####
class Model {
    getTask(i) {
        return questionsMathSimple[i].question;
    }

    getAnswer(i) {
        return questionsMathSimple[i].correctAnswer;
    }
}
// ##### #####

// ##### Presenter #####
class Presenter {
    setModelAndView(model, view){
        this.model = model;
        this.view = view;
    }

    displayQuestion(){
        //Begin application
        let question = document.getElementById('question');
        question.innerHTML= 'Aufgabe: ' + model.getTask(questionIndex);
        view.setButtons(questionIndex);
    }

    evaluate(answer, i){
        console.log('Presenter -> Answer: ' + answer);
        if (answer === model.getAnswer(i)) {
            correctAnswers += 1;
            console.log(answer + ' was correct!');
        } else {
            console.log(answer + ' was not correct');
        }
    }
}
// ##### #####

// ##### View #####
class View {
    constructor(presenter) {
        this.presenter = presenter;
        this.setHandler();
        this.setButtons(0);
    }

    setHandler() {
        // use capture false -> use bubbling
        // bind this -> this is refering to object rather than event
        document.getElementById('options').addEventListener('click', this.checkAnswer.bind(this), false);
        document.getElementById('options').addEventListener('click', this.nextQuestion.bind(this), false);
    }

    setButtons(i) {
        document.querySelectorAll('#options > *')[0].textContent = questionsMathSimple[i].answers.a;
        document.querySelectorAll('#options > *')[1].textContent = questionsMathSimple[i].answers.b;
        document.querySelectorAll('#options > *')[2].textContent = questionsMathSimple[i].answers.c;
        document.querySelectorAll('#options > *')[3].textContent = questionsMathSimple[i].answers.d;
    }

    showResult(){

    }

    nextQuestion() {
        if(questionIndex === 5) {
            document.querySelector('#result').textContent = 'Correct answers: ' + correctAnswers + '/5';
        }
        console.log("Question " + questionIndex + " has been answered.");
        this.presenter.displayQuestion();
    }

    checkAnswer(event) {
        //Debugging
        console.log('View -> Evaluate: ' + event.type + " " + event.target.nodeName);
        this.presenter.evaluate(String(event.target.attributes.getNamedItem('id').value), questionIndex);
        questionIndex +=1;
        console.log(questionIndex);
    }
}
// ##### #####