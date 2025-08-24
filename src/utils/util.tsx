import { Target } from "./types";

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

  getTarget: (boardArr: number[][]) : Target => {
    const rowLen = boardArr.length;
    const colLen = boardArr[0]?.length || 0;

    const midRow = Math.floor(rowLen / 2);
    const midCol = Math.floor(colLen / 2);

    // directions: vertical, horizontal, diagonal-up, diagonal-down
    //const dirSeed = Math.random();
    const dirSeed = 0.2; // for testing
    const direction = dirSeed < 0.25 ? 'vertical'
      : dirSeed < 0.5 ? 'horizontal'
      : dirSeed < 0.75 ? 'diagonal-up'
      : 'diagonal-down';

    const target = (() => {
      let targetValue = 0;
      const solutionPositions = [] as { row: number; col: number }[];
      if(direction === 'vertical') {
        // solution length should be betweeen midRow and rowLen (inclusive)
        const solutionLen = Math.floor(Math.random() * (rowLen - midRow + 1)) + midRow;
        const startRow = Math.floor(Math.random() * (rowLen - solutionLen + 1));
        const startCol = Math.floor(Math.random() * colLen);

        for(let i = 0; i < solutionLen; i++) {
          targetValue += boardArr[startRow + i][startCol];
          solutionPositions.push({ row: startRow + i, col: startCol });
        }
      }

      return {
        value: targetValue,
        solutionPositions: solutionPositions
      };
    })();

    return target;
  }
}

export default util;