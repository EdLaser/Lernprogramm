"use strict";
//variables
//model, view, presenter
let model;
let view;
let presenter;
let correctAnswers = 0;
let questionIndex;

const mathButton = document.getElementById('mathe');
const internetButton = document.getElementById('it');
const header = document.getElementById('top_text');
const allButtons = document.querySelectorAll('#options > *')

//load when document is loaded
/*document.addEventListener('DOMContentLoaded', function (){
    //initialize the variables
    model = new Model();
    presenter = new Presenter();
    view = new View(presenter);
    presenter.setModelAndView(model,view);
    //setTimeout(presenter, 3000);
    presenter.displayQuestion();
}); */

mathButton.addEventListener('click', function (){
    questionIndex=0;
    // set = questionsMathSimple;
    model = new Model(questionsMathSimple);
    presenter = new Presenter();
    view = new View(presenter)
    presenter.setModelAndView(model, view);
    presenter.displayQuestion();
    view.setHeader('Mathe');
});

internetButton.addEventListener('click', function (){
    questionIndex=0;
    // set = questionsIT
    model = new Model(questionsIT);
    presenter = new Presenter();
    view = new View(presenter)
    presenter.setModelAndView(model, view);
    presenter.displayQuestion();
    view.setHeader('Internet Technologien');
});

// ##### Model #####
class Model {
    constructor(set) {
        this.questions = set;
    }
    getTask(i) {
        if (this.questions === questionsMathSimple)
            return katex.renderToString(this.questions[i].question);
        else
            return this.questions[i].question;
    }

    getAnswer(i) {
        return this.questions[i].correctAnswer;
    }

    getOptions(i) {
        return this.questions[i].answers;
    }

    getLength(){
        return this.questions.length;
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

    displayButtons(i) {
      return model.getOptions(i);
    }

    presentLength(){
        return model.getLength();
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
        // allButtons[0].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[0].addEventListener('click', this.checkAnswer.bind(this), false);

        // allButtons[1].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[1].addEventListener('click', this.checkAnswer.bind(this), false);

        // allButtons[2].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[2].addEventListener('click', this.checkAnswer.bind(this), false);

        // allButtons[3].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[3].addEventListener('click', this.checkAnswer.bind(this), false);

    }

    setButtons(i) {
        allButtons[0].textContent = this.presenter.displayButtons(i).a;
        allButtons[1].textContent = this.presenter.displayButtons(i).b;
        allButtons[2].textContent = this.presenter.displayButtons(i).c;
        allButtons[3].textContent = this.presenter.displayButtons(i).d;
    }

    displayCorrectAnswers(){
        document.getElementById('side_math').textContent = 'Correct answers: ' + correctAnswers;
    }

    /* nextQuestion() {
        if(questionIndex <= 5) {
            console.log("Question " + questionIndex + " has been answered.");
            this.presenter.displayQuestion();
            this.displayCorrectAnswers();
        }
        if(questionIndex > 5) {
            this.endReached();
            this.displayCorrectAnswers();
            questionIndex = 0;
            return;
        }
    } */

    checkAnswer(event) {
        //Debugging
        if(questionIndex < this.presenter.presentLength()) {
            console.log('View -> Evaluate: ' + event.type + " " + event.target.nodeName);
            console.log("Question " + questionIndex + " has been answered.");
            this.presenter.evaluate(String(event.target.attributes.getNamedItem('id').value), questionIndex);

            questionIndex += 1;
            this.presenter.displayQuestion();
            this.displayCorrectAnswers();
        }
        if(questionIndex === 5) {
            questionIndex = 0;
            this.endReached();
            this.displayCorrectAnswers();
        }
    }

    setHeader(text) {
        header.textContent=text;
    }

    endReached() {
        document.querySelector('#task-container').textContent = 'Alle Fragen beantwortet, sehr gut !';
    }
}
// ###### #####

const questionsMathSimple = [
    {
        question: '1 + 1 = ...',
        answers: {
            a: '3',
            b: '5',
            c: '129',
            d: '2'
        },
        correctAnswer: 'd'
    },
    {
        question: '2 * 3 = ...',
        answers: {
            a: '5',
            b: '6',
            c: '9',
            d: '3'
        },
        correctAnswer: 'b'
    },
    {
        question: 'x^2 * x^3 = ...',
        answers: {
            a: 'x^2',
            b: '2x',
            c: 'x^5',
            d: 'x'
        },
        correctAnswer: 'c'
    },
    {
        question: '\\sqrt{x} = 3',
        answers: {
            a: 'x=9',
            b: 'x=15',
            c: 'x=3',
            d: 'x=12'
        },
        correctAnswer: 'a'
    },
    {
        question: '\\cfrac{x}{1 + \\cfrac{4}{8}} = 12',
        answers: {
            a: '27',
            b: '10',
            c: '3',
            d: '18'
        },
        correctAnswer: 'd'
    }
];

const questionsIT = [
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
        question: 'Welches Argument muss ein img immer haben ?',
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