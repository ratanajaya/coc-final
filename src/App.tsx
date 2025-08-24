import { useEffect, useState } from 'react';

import 'assets/css/antdOverride.css';
import util from 'utils/util';

interface BoardSetting {
  row: number;
  col: number;
  floorVal: number;
  ceilVal: number;
  bias: number; // (−1<x<1,x∈R)
}

const difficulties = [
  { label: 'Easy', row: 5, col: 5 },
  { label: 'Medium', row: 8, col: 6 },
  { label: 'Hard', row: 10, col: 7 },
]

function App() {
  const [boardSetting, setBoardSetting] = useState<BoardSetting>({ 
    row: 5, col: 5, floorVal: -20, ceilVal: 20, bias: 0.3
  });
  const [boardArr, setBoardArr] = useState<number[][]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);

  function resetGame() {
    setSelectedCells([]);
    const boardArr = util.generateGameBoardWithBias(boardSetting.row, boardSetting.col, boardSetting.floorVal, boardSetting.ceilVal, boardSetting.bias);
    setBoardArr(boardArr);
  }

  useEffect(() => {
    resetGame();
  }, [boardSetting]);

  return (
    <div className=' h-dvh w-dvw flex justify-center items-center bg-stone-800 pt-2 pb-2'>
      <div className=' bg-stone-600 h-full flex flex-col justify-center w-full max-w-screen-sm rounded-md'>
        <div className=' text-2xl text-center text-white font-bold'>COC Grand Final Game</div>
        <div className=' flex-1'>
          <div className="flex justify-center gap-4 mb-4">
            {difficulties.map((diff) => (
              <button
                key={diff.label}
                onClick={() => setBoardSetting(prev =>({ 
                    ...prev,
                    row: diff.row, 
                    col: diff.col 
                  })
                )}
                className={`px-4 py-2 text-white rounded font-semibold transition-colors ${
                  boardSetting.row === diff.row && boardSetting.col === diff.col 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-4 flex flex-col items-center">
            <h3 className="text-white text-xl mb-2 text-center">
              Game Board
            </h3>
            <div
              className="grid gap-1 w-fit"
              style={{ 
                gridTemplateColumns: `repeat(${boardArr[0]?.length || 0}, minmax(0, 1fr))`
              }}
            >
              {boardArr.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isSelected = selectedCells.some(c => c.row === rowIndex && c.col === colIndex);
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        w-10 h-10 flex items-center justify-center text-sm font-bold rounded hover:cursor-pointer
                        ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'}
                      `}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedCells(selectedCells.filter(c => !(c.row === rowIndex && c.col === colIndex)));
                        } else {
                          setSelectedCells([...selectedCells, { row: rowIndex, col: colIndex }]);
                        }
                      }}
                    >
                      {cell}
                    </div>
                  )
              })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;