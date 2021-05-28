"use strict"
const fragesatz = document.getElementById("fragebereich");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("fragenummer");
const hi = document.getElementById("bereich");
/*document.body.style.background = 'black'; // сделать фон красным
setTimeout(() => document.body.style.background = '', 3000); // вернуть назад*/
//Класс, который представляет сам тест

class Quiz
{
    constructor( questions, results)
    {
        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.Niveau = results;

        //Количество набранных очков
        this.score = 0;

        //Номер результата из массива
        this.meinNiveau = 0;

        //Номер текущего вопроса
        this.fragenummer = 0;
    }

    Click(index)
    {
        //Добавляем очки
        let value = this.questions[this.fragenummer].answers[index].value;
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if(value == 1)
        {
            correct = index;
        }
        else
        {
            //Иначе ищем, какой ответ может быть правильным
            for(let i = 0; i < this.questions[this.fragenummer].answers.length; i++)
            {
                if(this.questions[this.fragenummer].answers[i].value == 1)
                {
                    correct = i;
                }
            }
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next()
    {
        this.fragenummer++;

        if(this.fragenummer >= this.questions.length)
        {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End()
    {
        for(let i = 0; i < this.Niveau.length; i++)
        {
            if(this.Niveau[i].Check(this.score))
            {
                this.meinNiveau = i;
            }
        }
    }
}



//Класс, представляющий результат
class Result
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value)
    {
        if(this.value <= value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

//Массив с результатами
const results =
    [
        new Result("Sie müssen noch viel lernen", 0),
        new Result("Sie sind schon ziemlich gut.", 2),
        new Result("Sie sind überdurchschnittlich schlau", 4),
        new Result("Sie kennen das Thema perfekt.", 6)
    ];

//Обновление теста
function Update()
{
    //Проверяем, есть ли ещё вопросы
    if(quiz.fragenummer < quiz.questions.length)
    {
        //Если есть, меняем вопрос в заголовке
        fragesatz.innerHTML = quiz.questions[quiz.fragenummer].text;
        if(quiz.questions==mathefragen)
            katex.render(quiz.questions[quiz.fragenummer].text, fragesatz, {
                throwOnError: false
            });
        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";

        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.fragenummer].answers.length; i++)
        {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.fragenummer].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.fragenummer + 1) + " / " + quiz.questions.length;

        document.getElementById('progress').style.width=(quiz.score/(quiz.questions.length))*100+"%";
        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    }
    else
    {
        //Если это конец, то выводим результат
        buttonsElem.innerHTML = "";
        fragesatz.innerHTML = quiz.Niveau[quiz.meinNiveau].text;
        pagesElem.innerHTML = "Punkten: " + quiz.score;
        document.getElementById('progress').style.width=(quiz.score/(quiz.questions.length))*100+"%";

        let btn = document.createElement("button");
        btn.className = "button";
        btn.innerHTML ="Noch mal";
        buttonsElem.appendChild(btn);
        btn.onclick=function() { // перезапишет существующий обработчик

            quiz = new Quiz(questions, results);
            Update();
        }
    }
}

function Init()
{
    //Находим все кнопки
    let btns = document.querySelectorAll("button");

    for(let i = 0; i < btns.length; i++)
    {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index)
{
    //Получаем номер правильного ответа
    let correct = quiz.Click(index);
//let correct = fragen[index].value;
    //Находим все кнопки
    let btns = document.querySelectorAll("button");

    //Делаем кнопки серыми
    for(let i = 0; i < btns.length; i++)
    {
        btns[i].className = "button button_passive";
    }

    //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным

    if(correct >= 0)
    {
        btns[correct].className = "button button_correct";
    }

    if(index != correct)
    {
        btns[index].className = "button button_wrong";
    }


    //Ждём секунду и обновляем тест
    setTimeout(Update, 1000);
}

const mathefragen =
    [
//1
    {
        text:  "2 + 2 = ",

        answers: [ {text:"1",value:0},{text:"3",value:0},{text: "4",value: 1},{text: "0",value: 0}]

    },
//2
    {
        text:  "x^2+x^2",

        answers: [ {text:"2x^2",value:0},{text:"x^4",value:0},{text: "x^8",value: 1},{text: "2x^4",value: 0}]

    },

//3
    {
        text:  "2 / 2 = ",

        answers: [ {text:"2",value:0},{text:"3",value:0},{text: "4",value: 1},{text: "0",value: 0}]

    },
    //4
    {
        text:  "x^2*x^2",

        answers: [ {text:"x^4",value:0},{text:"x^2",value:0},{text: "2x^2",value: 1},{text: "4x",value: 0}]

    },
//5
    {
        text:  "c = \\pm\\sqrt{a^2 + b^2}",

        answers: [ {text:"2",value:0},{text:"3",value:0},{text: "4",value: 1},{text: "0",value: 0}]

    },
//6
    {
        text:  "2 + 2 = ",

        answers: [ {text:"2",value:0},{text:"3",value:0},{text: "4",value: 1},{text: "0",value: 0}]

    }


];


const internettechnologien =
    [
//1
    {
        text:  "Welche Authentifizierung bietet HTTP",

        answers: [ {text:"Digest Access Authentication",value:0},{text:"OTP",value:0},{text: "OAuth",value: 1},{text: "2-Faktor-Authentifizierung",value: 0}]

    },
    {
        text:  "Welches Transportprotokoll eignet sich für zeitkritische Übertragungen",

        answers: [ {text:"UDP",value:0},{text:"TCP",value:0},{text: "HTTP",value: 1},{text: "Fast Retransmit",value: 0}]

    }]
//2

//Сам тест
/*
alert(document.querySelector('input[name="radio"]:checked').value);



var rates = document.getElementById('rates').value;
var rate_value;

if(rates =='Fixed Rate'){
    rate_value = document.getElementById('r1').value;

}else if(rates =='Variable Rate'){
    rate_value = document.getElementById('r2').value;

}else if(rates =='Multi Rate'){
    rate_value = document.getElementById('r3').value;
}

document.getElementById('results').innerHTML = rate_value;
*/
/*
let questions;
if (document.getElementById('auf1').checked){
    questions=mathefragen
    const quiz = new Quiz(questions, results);
    Update();
}
    else if (document.getElementById('auf1').checked) {
    questions = 0;
    const quiz = new Quiz(questions, results);
    Update();
}

 */
/*
a.onclick=function (){
    questions=mathefragen;
    quiz = new Quiz(questions, results);
    Update();
}
*/
let questions;
let quiz;
fragesatz.innerHTML = "<img src='image/hi.gif'  width='70%' height='80%'  float='left' overflow= 'hidden'/>";
buttonsElem.innerHTML = "";
pagesElem.innerHTML = "";
//bereich.innerHTML="<div>Привет<img src='image/quiz3.gif'/> !</div>";
//document.body.main.innerHTML="Alles lernen";;
//width="50%"


mathelernen.onclick = function() { // перезапишет существующий обработчик
    questions=mathefragen;
    quiz = new Quiz(questions, results);
    Update();
    document.getElementById("fach").innerHTML="Wir lernen Mathe, ist nicht schwer";
};

notenlernen.onclick = function() { // перезапишет существующий обработчик
    questions = internettechnologien;
    quiz = new Quiz(questions, results);
    Update();
    document.getElementById("fach").innerHTML="Wir lernen IT !!! =P ";
};


