import {
  $getElemById,
  $getElemsBySelector,
  renderButton,
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

  deleteButtons = () => {
    const $allButtons = $getElemsBySelector('.control .button');
    $allButtons.forEach(($item) => $item.remove());
  };

  renderAttack = (attacker, target) => {
    attacker.attacks.forEach((item) => {
      const $btn = renderButton(item.name);
      const $btnCount = countBtn(item.maxCount, $btn);

      $btn.addEventListener('click', () => {
        target.changeHP(random(item.maxDamage, item.minDamage), (count) => {
          generateLog(target, attacker, count);
        });
        if (target.hp.current === 0) {
          this.endGame();
        }

        $btnCount();
      });

      $control.appendChild($btn);
    });
  };

  getPokemon = async () => {
    const response = await fetch(
      'https://reactmarathon-api.netlify.app/api/pokemons?random=true'
    );
    const data = await response.json();
    return data;
  };

  startGame = async () => {
    this.deleteButtons();

    const player1 = new Pokemon({
      ...(await this.getPokemon()),
      selector: 'player1',
    });

    const player2 = new Pokemon({
      ...(await this.getPokemon()),
      selector: 'player2',
    });

    console.log(player1, player2);

    this.renderAttack(player1, player2);
    this.renderAttack(player2, player1);
  };

  resetGame = () => {
    this.startGame();
  };

  endGame = () => {
    this.deleteButtons();

    const $btn = renderButton('Reset Game');

    $btn.addEventListener('click', () => {
      this.resetGame();
    });

    $control.appendChild($btn);
  };
}

export default Game;
