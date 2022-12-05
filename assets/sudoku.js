const sudokuGrid = document.querySelector("#sudokuGrid");

let grid = [
  [5, 3, 6, 8, 2, 7, 9, 4, 1],
  [1, 7, 2, 9, 6, 4, 3, 5, 8],
  [8, 9, 4, 1, 5, 3, 2, 6, 7],
  [7, 1, 5, 3, 4, 9, 8, 2, 6],
  [6, 4, 3, 7, 8, 2, 1, 9, 5],
  [9, 2, 8, 5, 1, 6, 7, 3, 4],
  [4, 8, 1, 2, 9, 5, 6, 7, 3],
  [3, 6, 9, 4, 7, 1, 5, 8, 2],
  [2, 5, 7, 6, 3, 8, 4, 1, 9],
];

const generateSudoku = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const shuffleNumbers = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  
  
  const shuffledNumbers = shuffleNumbers(numbers);
      
  const shuffleGrid = () => {
    shuffledNumbers.unshift(0);
    shuffledNumbers.push(0);

    for (let i = 1; i < 11; i++) {
      grid = grid.map((row) =>
        row.map((cell) =>
          cell == shuffledNumbers[i]
            ? (cell = shuffledNumbers[i - 1])
            : (cell = cell)
        )
      );
    }
  };

  const rotateGrid = () => {
    for (let i = 0; i < 3; i++) {
      grid.unshift(grid.pop());
      for (let j = 0; j < 9; j++) {
        grid[j].unshift(grid[j].pop());
      }
    }
  };
  
  const removeNumbers = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Math.random() < 0.5) grid[i][j] = 0;
      }
    }
  };
  
  const isGridSolvable = (grid) => {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] !== 0) count++;
      }
    }
    return count >= 17;
  };

  shuffleGrid();
  rotateGrid();

  removeNumbers();

  while (!isGridSolvable(grid)) {
    generateSudoku();
  }
};

const isGridSolved = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) return false;
    }
  }
  return true;
};

const isNumberValid = (row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === parseInt(num)) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === parseInt(num)) {
      return false;
    }
  }
  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (grid[i][j] === parseInt(num)) {
        return false;
      }
    }
  }
  return true;
};

const displaySudoku = () => {
  generateSudoku();

  sudokuGrid.innerHTML = "";

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (grid[i][j] === 0) {
        const input = document.createElement("input");

        cell.classList.add("empty");
        input.setAttribute("type", "number");
        input.setAttribute("oninput", "this.value = this.value.slice(0,1)");
        input.addEventListener("change", () => {
          if (input.value !== "")
            if (isNumberValid(i, j, input.value)) {
              grid[i][j] = parseInt(input.value);
              input.classList.remove("invalid");
            } else input.classList.add("invalid");
          else {
            grid[i][j] = 0;
            input.classList.remove("invalid");
          }

          if (isGridSolved()) alert("You solved the sudoku!");
        });
        input.classList.add("input");
        cell.appendChild(input);
      } else cell.textContent = grid[i][j];

      sudokuGrid.appendChild(cell);
    }
};

displaySudoku();
