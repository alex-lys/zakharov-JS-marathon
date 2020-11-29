import Game from './game.js';
import { $getElemById } from './utils.js';

const $control = $getElemById('control');

const $btn = document.createElement('button');
$btn.classList.add('button');
$btn.innerText = 'Start Game';

$btn.addEventListener('click', () => {
  const newGame = new Game();
});

$control.appendChild($btn);
