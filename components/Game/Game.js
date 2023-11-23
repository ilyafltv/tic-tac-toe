class Game {
    cellClickHandler(index) {
        // Получение данных
        const gameStats = localStorageUtil.getGameStatus();
        let moves = localStorageUtil.getMoves();
        let cells = localStorageUtil.getCells();
        let element = document.getElementById(`cell-${index}`);

        // Изменение клетки(крестик, нолик, пустая) исходя из условий
        if (cells[index] === "empty" && gameStats.status !== "stopped") {

            if (moves.sign === "cross") {
                localStorageUtil.updateCells(index, "cross");
                cells = localStorageUtil.getCells();
                element.classList.add('cell-cross');
            } else {
                localStorageUtil.updateCells(index, "zero");
                cells = localStorageUtil.getCells();
                element.classList.add('cell-zero');
            }

            // Все случаи выигрыша
            if ((cells[0] === moves.sign && cells[1] === moves.sign && cells[2] === moves.sign) || (cells[3] === moves.sign && cells[4] === moves.sign && cells[5] === moves.sign) || (cells[6] === moves.sign && cells[7] === moves.sign && cells[8] === moves.sign) || (cells[0] === moves.sign && cells[4] === moves.sign && cells[8] === moves.sign) || (cells[2] === moves.sign && cells[4] === moves.sign && cells[6] === moves.sign) || (cells[0] === moves.sign && cells[3] === moves.sign && cells[6] === moves.sign) || (cells[1] === moves.sign && cells[4] === moves.sign && cells[7] === moves.sign) || (cells[2] === moves.sign && cells[5] === moves.sign && cells[8] === moves.sign)) {
                // Если победил один из игроков
                localStorageUtil.addUnitToScore(`${moves.turn}`);
                const score = localStorageUtil.getScore();

                // Отрисовка нового счета
                const score_title = document.getElementById('score_title');
                score_title.innerHTML = `${score.p1}:${score.p2}`;

                game.stopGame();
            }
            else if (game.checkForEmpty(cells) === "not_found") {
                // Если сыграли в нчиью
                game.stopGame();
            }
            else {
                // Продолжение игры
                localStorageUtil.switchSign(); // Поменять знак(крестик/нолик) 
                game.switchTurnHandler(); // Поменять очередь(игрок1/игрок2)
            }
        }
    }
    stopGame() {
        localStorageUtil.updateGameStatus("stopped");
        const btn = document.getElementById('continue_btn');

        btn.classList.add("game-content__btn-show");
    }
    continueGame() {
        localStorageUtil.clearCells();
        localStorageUtil.updateGameStatus("continues");

        localStorageUtil.switchFirstMove();
        localStorageUtil.giveFirstTurn();
        localStorageUtil.setCross();

        game.render();
    }
    switchTurnHandler() {
        localStorageUtil.switchTurn();
        let turn = localStorageUtil.getMoves().turn;
        document.getElementById('move_title').innerHTML = `${turn}-MOVE`;
    }
    // Проверка на наличие пустых клеток
    checkForEmpty(cells) {
        let result = "not_found";
        cells.forEach(cell => {
            if (cell === "empty") result = "found";
        });
        return result;
    }

    render() {
        let cells = localStorageUtil.getCells();
        let score = localStorageUtil.getScore();
        let moves = localStorageUtil.getMoves();
        let gameStatus = localStorageUtil.getGameStatus();
        let cellsRender = ``;
        let BtnShow = ``;

        if (gameStatus.status === "stopped") {
            BtnShow = "game-content__btn-show";
        }

        for (let i = 0; i < 9; i++) {
            let sign = "";
            if (cells[i] === "cross") sign = "cell-cross";
            else if (cells[i] === "zero") sign = "cell-zero";
            cellsRender += `
            <div class="game-content__cell ${sign}" id="cell-${i}" onclick="game.cellClickHandler(${i});"></div>
            `;
        }

        const html = `
            <div class="game-content">
                <p id="move_title" class="game-content__whose_move">${moves.turn}-MOVE</p>
                <div class="game-content__cells">
                    ${cellsRender}
                </div>
                <button class="game-content__btn ${BtnShow}" id="continue_btn" onClick="game.continueGame();">Next batch</button>
                <p class="game-content__score" id="score_title">${score.p1}:${score.p2}</p>
                <div class="game-content__names">
                    <span class="game-content__name">P1</span>
                    <span class="game-content__name">P2</span>
                </div>
            </div>
        `;

        ROOT_GAME.innerHTML = html;
    }
}
const game = new Game();

game.render();