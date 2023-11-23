class LocalStorageUtil {
    constructor() {
        this.moves = 'moves';
        this.cells = 'cells';
        this.score = 'score';
        this.game = 'game';
    }

    getCells() {
        let cells = JSON.parse(localStorage.getItem(this.cells));
        if (cells === null) {
            cells = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",];
            localStorage.setItem(this.cells, JSON.stringify(cells));
        }
        return cells;
    }
    updateCells(index, sign) {
        let cells = JSON.parse(localStorage.getItem(this.cells));
        cells[index] = sign;
        localStorage.setItem(this.cells, JSON.stringify(cells));
    }
    clearCells() {
        const cells = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",];
        localStorage.setItem(this.cells, JSON.stringify(cells));
    }
    getMoves() {
        let moves = JSON.parse(localStorage.getItem(this.moves));
        if (moves === null) {
            moves = { first_move: "p1", turn: "p1", sign: "cross" };
            localStorage.setItem(this.moves, JSON.stringify(moves));
        }
        return moves;
    }
    giveFirstTurn() {
        let moves = JSON.parse(localStorage.getItem(this.moves));
        moves.turn = moves.first_move;
        localStorage.setItem(this.moves, JSON.stringify(moves));
    }
    switchTurn() {
        let moves = JSON.parse(localStorage.getItem(this.moves));
        if (moves.turn === "p1") moves.turn = "p2";
        else moves.turn = "p1";
        localStorage.setItem(this.moves, JSON.stringify(moves));
    }
    switchFirstMove() {
        let moves = JSON.parse(localStorage.getItem(this.moves));
        if (moves.first_move === "p1") moves.first_move = "p2";
        else moves.first_move = "p1";
        localStorage.setItem(this.moves, JSON.stringify(moves));
    }
    switchSign() {
        let moves = JSON.parse(localStorage.getItem(this.moves));
        if (moves.sign === "cross") moves.sign = "zero";
        else moves.sign = "cross";
        localStorage.setItem(this.moves, JSON.stringify(moves));
    }
    setCross() {
        let moves = JSON.parse(localStorage.getItem(this.moves));
        moves.sign = "cross";
        localStorage.setItem(this.moves, JSON.stringify(moves));
    }
    clearMoves() {
        const moves = { first_move: "p1", turn: "p1", sign: "cross" };
        localStorage.setItem(this.moves, JSON.stringify(moves));
    }
    getScore() {
        let score = JSON.parse(localStorage.getItem(this.score));
        if (score === null) {
            score = { p1: 0, p2: 0 };
            localStorage.setItem(this.score, JSON.stringify(score));
        }
        return score;
    }
    addUnitToScore(player) {
        let score = this.getScore();
        score.p1 = (player === "p1") ? score.p1 + 1 : score.p1;
        score.p2 = (player === "p2") ? score.p2 + 1 : score.p2;

        localStorage.setItem(this.score, JSON.stringify(score));
    }
    clearScore() {
        const score = { p1: 0, p2: 0 };
        localStorage.setItem(this.score, JSON.stringify(score));
    }
    getGameStatus() {
        let game = JSON.parse(localStorage.getItem(this.game));
        if (game === null) {
            game = { status: "continues" };
            localStorage.setItem(this.game, JSON.stringify(game));
        }
        return game;
    }
    updateGameStatus(newStatus) {
        let game = this.getGameStatus();
        game.status = newStatus;
        localStorage.setItem(this.game, JSON.stringify(game));
    }
}
const localStorageUtil = new LocalStorageUtil();