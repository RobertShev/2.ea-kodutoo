let myCollection = document.getElementsByTagName("canvas");
myCollection[0].style.backgroundColor = "red";
/*score*/
this.combo += 1
this.guessedLetters += 1
if(this.combo > 8){
    this.combo = 0
}

this.score +=(this.guessedLetters+this.guessedWords)
//updatescore
if (this.word.left.length === 0) {
    this.guessedWords += 1
    this.score += (this.guessedLetters+this.guessedWords)*2
    //updatescore
        if(this.guessedWords == 30){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            gameFinish();
        }

    this.generateWord()
}
