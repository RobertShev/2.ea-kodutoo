/* TYPER */
const TYPER = function () {
	console.log(0);
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
	//lisasin counter ja points
  this.counter = 0
  this.points = 0

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
	console.log(1);
	  
  },

  loadWords: function () {
    const xmlhttp = new XMLHttpRequest()
	 console.log('8')

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
	  console.log('2')
    this.generateWord()
    this.word.Draw()
    window.addEventListener('keypress', this.keyPressed.bind(this))
	this.startTime = new Date().getTime()
  },

  generateWord: function () {
	  console.log('3')
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]
	//lisasin word, et scori arvutada
   this.word = new Word(wordFromArray, this.canvas, this.ctx)
  },

  keyPressed: function (event) {
	  console.log('7')
    const letter = String.fromCharCode(event.which)

     if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()
      if (this.word.left.length === 0) {
        this.guessedWords += 1
        if (this.counter > ((this.wordMinLength + parseInt(this.guessedWords / 5)) * 1000) / 2) {
          this.points -= 5 
        } else if (this.counter < ((this.wordMinLength + parseInt(this.guessedWords / 5)) * 1000) / 2) {
          this.points += 10 //siin tuleb punkte juurde
        }
        this.counter = 0
        if (this.guessedWords === 27) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          Endgame()
		  //peale 27 arvatud sõna, on mäng läbi
        }

        this.generateWord()
      }
    } else {
      this.points -= 1 // võtab punkte maha iga valesti trükitud sõna eest
    }
  }
}

/* WORD */
const Word = function (word, canvas, ctx) {
  this.word = word
  this.left = this.word
  this.canvas = canvas
  this.ctx = ctx
}

Word.prototype = {
  Draw: function () {
	  console.log('4')
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
   console.log('5')

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined)tempArray[wordLength] = []
    tempArray[wordLength].push(words[i])
  }

  return tempArray
  
}


function startGame () {
  window.typer.points = 0
  window.typer.counter = 0

  /*const typer = new TYPER()
  window.typer = typer*/
}

function endGame () {
  let r = confirm('Mäng on läbi \n Sinu skoor on: ' + window.typer.points)
  if (r == true) {
    window.typer.guessedWords = 0
    window.typer.points = 0
  } else {
    window.location.href = ''
  }
}

window.onload = function () {
	 console.log('6')
  const typer = new TYPER()
  window.typer = typer

}
