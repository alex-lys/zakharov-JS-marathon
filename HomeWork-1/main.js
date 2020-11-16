// Задание #1

const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';
const char = prompt('Введите символ');

const charCounter = function (row, char) {
  let result = 0;

  for (let i = 0; i < row.length; i += 1) {
    if (row.charAt(i) === char) {
      result += 1;
    }
  }

  return result;
};

const getRow = function (firstRow, secondRow, char) {
  if (charCounter(firstRow, char) == 0 && charCounter(secondRow, char) == 0) {
    alert('Символ не найден');
  } else if (charCounter(firstRow, char) > charCounter(secondRow, char)) {
    alert(firstRow);
  } else if (charCounter(firstRow, char) < charCounter(secondRow, char)) {
    alert(secondRow);
  } else {
    alert('Кол-во символов равно');
  }
};

getRow(firstRow, secondRow, char);

// Задание #2
const phone = prompt('Введите телефон');

const phoneFormatting = function (phone, index) {
  // Не самая хорошая идея и реализация, не учитывается другой код страны, пытался решить задачу используя только методы и конструкции, указанные в видеоуроках и задаче.
  let result = '+7';

  for (let i = index; i < phone.length; i += 1) {
    if (i === index) {
      result += ' (' + phone.charAt(i);
      continue;
    } else if (i === index + 2) {
      result += phone.charAt(i) + ') ';
      continue;
    } else if (i === index + 5) {
      result += phone.charAt(i) + '-';
      continue;
    } else if (i === index + 7) {
      result += phone.charAt(i) + '-';
      continue;
    }

    result += phone.charAt(i);
  }

  return result;
};

const formattedPhone = function (phone) {
  if (phone.length === 12 && phone.charAt(0) === '+') {
    alert(phoneFormatting(phone, 2));
  } else if (phone.length === 11) {
    alert(phoneFormatting(phone, 1));
  } else if (phone.length === 10) {
    alert(phoneFormatting(phone, 0));
  } else {
    alert('Формат телефона не верный');
  }
};

formattedPhone(phone);
