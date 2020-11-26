import { $getElemById, random } from './utils.js';
import { generateLog } from './logs.js';
import Pokemon from './pokemon.js';

const $control = $getElemById('control');

const player1 = new Pokemon({
  name: 'Picachu',
  hp: 100,
  actions: 6,
  selector: 'character',
});

const player2 = new Pokemon({
  name: 'Charmander',
  hp: 200,
  actions: 8,
  selector: 'enemy',
});

const player1ActionsCounter = player1.actionsCounter();
const player2ActionsCounter = player2.actionsCounter();

$control.addEventListener('click', (event) => {
  if (event.target.id === 'btn-kick-character') {
    player2.changeHP(random(20), function (count) {
      generateLog(player2, player1, count);
    });
    player1ActionsCounter();
  } else if (event.target.id === 'btn-kick-enemy') {
    player1.changeHP(random(20), function (count) {
      generateLog(player1, player2, count);
    });
    player2ActionsCounter();
  }
});
