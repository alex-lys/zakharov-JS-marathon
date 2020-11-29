import { $getElemById } from './utils.js';

class Player {
  constructor(name) {
    this.elHP = $getElemById(`health-${name}`);
    this.elProgressbar = $getElemById(`progressbar-${name}`);
    this.elKick = $getElemById(`btn-kick-${name}`);
  }
}

class Pokemon extends Player {
  constructor({ name, hp, actions, selector }) {
    super(selector);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.actions = actions;
    this.renderHP();
  }
  renderHPLife = () => {
    this.elHP.innerText = `${this.hp.current}/${this.hp.total}`;
  };

  renderProgressbar = () => {
    this.elProgressbar.style.width = `${
      this.hp.current / (this.hp.total / 100)
    }%`;
  };

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbar();
  };
  changeHP = (count, callback) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      console.log(`Покемон '${this.name}' проиграл`);
      this.elKick.disabled = 'true';
    }

    this.renderHP();
    callback(count);
  };

  actionsCounter = () => {
    let currentActions = 0;
    return () => {
      currentActions += 1;
      console.log(
        `Ходов осталось: ${this.actions - currentActions}, ${currentActions}/${
          this.actions
        } ходов.`
      );

      if (currentActions === this.actions) {
        this.elKick.disabled = 'true';
        console.log(`Ходы закончились`);
        return;
      }
    };
  };
}

export default Pokemon;
