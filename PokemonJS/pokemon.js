import { $getElemById, $getElemBySelector } from './utils.js';

class Player {
  constructor(name) {
    this.elImg = $getElemBySelector(`.${name} .sprite`);
    this.elName = $getElemById(`name-${name}`);
    this.elHP = $getElemById(`health-${name}`);
    this.elProgressbar = $getElemById(`progressbar-${name}`);
  }
}

class Pokemon extends Player {
  constructor({ name, hp, img, attacks, selector }) {
    super(selector);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.img = img;
    this.attacks = attacks;
    this.renderAvatar();
    this.renderHP();
  }
  renderAvatar = () => {
    this.elImg.src = this.img;
    this.elName.innerText = this.name;
  };

  renderHPLife = () => {
    this.elHP.innerText = `${this.hp.current}/${this.hp.total}`;
  };

  renderProgressbar = () => {
    let ProgressbarPercent = this.hp.current / (this.hp.total / 100);
    this.elProgressbar.style.width = `${ProgressbarPercent}%`;

    if (ProgressbarPercent > 20 && ProgressbarPercent < 50) {
      this.elProgressbar.classList.add('low');
    } else if (ProgressbarPercent < 20) {
      this.elProgressbar.classList.add('critical');
    } else {
      this.elProgressbar.classList.remove('critical');
      this.elProgressbar.classList.remove('low');
    }
  };

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbar();
  };

  changeHP = (count, callback) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
    }

    this.renderHP();
    callback(count);
  };
}

export default Pokemon;
