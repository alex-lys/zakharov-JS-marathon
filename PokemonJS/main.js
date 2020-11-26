function $getElemById(id) {
  return document.getElementById(id);
}

const $control = $getElemById('control');
const $logs = $getElemById('logs');

const character = {
  name: 'Picachu',
  defaultHP: 100,
  damageHP: 100,
  totalActions: 6,
  elHP: $getElemById('health-character'),
  elProgressbar: $getElemById('progressbar-character'),
  elKick: $getElemById('btn-kick-character'),
  actionsCounter,
  changeHP,
  renderHP,
  renderHPLife,
  renderProgressbar,
};

const enemy = {
  name: 'Charmander',
  defaultHP: 200,
  damageHP: 200,
  totalActions: 8,
  elHP: $getElemById('health-enemy'),
  elProgressbar: $getElemById('progressbar-enemy'),
  elKick: $getElemById('btn-kick-enemy'),
  actionsCounter,
  changeHP,
  renderHP,
  renderHPLife,
  renderProgressbar,
};

function renderHPLife() {
  this.elHP.innerText = `${this.damageHP}/${this.defaultHP}`;
}

function renderProgressbar() {
  this.elProgressbar.style.width = `${this.damageHP / (this.defaultHP / 100)}%`;
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressbar();
}

function changeHP(count) {
  this.damageHP -= count;

  const log =
    this === enemy
      ? generateLog(this, character, count)
      : generateLog(this, enemy, count);

  $logs.insertBefore(log, $logs.children[0]);

  if (this.damageHP <= 0) {
    this.damageHP = 0;
    console.log(`Покемон '${this.name}' проиграл`);
    this.elKick.disabled = 'true';
  }

  this.renderHP();
}

// Функция подсчета ходов через замыкание
function actionsCounter() {
  let currentActions = 0;
  return () => {
    currentActions += 1;
    console.log(
      `Ходов осталось: ${
        this.totalActions - currentActions
      }, ${currentActions}/${this.totalActions} ходов.`
    );

    if (currentActions === this.totalActions) {
      this.elKick.disabled = 'true';
      console.log(`Ходы закончились`);
      return;
    }
  };
}

const random = (num) => {
  return Math.ceil(Math.random() * num);
};

const generateLog = (firstPerson, secondPerson, damage) => {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage} [${firstPerson.damageHP}/100]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage} [${firstPerson.damageHP}/100]`,
  ];

  const $p = document.createElement('p');
  $p.innerText = logs[random(logs.length - 1)];

  return $p;
};

const init = () => {
  console.log('Start Game!');

  character.renderHP();
  enemy.renderHP();
};

// Для подсчета ходов через замыкание, их 2 потому что у каждого персонажа свое кол-во ходов. Возможно это можно куда-то перенести, пока не догодался.
const characterActionsCounter = character.actionsCounter();
const enemyActionsCounter = enemy.actionsCounter();

init();

$control.addEventListener('click', (event) => {
  if (event.target.id === 'btn-kick-character') {
    enemy.changeHP(random(20));
    characterActionsCounter();
  } else if (event.target.id === 'btn-kick-enemy') {
    character.changeHP(random(20));
    enemyActionsCounter();
  }
});
