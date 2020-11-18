// const $bntKick = document.getElementById('btn-kick');
const $control = document.querySelector('.control');

const character = {
  name: 'Picachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
};

function renderHPLife(person) {
  console.log(person.elHP.innerText);

  person.elHP.innerText = person.damageHP + '/' + person.defaultHP;
}

function renderProgressbar(person) {
  person.elProgressbar.style.width = person.damageHP + '%';
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressbar(person);
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;
    console.log('Покемон ' + person.name + ' проиграл');
    $bntKick.disabled = 'true';
  } else {
    person.damageHP -= count;
  }

  renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function init() {
  console.log('Start Game!');

  renderHP(character);
  renderHP(enemy);
}

init();

// $bntKick.addEventListener('click', function () {
//   console.log('kick');

//   changeHP(random(20), character);
//   changeHP(random(20), enemy);
// });

$control.addEventListener('click', function (event) {
  console.log('kick');

  if (event.target.id === 'btn-kick-character') {
    changeHP(random(20), character);
  } else if (event.target.id === 'btn-kick-enemy') {
    changeHP(random(20), enemy);
  }
});
