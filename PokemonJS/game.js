import {
  $getElemById,
  $getElemsBySelector,
  countBtn,
  random,
} from './utils.js';
import { generateLog } from './logs.js';
import { pokemons } from './pokemons.js';
import Pokemon from './pokemon.js';

const $control = $getElemById('control');

class Game {
  constructor() {
    this.startGame();
  }
  startGame = () => {
    const $allButtons = $getElemsBySelector('.control .button');
    $allButtons.forEach(($item) => $item.remove());

    const player1 = new Pokemon({
      ...pokemons[random(pokemons.length - 1)],
      selector: 'player1',
    });

    const player2 = new Pokemon({
      ...pokemons[random(pokemons.length - 1)],
      selector: 'player2',
    });

    player1.attacks.forEach((item) => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = item.name;

      const $btnCount = countBtn(item.maxCount, $btn);

      $btn.addEventListener('click', () => {
        player2.changeHP(
          random(item.maxDamage, item.minDamage),
          function (count) {
            console.log(this);
            generateLog(player2, player1, count);
          }
        );
        if (player2.hp.current === 0) {
          this.endGame();
        }

        $btnCount();
      });

      $control.appendChild($btn);
    });

    player2.attacks.forEach((item) => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = item.name;

      const $btnCount = countBtn(item.maxCount, $btn);

      $btn.addEventListener('click', () => {
        player1.changeHP(
          random(item.maxDamage, item.minDamage),
          function (count) {
            generateLog(player1, player2, count);
          }
        );
        if (player1.hp.current === 0) {
          this.endGame();
        }

        $btnCount();
      });

      $control.appendChild($btn);
    });
  };
  resetGame = () => {
    this.startGame();
  };
  endGame = () => {
    const $allButtons = $getElemsBySelector('.control .button');
    $allButtons.forEach(($item) => $item.remove());

    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = 'Reset Game';
    $btn.addEventListener('click', () => {
      this.resetGame();
    });

    $control.appendChild($btn);
  };
}

export default Game;
