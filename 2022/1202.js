const {parseArray} = require('../helpers')
const path = require('path')

const playGame = async () => {
    const choices = await parseArray(path.resolve(__dirname, '1202_data.txt'), (str) => str.split(' '))
    
    let totalScore = 0;
    choices.forEach(([choiceone, choicetwo]) => {
        const typeone = playerOneMap[choiceone];
        const typetwo = getChoice(choicetwo, typeone);
        const outcome = getOutcome(typetwo, typeone);
        let score = typeScore[typetwo] + outcomeScore[outcome];
        totalScore += score;
    })

    return totalScore;
}

playGame()
    .then(score => console.log(score))
    .catch(err => console.log(err))

const getChoice = (strategy, opponentChoice) => {
    // lose
    if(strategy === 'X'){
        if(opponentChoice === 'rock') return 'scissors'
        if(opponentChoice === 'paper') return 'rock'
        if(opponentChoice === 'scissors') return 'paper'
    }

    // Draw
    if(strategy === 'Y') return opponentChoice;

    // Win
    if(strategy === 'Z'){
        if(opponentChoice === 'rock') return 'paper'
        if(opponentChoice === 'paper') return 'scissors'
        if(opponentChoice === 'scissors') return 'rock'
    }

    throw Error(`Unsupported strategy '${strategy}' or type '${opponentChoice}'`)
}

const playerOneMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors'
}

const playerTwoMap = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
}

const typeScore = {
    rock: 1,
    paper: 2,
    scissors: 3,
}

const outcomeScore = {
    "-1":0,
    "0":3,
    "1": 6
}

const getOutcome = (valueOne, valueTwo) => {
    if(valueOne === 'rock'){
        switch(valueTwo){
            case 'rock':
                return '0';
            case 'paper':
                return '-1';
            case 'scissors':
                return '1';
        }
    }
    
    if(valueOne === 'paper'){
        switch(valueTwo){
            case 'rock':
                return '1';
            case 'paper':
                return '0';
            case 'scissors':
                return '-1';
        }
    }
    
    if(valueOne === 'scissors'){
        switch(valueTwo){
            case 'rock':
                return '-1';
            case 'paper':
                return '1';
            case 'scissors':
                return '0';
        }
    }

    return 0;
}