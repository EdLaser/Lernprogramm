"use strict";

//variables
//model, view, presenter
let model;
let view;
let presenter;

//load when document is loaded
document.addEventListener('DOMContentLoaded', function (){
   //initialize the variables
    model = new Model();
    presenter = new Presenter();
    view = new View(presenter);
    presenter.setModelAndView(model,view);
    //setTimeout(presenter, 3000);
    presenter.startPresenter();
});

// ##### Model #####
class Model {
    getTask() {
        return "Hallo";
    }
}
// ##### #####

// ##### Presenter #####
class Presenter {
    setModelAndView(model, view){
        this.model = model;
        this.view = view;
    }

    startPresenter(){
        //Begin application
        let question = document.getElementById('question');
        question.innerHTML= 'Aufgabe: ' + model.getTask();
    }

    evaluate(answer){
        console.log('Presenter -> Antwort: ' + answer);
    }
}
// ##### #####

// ##### View #####
class View {
    constructor(presenter) {
        this.presenter = presenter;
        this.setHandler();
    }

    setHandler() {
        // use capture false -> use bubbling
        // bind this -> this is refering to object rather than event
        document.getElementById('options').addEventListener('click', this.checkAnswer.bind(this), false);
        document.querySelectorAll('#options > *')[0].textContent = 'Opt 1';
        document.querySelectorAll('#options > *')[1].textContent = 'Opt 2';
        document.querySelectorAll('#options > *')[2].textContent = 'Opt 3';
        document.querySelectorAll('#options > *')[3].textContent = 'Opt 4';

    }

    checkAnswer(event) {
        //Debugging
        console.log('View -> Evaluate: ' + event.type + " " + event.target.nodeName);
        this.presenter.evaluate(String(event.target.attributes.getNamedItem('id').value));
    }
}
// ##### #####