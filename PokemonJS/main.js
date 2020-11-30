import Game from './game.js';
import { $getElemById, renderButton } from './utils.js';

const $control = $getElemById('control');
const $btn = renderButton('Start Game');

$btn.addEventListener('click', () => {
  const newGame = new Game();
});

$control.appendChild($btn);
