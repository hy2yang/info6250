const chain = (num)=> {  
    
    this.one = () => chain(num+1);

    this.two = () => chain(num+2);

    this.result = () => num;

    return { one: this.one, two: this.two, result: this.result };
}

module.exports = chain(0);