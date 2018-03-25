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
  this.counter = 0
  this.points = 0
  this.time = 0
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

    xmlhttp.open('GET', 'lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()

    window.addEventListener('keypress', this.keyPressed.bind(this))
    this.startTime = new Date().getTime()
    window.setInterval(this.loop.bind(this), 100)
  },
  loop: function () {
    this.word.Draw()

    const currentTime = new Date().getTime()

    this.counter = currentTime - this.startTime
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]
    this.time = ((this.wordMinLength + parseInt(this.guessedWords / 5)) * 1000) / 2
    this.word = new Word(wordFromArray, this.canvas, this.ctx)
  },

  keyPressed: function (event) {
    const letter = String.fromCharCode(event.which)

    if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()
      // this.points += 1 A point for every letter (not needed)
      if (this.word.left.length === 0) {
        this.guessedWords += 1

        if (this.counter > ((this.wordMinLength + parseInt(this.guessedWords / 5)) * 1000) / 2) {
          this.points -= 5
        } else if (this.counter < ((this.wordMinLength + parseInt(this.guessedWords / 5)) * 1000) / 2) {
          this.points += 10 // adding points
        }

        this.counter = 0
        this.startTime = new Date().getTime()
        if (this.guessedWords === 10) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          gameFinish()
        }

        this.generateWord()
      }
    } else {
      this.points -= 1 // taking off points for wrong letter
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

// night mode
function day () {
  this.body.className = 'day'
  console.log('day mode')
}
function night () {
  this.body.className = 'night'
  console.log('night mode')
}

Word.prototype = {
  Draw: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.textAlign = 'center'
    this.ctx.font = 'Bold 140px Courier'
    this.ctx.fillStyle = '#C8A2BB' // change text color
    this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.textAlign = 'left'
    this.ctx.font = 'Bold 64px Courier'
    this.ctx.fillText('Punktid: ' + window.TYPER.instance_.points, 600, 90) // showing points

    this.ctx.textAlign = 'left'
    this.ctx.font = '140px Courier'
    this.ctx.fillText(window.typer.counter, 600, 200) // counter

    this.ctx.textAlign = 'left'
    this.ctx.font = '54px Courier'
    this.ctx.fillText('Sul on aega ' + window.typer.time + ' millisekundit', 600, 300) // counter

    this.ctx.textAlign = 'left'
    this.ctx.font = '54px Courier'
    this.ctx.fillText('Arvatud sõnade arv on: ' + window.typer.guessedWords + '/10', 600, 400)
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
    if (tempArray[wordLength] === undefined) tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}
function checkNameInput () {
  console.log(document.getElementById('nameText').value)
  let x = document.getElementById('nameText').value
  if (document.getElementById('nameText').value !== '') {
    startGame()
  } else {
    alert('Nimi on puudu!')
  }
}
function startGame () {
  window.typer.points = 0
  window.typer.counter = 0

  const typer = new TYPER()
  window.typer = typer
}

function gameFinish () {
  let r = confirm('Mäng läbi! \n Sinu skoor: ' + window.typer.points + ' \n Restart?')
  saveScore(document.getElementById('nameText').value, window.typer.points)
  if (r == true) {
    window.typer.guessedWords = 0
    window.typer.points = 0
    clearScore()
    restartGame()
  } else {
    window.location.href = ''
  }
}
function restartGame () {
  this.counter = 0
  const typer = new TYPER()
  window.typer = typer
  typer.generateWord()
  typer.word.Draw()
}
function clearScore () {
  window.typer.points = 0
  window.typer.counter = 0
  window.typer.startTime = new Date().getTime()
}
function saveScore (playerName, playerScore) {
  arr = []
  if (window.localStorage.length == 0) {
    player = [playerName, playerScore]
    arr.push(player)
    localStorage.setItem('arr', JSON.stringify(arr))
  } else {
    stored = JSON.parse(localStorage.getItem('arr'))
    player2 = [playerName, playerScore]
    stored.push(player2)
    localStorage.setItem('arr', JSON.stringify(stored))
  }
}
function showHighScores () {
  for (let i = 0; i < 10; i++) {
    document.getElementById(i + 1 + '.').innerHTML = sortArray()[i]
  }
}
function sortArray () {
  unsorted = JSON.parse(localStorage.getItem('arr'))
  sorted = unsorted.sort(function (a, b) {
    return a[1] - b[1]
  })
  sorted2 = sorted.reverse(function (a, b) {
    return a[1] - b[1]
  })
  return sorted2
}
window.onload = function () {
  const typer = new TYPER()
  window.typer = typer
}
// kasutatud https://github.com/nsalong/2.ea-kodutoo koodi (enamus helpersitest)