import {
  $getElemById,
  $getElemsBySelector,
  renderButton,
  countBtn,
  random,
} from './utils.js';
import { generateLog } from './logs.js';
import Pokemon from './pokemon.js';

const $control = $getElemById('control');

class Game {
  constructor() {
    this.startGame();
  }

  getPokemon = async () => {
    const response = await fetch(
      'https://reactmarathon-api.netlify.app/api/pokemons?random=true'
    );
    const data = await response.json();
    return data;
  };

  getFight = async (attacker, attack, target) => {
    const response = await fetch(
      `https://reactmarathon-api.netlify.app/api/fight?player1id=${attacker.id}&attackId=${attack.id}&player2id=${target.id}`
    );
    const data = await response.json();
    return data;
  };

  deleteButtons = () => {
    const $allButtons = $getElemsBySelector('.control .button');
    $allButtons.forEach(($item) => $item.remove());
  };

  renderAttacks = (attacker, target) => {
    attacker.attacks.forEach((item) => {
      const $btn = renderButton(item.name);
      const $btnCount = countBtn(item.maxCount, $btn);

      $btn.addEventListener('click', async () => {
        const fight = await this.getFight(attacker, item, target);
        target.changeHP(fight.kick.player2, (count) => {
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

    this.renderAttacks(player1, player2);
    this.renderAttacks(player2, player1);
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
