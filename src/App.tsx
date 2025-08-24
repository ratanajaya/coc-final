import { useEffect, useState } from 'react';

import './App.css';
import util from 'utils/util';
import { BoardSetting, Target } from 'utils/types';
import constant from 'utils/constant';

function App() {
  const [boardSetting, setBoardSetting] = useState<BoardSetting>({ 
    row: 5, col: 5, floorVal: -20, ceilVal: 20, bias: 0.3
  });
  const [boardState, setBoardState] = useState<{
    boardArr: number[][];
    target: Target;
  }>({ 
    boardArr: [],
    target: { value: 0, solutionPositions: [], direction: null },
  });

  const { boardArr, target } = boardState;

  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [showDebugPanel, setShowDebugPanel] = useState<boolean>(false);

  function resetGame() {
    setSelectedCells([]);
    const boardArr = util.generateGameBoardWithBias(boardSetting.row, boardSetting.col, boardSetting.floorVal, boardSetting.ceilVal, boardSetting.bias);
    const target = util.getTarget(boardArr);

    setBoardState({ boardArr, target });
  }

  useEffect(() => {
    resetGame();
  }, [boardSetting]);

  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const selectedSum = selectedCells.reduce((sum, cell) => {
      if (boardArr[cell.row] && boardArr[cell.row][cell.col] !== undefined) {
        return sum + boardArr[cell.row][cell.col];
      }
      return sum;
    }, 0);
    if (selectedCells.length > 0 && selectedSum === target.value) {
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
        resetGame();
      }, 1000);
    }
  }, [selectedCells]);

  return (
    <div className='min-h-dvh w-dvw flex justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 pt-2 pb-2'>
      <div className='game-container h-full flex flex-col justify-center w-full max-w-screen-sm rounded-xl'>
        <div className='game-title text-2xl text-center font-bold mb-4 mt-4'>COC Final Game</div>
        <div className=' flex-1'>
          <div className="flex justify-center gap-4 mb-6">
            {constant.difficulties.map((diff) => (
              <button
                key={diff.label}
                onClick={() => setBoardSetting(prev =>({ 
                    ...prev,
                    ...diff
                  })
                )}
                className={`difficulty-button px-4 py-2 text-white rounded-lg font-bold transition-all ${
                  boardSetting.row === diff.row && boardSetting.col === diff.col 
                    ? 'active' 
                    : ''
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
          
          <div className="mt-6 p-6 flex flex-col items-center relative">
            {showCongrats && (
              <div className="congrats-overlay absolute inset-0 flex items-center justify-center rounded-xl z-10">
                <h2 className="text-white text-5xl font-bold drop-shadow-lg">Correct!</h2>
              </div>
            )}
            <div className="target-display text-white text-lg mb-4 text-center font-bold">
              Target: {target.value}
            </div>
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
                      className={`game-cell w-11 h-11 flex items-center justify-center rounded-lg cursor-pointer ${
                        isSelected ? 'selected' : ''
                      }`}
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

        <div className="px-6 pb-6">
          <div className="instructions-panel text-white p-4 rounded-xl text-sm">
            <p className="text-center text-base">
              <span className="font-bold text-yellow-400 text-lg mb-3">⚡</span> Select sequential cells (horizontal, vertical, or diagonal) that sum up to the target value
            </p>
            <p className=" text-blue-300 italic text-center">
              Inspired by the final game in Clash of Champions Season 2
            </p>
          </div>
        </div>

        <div className="px-6 pb-4">
          <button
            onClick={() => setShowDebugPanel(!showDebugPanel)}
            className="debug-button mb-3 px-4 py-2 text-sm text-white rounded-lg transition-all font-semibold"
          >
            {showDebugPanel ? 'Hide' : 'Show'} Debug Panel
          </button>
          
          {showDebugPanel && (
            <div className="debug-panel text-white p-4 rounded-xl text-sm">
              <div className="mb-3">
                <span className="font-bold text-blue-300">Selected Sum: </span>
                <span className="text-yellow-300 font-semibold">
                  {selectedCells.reduce((sum, cell) => {
                    if (boardArr[cell.row] && boardArr[cell.row][cell.col] !== undefined) {
                      return sum + boardArr[cell.row][cell.col];
                    }
                    return sum;
                  }, 0)}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-blue-300">Selected Cells: </span>
                <span className="text-green-300">
                  {selectedCells.length > 0 
                    ? selectedCells.map(pos => `(${pos.row},${pos.col})`).join(', ')
                    : '-'
                  }
                </span>
              </div>

              <div className="mb-3">
                <span className="font-bold text-blue-300">Target: </span>
                <span className="text-yellow-300 font-semibold">{target.value}</span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-blue-300">Target Direction: </span>
                <span className="text-purple-300">{target.direction ?? '-'}</span>
              </div>
              <div>
                <span className="font-bold text-blue-300">Solution Cells: </span>
                <span className="text-orange-300">
                  {target.solutionPositions.length > 0 
                    ? target.solutionPositions.map(pos => `(${pos.row},${pos.col})`).join(', ')
                    : '-'
                  }
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;