const {parseArray} = require('../helpers')
const path = require('path')

const playGame = async () => {
    const choices = await parseArray(path.resolve(__dirname, '1202_data.txt'), (str) => str.split(' '))
    console.log(choices)
}

playGame().catch(err => console.log(err))

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

const outComeStore = {
    "-1":0,
    "0":3,
    "1": 6
}

 // -1 lost
 // 0 draw
 // 1 win
const isWin = (playerOne, playerTwo) => {
    const valueOne = playerOneMap[playerOne];
    const valueTwo = playerTwoMap[playerTwo];
    
    if(valueOne === 'rock'){
        switch(valueTwo){
            case 'rock':
                return 0;
            case 'paper':
                return -1;
            case 'scissors':
                return 1;
        }
    }
    
    if(valueOne === 'paper'){
        switch(valueTwo){
            case 'rock':
                return 1;
            case 'paper':
                return 0;
            case 'scissors':
                return -1;
        }
    }
    
    if(valueOne === 'scissors'){
        switch(valueTwo){
            case 'rock':
                return -1;
            case 'paper':
                return 1;
            case 'scissors':
                return 0;
        }
    }

    return 0;
}