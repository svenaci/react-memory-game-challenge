import { useState } from "react";
import "./App.css";

type TCell = {
  row: number;
  col: number;
};

function App() {
  //first lets us build a 2d array
  const [grid, setgrid] = useState([
    [1, 2],
    [2, 1],
  ]);

  //next we need a way for us to show the hidden cards
  //create a second grid to keep track of where we clicked
  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousSelectedCard, setPreviousSelectedCard] = useState<
    TCell | undefined
  >();

  //keep track of prior card
  function handleSelectedCard(rowIndex: number, colIndex: number) {
    if (revealedGrid[rowIndex][colIndex]) return;
    //reveal the cards
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    //current clicked card
    const clickedCard = grid[rowIndex][colIndex];
    //set previous card selected
    setPreviousSelectedCard({
      row: rowIndex,
      col: colIndex,
    });

    // //if user has selected previous card do smt
    if (previousSelectedCard) {
      const previousSelectedCardNumber =
        grid[previousSelectedCard.row][previousSelectedCard.col];
      //if not the same then hide the card
      if (previousSelectedCardNumber !== clickedCard) {
        setTimeout(() => {
          //hide clicked cards
          newRevealedGrid[rowIndex][colIndex] = false;
          //hide previous card
          newRevealedGrid[previousSelectedCard.row][previousSelectedCard.col] =
            false;
          //show new grid with hidden cards
          setRevealedGrid([...newRevealedGrid]);
        }, 1000);
      } else {
        const hasWon = revealedGrid.flat().every((isRevealed) => isRevealed);
        if (hasWon) {
          setTimeout(() => {
            alert("You have won");
          }, 200);
        }
      }
      //if prior card matches current card clicked, leave it as revealed
      //set previous selected card to undefined to start looking for the follwing pair of cards
      setPreviousSelectedCard(undefined);
    }
  }
  return (
    <div className="gridRow">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="gridCol">
          {row.map((number, colIndex) => (
            <div
              key={colIndex}
              className="card"
              onClick={() => handleSelectedCard(rowIndex, colIndex)}
            >
              {revealedGrid[rowIndex][colIndex] ? number : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
