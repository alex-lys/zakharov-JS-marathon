const $getElemById = (id) => document.getElementById(id);
const $getElemBySelector = (selector) => document.querySelector(selector);
const $getElemsBySelector = (selector) => document.querySelectorAll(selector);

const random = (max, min = 0) => {
  const num = max - min;
  return Math.floor(Math.random() * num) + min;
};

const renderButton = (text) => {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = text;

  return $btn;
};

const countBtn = (count = 6, el) => {
  const innerText = el.innerText;
  el.innerText = `${innerText} (${count})`;
  return () => {
    count--;
    console.log(`Ходов осталось: ${count}`);

    if (count === 0) {
      el.disabled = 'true';
      console.log(`Ходы закончились`);
    }

    el.innerText = `${innerText} (${count})`;
  };
};

export {
  $getElemById,
  $getElemBySelector,
  $getElemsBySelector,
  renderButton,
  countBtn,
  random,
};
