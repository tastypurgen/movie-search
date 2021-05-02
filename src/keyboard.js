/* eslint-disable no-use-before-define */
const body = document.querySelector('.board-container');
const input = document.querySelector('#search');

let lang = 'eng';

let capsLock = false;
let shift = false;
let ctrl = false;
let alt = false;

const keys = {
  eng: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Lang', 'Fn', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  engShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'E', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Lang', 'Fn', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  rus: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Lang', 'Fn', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  rusShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete'],
    ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Lang', 'Fn', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
};

function createKey(key) {
  const keyEl = document.createElement('div');
  keyEl.classList.add('key');
  keyEl.id = key;
  if (key === ' ') keyEl.id = 'space';
  if (key === 'Ctrl') keyEl.id = 'Control';
  keyEl.innerText = key;
  if (key === 'Lang' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'Win' || key === 'Backspace') keyEl.innerHTML = '';
  keyEl.addEventListener('mousedown', (e) => {
    e.key = e.target.id;
    keyPress(e);
  });
  keyEl.addEventListener('mouseup', (e) => {
    e.key = e.target.id;
    keyUp(e);
  });
  return keyEl;
}

function createKeyboard() {
  if (document.querySelector('.board')) document.querySelector('.board').remove();
  const board = document.createElement('div');
  board.classList.add('board');
  body.append(board);
  keys[lang].forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    board.append(rowEl);
    row.forEach((key) => {
      rowEl.append(createKey(key));
    });
  });
  const subtitle = document.createElement('div');
  subtitle.innerHTML = `
    <p class="subtitle">Language change: </p>
  `;
  if (capsLock) document.querySelector('#CapsLock').classList.add('active');
  if (shift) document.querySelector('#Shift').classList.add('active');
  if (ctrl) document.querySelector('#Control').classList.add('active');
  if (alt) document.querySelector('#Alt').classList.add('active');
  board.append(subtitle);
  body.append(board);

  document.querySelector('#Lang').addEventListener('click', () => {
    if (lang === 'eng') {
      lang = 'rus';
    } else {
      lang = 'eng';
    }
    createKeyboard(lang);
  });

  document.querySelector('#CapsLock').disabled = true;
}

function changeLang() {
  if (lang === 'rus') {
    lang = 'eng';
    createKeyboard('eng');
  } else {
    lang = 'rus';
    createKeyboard('rus');
  }
}

function keyPress(e) {
  if (e.key === 'Tab') {
    input.value += '    ';
    e.preventDefault();
    document.querySelector(`[id='${e.key}']`).classList.add('active');
    return;
  }
  if (e.key === 'CapsLock') {
    if (!capsLock) {
      if (lang === 'eng') createKeyboard('engShift');
      else createKeyboard('rusShift');
      document.querySelector('#CapsLock').classList.add('active');
      capsLock = true;
    } else {
      if (lang === 'eng') createKeyboard('eng');
      else createKeyboard('rus');
      document.querySelector('#CapsLock').classList.remove('active');
      capsLock = false;
    }
    return;
  }
  if (e.key === 'Shift') {
    if (lang === 'eng') {
      createKeyboard('engShift');
    } else {
      createKeyboard('rusShift');
    }
    shift = true;
    document.querySelector(`[id='${e.key}']`).classList.add('active');
    return;
  }
  if (e.key === ' ' || e.key === 'space') {
    document.querySelector('#space').classList.add('active');
    input.value += ' ';
    return;
  }
  if (e.key === 'Backspace') {
    document.querySelector('#Backspace').classList.add('active');
    input.value = input.value.slice(0, -1);
    return;
  }
  if (e.key === 'Delete') {
    document.querySelector('#Delete').classList.add('active');
    input.value = input.value.slice(0, -1);
    return;
  }
  if (e.key === 'Enter') {
    document.querySelector('#Enter').classList.add('active');
    document.querySelector('button').click();
    document.querySelector('.board-container').classList.toggle('hidden');
    return;
  }
  if (e.key === 'Meta') {
    return;
  }
  if (e.key === "'") {
    document.querySelector(`[id="${e.key}"]`).classList.add('active');
    input.value += "'";
    return;
  }
  if (e.key === '\\') {
    document.querySelector('#\\\\').classList.add('active');
    input.value += '\\';
    return;
  }
  if (!document.querySelector(`[id='${e.key}']`)) changeLang();

  document.querySelector(`[id='${e.key}']`).classList.add('active');
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Control' || e.key === 'Win' || e.key === 'Alt' || e.key === 'Delete' || e.key === 'Fn' || e.key === 'Lang') {
    e.preventDefault();
    return;
  }
  input.value += e.key;
}

function keyUp({ key, altKey, ctrlKey }) {
  if (key === 'Shift') {
    if (lang === 'eng') createKeyboard('eng');
    else createKeyboard('rus');
  }

  document.querySelectorAll('.key').forEach((keyBtn) => {
    keyBtn.classList.remove('active');
  });

  if (altKey || ctrlKey) {
    ctrl = false;
    alt = false;
    shift = false;
  }
  if (capsLock) document.querySelector('#CapsLock').classList.add('active');
  else document.querySelector('#CapsLock').classList.remove('active');
}

export default createKeyboard;
