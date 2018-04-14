function Constructor(str){
    this.word = str;
    this.getWord = () => {return this.word};
    return {word : this.word, getWord : this.getWord};
}

module.exports = Constructor;