import { MahjonggGame } from "./MahjonggGame.js";

declare global {
    interface Window {
        game: MahjonggGame
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new MahjonggGame();
});