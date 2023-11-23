class Header {
    restartTheGame() {
        localStorageUtil.updateGameStatus("continues");
        localStorageUtil.clearCells();
        localStorageUtil.clearScore();
        localStorageUtil.clearMoves();
        menu.closeMenu();
        game.render();
    }
    render() {
        const html = `
            <div class="header">
                <p class="header__item" style="color:var(--color-dim)">Play vs BOT</p>
                <img class="header__logo header__item" src="img/logo.svg"></img>
                <p class="header__item" onclick="header.restartTheGame();">Restart</p>
                <img class="header__btn header__item" src="img/burger.svg" onClick="menu.render();"></img>
            </div>
        `;
        ROOT_HEADER.innerHTML = html;
    }
}
const header = new Header();

header.render();