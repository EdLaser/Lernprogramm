"use strict";
//variables
//model, view, presenter
let model;
let view;
let presenter;
let correctAnswers = 0;
let questionIndex;

const side_it = document.getElementById('side_it');
const side_math = document.getElementById('side_math');
const side_uni = document.getElementById('side_uni');

const mathButton = document.getElementById('mathe');
const internetButton = document.getElementById('it');
const uniButton = document.getElementById('uni');
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
    // set = questionsMath;
    model = new Model(questionsMath,0 ,0);
    presenter = new Presenter();
    view = new View(presenter)
    presenter.setModelAndView(model, view);
    presenter.start();
    view.setHeader('Mathe');
});

internetButton.addEventListener('click', function (){
    // set = questionsIT
    model = new Model(questionsIT, 0, 0);
    presenter = new Presenter();
    view = new View(presenter)
    presenter.setModelAndView(model, view);
    presenter.start();
    view.setHeader('Internet Technologien');
});

uniButton.addEventListener('click', function (){
    // set = questionsMath;
    model = new Model(questionsUni,0 ,0);
    presenter = new Presenter();
    view = new View(presenter)
    presenter.setModelAndView(model, view);
    presenter.start();
    view.setHeader('Allgemeinwissen');
});

// ##### Model #####
class Model {
    constructor(set, index, correct) {
        this.questions = set;
        this.index = index;
        this.correctAnswers = correct;
    }

    incrementCorrect() {
        this.correctAnswers +=1;
    }

    getCorrect() {
        return this.correctAnswers;
    }

    getTask() {
        if (this.questions === questionsMath)
            return katex.renderToString(this.questions[this.index].question);
        else
            return this.questions[this.index].question;
    }

    getAnswer() {
        return this.questions[this.index].correctAnswer;
    }

    getOptions() {
        return this.questions[this.index].answers;
    }

    incrementIndex() {
        this.index +=1;
    }

    getIndex() {
        return this.index;
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

    start(){
        //Begin application
        console.log("Starting...");
        this.displayQuestion(0);
    }

    displayQuestion(){
        let question = document.getElementById('question');
        question.innerHTML= 'Aufgabe: ' + model.getTask();
        this.view.setButtons();
    }

    setCorrectAnswers() {
        if (this.model.questions === questionsIT) {
            this.view.displayCorrectAnswers(side_it,"IT: " + this.model.getCorrect()+"/5")
        }
        if (this.model.questions === questionsUni) {
            this.view.displayCorrectAnswers(side_uni, "Allgemein: " + this.model.getCorrect()+"/5")
        }
        if (this.model.questions === questionsMath) {
            this.view.displayCorrectAnswers(side_math, "Mathe: " + this.model.getCorrect()+"/5")
        }
    }

    evaluate(answer){
        console.log("Question " + this.model.getIndex() + " has been answered.");
        console.log("Array Length: " + this.model.getLength());

        if(this.model.getIndex() < this.model.getLength()) {
            console.log('Presenter -> Answer: ' + answer);
            if (answer === this.model.getAnswer(this.model.getIndex())) {
                this.model.incrementCorrect();
                console.log(answer + ' was correct!');
            } else {
                console.log(answer + ' was not correct');
            }

            this.setCorrectAnswers();

            if (this.model.getIndex() === 4) {
                this.view.endReached();
                return;
            }
            this.model.incrementIndex();

            this.displayQuestion();
        }
    }

    displayButtons() {
      return model.getOptions();
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

    setButtons() {
        allButtons[0].textContent = this.presenter.displayButtons().a;
        allButtons[1].textContent = this.presenter.displayButtons().b;
        allButtons[2].textContent = this.presenter.displayButtons().c;
        allButtons[3].textContent = this.presenter.displayButtons().d;
    }

    displayCorrectAnswers(element, text) {
        element.textContent = text;
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
        console.log('View -> Evaluate: ' + event.type + " " + event.target.nodeName);
        this.presenter.evaluate(String(event.target.attributes.getNamedItem('id').value));
    }

    setHeader(text) {
        header.textContent=text;
    }

    endReached() {
        let task_container = document.getElementById('task-container');
        task_container.style.fontSize = "medium";
        task_container.textContent = 'Alle Fragen beantwortet, sehr gut !';
    }
}
// ###### #####

const questionsMath = [
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

const questionsUni = [
    {
        question: 'Wo ist der Lemur heimisch ?',
        answers: {
            a: 'HTW-Dresden',
            b: 'Mexiko',
            c: 'Polen',
            d: 'Madagaskar'
        },
        correctAnswer: 'd'
    },
    {
        question: 'Wie viel % der Erde sind von Wasser bedeckt ?',
        answers: {
            a: '60 %',
            b: '70 %',
            c: '80 %',
            d: '85 %'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Wie oft kann ein Blatt Papier gefaltet werden ?',
        answers: {
            a: '7-mal',
            b: '12-mal',
            c: '9-mal',
            d: '15-mal'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Wie tief ist der Marianengraben ?',
        answers: {
            a: '11000m',
            b: '9000m',
            c: '7000m',
            d: '8500m'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Wie bestehe ich am besten eine Klausur ?',
        answers: {
            a: 'Spicken',
            b: 'Beten',
            c: 'Nicht erscheinen',
            d: 'Lernen'
        },
        correctAnswer: 'd'
    }
];