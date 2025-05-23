
    const submitBtn = document.getElementById('submit');
    const board = document.getElementById('board');
    const gameDiv = document.getElementById('game');
    const messageDiv = document.querySelector('.message');
    let player1 = "";
    let player2 = "";
    let currentPlayer = "X";
    let currentName = "";
    let moves = Array(9).fill(null);

    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    submitBtn.addEventListener('click', () => {
      player1 = document.getElementById('player-1').value;
      player2 = document.getElementById('player-2').value;
      if (!player1 || !player2) return alert("Please enter both names!");
      currentName = player1;
      document.getElementById('form').style.display = 'none';
      gameDiv.style.display = 'block';
      messageDiv.textContent = `${currentName}, you're up`;
      drawBoard();
    });

    function drawBoard() {
      board.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i + 1;
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
      }
    }

    function makeMove(index) {
      if (moves[index]) return; // Already filled
      const cell = document.getElementById(index + 1);
      cell.textContent = currentPlayer;
      moves[index] = currentPlayer;
      if (checkWinner()) {
        messageDiv.textContent = `${currentName}, congratulations you won!`;
        board.querySelectorAll('.cell').forEach(c => c.style.pointerEvents = 'none');
      } else if (moves.every(Boolean)) {
        messageDiv.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentName = currentPlayer === 'X' ? player1 : player2;
        messageDiv.textContent = `${currentName}, you're up`;
      }
    }

    function checkWinner() {
      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return moves[a] && moves[a] === moves[b] && moves[a] === moves[c];
      });
    }
