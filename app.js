let solvedWords = 0;
let helpDate = new Date();
let helpTime = helpDate.getTime()/1000;

function reviewLocalStorage(){
  for (let l = 1; l<11; l++) {
    if ((localStorage.getItem('result' + l)) == 'null' || (localStorage.getItem('result' + l)) == 0) {
      localStorage.setItem('result' + l,0);
      localStorage.setItem('resultShow' + l, "unknown");
    }
  }
}

/*Score Counting*/
function result (){
  let update = setInterval(function(){
    let date = new Date();
    let time = date.getTime()/1000;
    let timeLeft = Math.round(time-helpTime);
    let gameResult = ((newWord.length*solvedWords)-timeLeft);
    document.getElementById('timeLeft').innerHTML = "Time left : " + timeLeft +"/30";
    document.getElementById('result').innerHTML = "Current score : " + gameResult;
    document.addEventListener("keydown", function(event) {
      //if enter pressed  
      if(event.keyCode = 13){
        //add here changing fonts if enter pressed
      }
    })
    if (timeLeft>29){
      for (let i = 1; i< 11; i++){
        if (Number(gameResult) > localStorage.getItem('result'+1)){
          for (let j = 1; j < (11-j); j++){
            localStorage.setItem('result'+(11-j), localStorage.getItem('result'+(10-j)));
            localStorage.setItem('resultShow'+(11-j), localStorage.getItem('resultShow' + (10-j)));
          }
          localStorage.setItem('result'+i,Number(gameResult));
          localStorage.setItem('resultShow'+i, document.getElementById('gamerName').value);
          solvedWords = 0;
          break;
        }
      }
      clearInterval(update);
      alert("Game is over "+ localStorage.getItem('resultShow1') +", your result is " + gameResult + " points");
    }
  })
}

/*Show Results*/
//
function showResults(){
  //add results to result page from localstorage
  reviewLocalStorage();
  document.getElementById('record0').innerHTML = localStorage.getItem('result1') + " did " + localStorage.getItem('resultShow1');

}

/*Start Game*/
function startGame(){
  typer.start();
  let solvedWords = 0;
  let helpDate = new Date();
  let helpTime = helpDate.getTime()/1000;
  result();
}
function dayNight(){
      let currentTime = new Date().getHours();
    if (7 <= currentTime && currentTime < 20) {//20
        if (document.body.className = "day") {
            document.body.background = "https://images.unsplash.com/photo-1498932042873-e35fb6535a02?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=48808e8a3f27b79d9c17e6d69e6a3dfd&auto=format&fit=crop&w=1426&q=80";
    }
    }
    else {
        if (document.body.className = "night") {
            document.body.background = "https://images.unsplash.com/photo-1471047283799-ebd97acc0bc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74da19d4cfbd18c3c8ea0c8437d057e1&auto=format&fit=crop&w=1400&q=80";
        }
    }

    }

/* TYPER */
const TYPER = function () {
  if (TYPER.instance_) {
    return TYPER.instance_
  }
  TYPER.instance_ = this

  this.WIDTH = window.innerWidth
  this.HEIGHT = window.innerHeight
  this.canvas = null
  this.ctx = null

  this.words = []
  this.word = null
  this.wordMinLength = 5
  this.guessedWords = 0

  this.init()
}

window.TYPER = TYPER

TYPER.prototype = {
  init: function () {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')

    this.canvas.style.width = this.WIDTH + 'px'
    this.canvas.style.height = this.HEIGHT + 'px'

    this.canvas.width = this.WIDTH * 2
    this.canvas.height = this.HEIGHT * 2

    this.loadWords()
  },

  loadWords: function () {
    const xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.status === 0)) {
        const response = xmlhttp.responseText
        const wordsFromFile = response.split('\n')

        typer.words = structureArrayByWordLength(wordsFromFile)

        typer.start()
      }
    }

    xmlhttp.open('GET', './lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()

    window.addEventListener('keypress', this.keyPressed.bind(this))
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]
    this.word = new Word(wordFromArray, this.canvas, this.ctx)
  },

  keyPressed: function (event) {
    const letter = String.fromCharCode(event.which)

    if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()

      if (this.word.left.length === 0) {
        this.guessedWords += 1
        solvedWords ++;

        this.generateWord();
      }

      this.word.Draw()
    }
  }
}

/* WORD */
const Word = function (word, canvas, ctx) {
  this.word = word
  this.left = this.word
  this.canvas = canvas
  this.ctx = ctx
  newWord = this.left;
}

Word.prototype = {
  Draw: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 2)
    
  },

  removeFirstLetter: function () {
    this.left = this.left.slice(1)
  }
}

/* HELPERS */
function structureArrayByWordLength (words) {
  let tempArray = []

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined)tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}

window.onload = function () {
  const typer = new TYPER()
  window.typer = typer
  dayNight();
}

function day() {
    body.className = "day";
};

function night() {
    body.className = "night";    
};

function reset() {
    body.className = "";
};

$(function() {
    var button = $('input[type=button]');
    button.on('click', function() {
        button.not(this).removeAttr('disabled');
        $(this).attr('disabled', '');
    });
});