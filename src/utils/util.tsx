

const util = {
  generateGameBoard: (row: number, col: number, floorVal: number, ceilVal: number) => {
    const board = [];
    for (let i = 0; i < row; i++) {
      const rowArr = [];
      for (let j = 0; j < col; j++) {
        const randomNum = Math.floor(Math.random() * (ceilVal - floorVal + 1)) + floorVal;
        rowArr.push(randomNum);
      }
      board.push(rowArr);
    }
    return board;
  },

  generateGameBoardWithBias: (row: number, col: number, floorVal: number, ceilVal: number, bias: number) => {
    const board = [];
    for (let i = 0; i < row; i++) {
      const rowArr = [];
      for (let j = 0; j < col; j++) {
        const randumNum = (() => {
          if (bias === 0)
            return Math.floor(Math.random() * (ceilVal - floorVal + 1)) + floorVal;
          
          const biasedRandom = bias > 0 
            ? Math.pow(Math.random(), 1 - bias)
            : 1 - Math.pow(1 - Math.random(), 1 + bias);
          
          return Math.floor(biasedRandom * (ceilVal - floorVal + 1)) + floorVal;
        })();
        
        rowArr.push(randumNum);
      }
      board.push(rowArr);
    }
    return board;
  },
}

export default util;