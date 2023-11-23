class Menu {
    closeMenu() {
        ROOT_MENU.innerHTML = '';
    }
    render() {
        const html = `
            <div class="menu">
                <p class="menu__item" onclick="header.restartTheGame();">Restart</p>
                <p class="menu__item" style="color:var(--color-dim)">Play vs BOT</p>
                <img class="menu__logo menu__item" src="img/logo.svg"></img>
                <img class="menu__btn menu__item" src="img/cross.svg" onClick="menu.closeMenu();"></img>
            </div>
        `;

        ROOT_MENU.innerHTML = html;
    }
}
const menu = new Menu();