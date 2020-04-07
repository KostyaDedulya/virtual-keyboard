class Keyboard {
  constructor(isEnglish, isCapsLock = false) {
    this.isEnglish = isEnglish;
    this.language = this.isEnglish ? 'en' : 'ru';
    this.isCapsLock = isCapsLock;
    this.lastEventWhich = null;
    this.notPrintButtons = [20, 16, 17, 91, 18, 8];
    this.pressedButtons = new Set();
    this.rowsHasButtonsCount = [14, 14, 13, 13, 9];
    this.rowDivs = [];
    this.clickTarget = null;
  }

  init() {
    const root = document.body;
    this.addStyles('styles.css');
    this.createTextarea(root);
    this.createKeyboard(root);
    this.addEventListeners();
    this.createDescription(root);
  }

  addStyles(link) {
    const { head } = document;
    this.style = document.createElement('link');
    this.style.setAttribute('rel', 'stylesheet');
    this.style.setAttribute('href', link);
    head.append(this.style);
  }

  createTextarea(root) {
    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('keyboard_textarea');
    this.textarea.setAttribute('rows', '10');
    this.textarea.setAttribute('name', 'keyboardText');
    this.textarea.setAttribute('readonly', '');
    root.append(this.textarea);
  }

  createKeyboard(root) {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.createRows(this.keyboard);
    this.createKeys();
    root.append(this.keyboard);
    this.setKeyValue();
  }

  createDescription(root) {
    this.description = document.createElement('p');
    this.description.innerText = 'Язык переключается ctrl + shift. Создано в Windows';
    root.append(this.description);
  }

  createRows(root) {
    this.rowsHasButtonsCount.forEach((row) => {
      const div = document.createElement('div');
      div.classList.add('keys__row');
      div.dataset.count = row;
      root.append(div);
      this.rowDivs.push(div);
    });
  }

  createKeys() {
    this.keys = [{
      eng: {
        caseDown: '`',
        caseUp: '~',
      },
      ru: {
        caseDown: 'ё',
        caseUp: 'Ё',
      },
      which: '192',
    }, {
      eng: {
        caseDown: '1',
        caseUp: '!',
      },
      ru: {
        caseDown: '1',
        caseUp: '!',
      },
      which: '49',
    }, {
      eng: {
        caseDown: '2',
        caseUp: '@',
      },
      ru: {
        caseDown: '2',
        caseUp: '&quot;',
      },
      which: '50',
    }, {
      eng: {
        caseDown: '3',
        caseUp: '#',
      },
      ru: {
        caseDown: '3',
        caseUp: '№',
      },
      which: '51',
    }, {
      eng: {
        caseDown: '4',
        caseUp: '$',
      },
      ru: {
        caseDown: '4',
        caseUp: ';',
      },
      which: '52',
    }, {
      eng: {
        caseDown: '5',
        caseUp: '%',
      },
      ru: {
        caseDown: '5',
        caseUp: '%',
      },
      which: '53',
    }, {
      eng: {
        caseDown: '6',
        caseUp: '^',
      },
      ru: {
        caseDown: '6',
        caseUp: ':',
      },
      which: '54',
    }, {
      eng: {
        caseDown: '7',
        caseUp: '&',
      },
      ru: {
        caseDown: '7',
        caseUp: '?',
      },
      which: '55',
    }, {
      eng: {
        caseDown: '8',
        caseUp: '*',
      },
      ru: {
        caseDown: '8',
        caseUp: '*',
      },
      which: '56',
    }, {
      eng: {
        caseDown: '9',
        caseUp: '(',
      },
      ru: {
        caseDown: '9',
        caseUp: '(',
      },
      which: '57',
    }, {
      eng: {
        caseDown: '0',
        caseUp: ')',
      },
      ru: {
        caseDown: '0',
        caseUp: ')',
      },
      which: '48',
    }, {
      eng: {
        caseDown: '-',
        caseUp: '_',
      },
      ru: {
        caseDown: '-',
        caseUp: '_',
      },
      which: '189',
    }, {
      eng: {
        caseDown: '=',
        caseUp: '+',
      },
      ru: {
        caseDown: '=',
        caseUp: '+',
      },
      which: '187',
    }, {
      eng: {
        caseDown: 'backspace',
        caseUp: 'backspace',
      },
      ru: {
        caseDown: 'backspace',
        caseUp: 'backspace',
      },
      which: '8',
      size: 'key-backspace',
      icon: 'backspace',
    }, {
      eng: {
        caseDown: 'tab',
        caseUp: 'tab',
      },
      ru: {
        caseDown: 'tab',
        caseUp: 'tab',
      },
      which: '9',
      size: 'key-tab',
      value: '&nbsp;&nbsp;&nbsp;&nbsp;',
    }, {
      eng: {
        caseDown: 'q',
        caseUp: 'Q',
      },
      ru: {
        caseDown: 'й',
        caseUp: 'Й',
      },
      which: '81',
    }, {
      eng: {
        caseDown: 'w',
        caseUp: 'W',
      },
      ru: {
        caseDown: 'ц',
        caseUp: 'Ц',
      },
      which: '87',
    }, {
      eng: {
        caseDown: 'e',
        caseUp: 'E',
      },
      ru: {
        caseDown: 'у',
        caseUp: 'У',
      },
      which: '69',
    }, {
      eng: {
        caseDown: 'r',
        caseUp: 'R',
      },
      ru: {
        caseDown: 'к',
        caseUp: 'К',
      },
      which: '82',
    }, {
      eng: {
        caseDown: 't',
        caseUp: 'T',
      },
      ru: {
        caseDown: 'е',
        caseUp: 'Е',
      },
      which: '84',
    }, {
      eng: {
        caseDown: 'y',
        caseUp: 'Y',
      },
      ru: {
        caseDown: 'н',
        caseUp: 'Н',
      },
      which: '89',
    }, {
      eng: {
        caseDown: 'u',
        caseUp: 'U',
      },
      ru: {
        caseDown: 'г',
        caseUp: 'Г',
      },
      which: '85',
    }, {
      eng: {
        caseDown: 'i',
        caseUp: 'I',
      },
      ru: {
        caseDown: 'ш',
        caseUp: 'Ш',
      },
      which: '73',
    }, {
      eng: {
        caseDown: 'o',
        caseUp: 'O',
      },
      ru: {
        caseDown: 'щ',
        caseUp: 'Щ',
      },
      which: '79',
    }, {
      eng: {
        caseDown: 'p',
        caseUp: 'P',
      },
      ru: {
        caseDown: 'з',
        caseUp: 'З',
      },
      which: '80',
    }, {
      eng: {
        caseDown: '[',
        caseUp: '{',
      },
      ru: {
        caseDown: 'х',
        caseUp: 'Х',
      },
      which: '219',
    }, {
      eng: {
        caseDown: ']',
        caseUp: '}',
      },
      ru: {
        caseDown: 'ъ',
        caseUp: 'Ъ',
      },
      which: '221',
    }, {
      eng: {
        caseDown: '\\',
        caseUp: '|',
      },
      ru: {
        caseDown: '\\',
        caseUp: '/',
      },
      which: '220',
      size: 'key-backslash',
    }, {
      eng: {
        caseDown: 'caps',
        caseUp: 'caps',
      },
      ru: {
        caseDown: 'caps',
        caseUp: 'caps',
      },
      which: '20',
      size: 'key-caps',
    }, {
      eng: {
        caseDown: 'a',
        caseUp: 'A',
      },
      ru: {
        caseDown: 'ф',
        caseUp: 'Ф',
      },
      which: '65',
    }, {
      eng: {
        caseDown: 's',
        caseUp: 'S',
      },
      ru: {
        caseDown: 'ы',
        caseUp: 'Ы',
      },
      which: '83',
    }, {
      eng: {
        caseDown: 'd',
        caseUp: 'D',
      },
      ru: {
        caseDown: 'в',
        caseUp: 'В',
      },
      which: '68',
    }, {
      eng: {
        caseDown: 'f',
        caseUp: 'F',
      },
      ru: {
        caseDown: 'а',
        caseUp: 'А',
      },
      which: '70',
    }, {
      eng: {
        caseDown: 'g',
        caseUp: 'G',
      },
      ru: {
        caseDown: 'п',
        caseUp: 'П',
      },
      which: '71',
    }, {
      eng: {
        caseDown: 'h',
        caseUp: 'H',
      },
      ru: {
        caseDown: 'р',
        caseUp: 'Р',
      },
      which: '72',
    }, {
      eng: {
        caseDown: 'j',
        caseUp: 'J',
      },
      ru: {
        caseDown: 'о',
        caseUp: 'О',
      },
      which: '74',
    }, {
      eng: {
        caseDown: 'k',
        caseUp: 'K',
      },
      ru: {
        caseDown: 'л',
        caseUp: 'Л',
      },
      which: '75',
    }, {
      eng: {
        caseDown: 'l',
        caseUp: 'L',
      },
      ru: {
        caseDown: 'д',
        caseUp: 'Д',
      },
      which: '76',
    }, {
      eng: {
        caseDown: ';',
        caseUp: ':',
      },
      ru: {
        caseDown: 'ж',
        caseUp: 'Ж',
      },
      which: '186',
    }, {
      eng: {
        caseDown: '\'',
        caseUp: '&quot;',
      },
      ru: {
        caseDown: 'э',
        caseUp: 'Э',
      },
      which: '222',
    }, {
      eng: {
        caseDown: 'enter',
        caseUp: 'enter',
      },
      ru: {
        caseDown: 'enter',
        caseUp: 'enter',
      },
      which: '13',
      size: 'key-enter',
    }, {
      eng: {
        caseDown: 'shift',
        caseUp: 'shift',
      },
      ru: {
        caseDown: 'shift',
        caseUp: 'shift',
      },
      which: '16',
      size: 'key-shift-left',
    }, {
      eng: {
        caseDown: 'z',
        caseUp: 'Z',
      },
      ru: {
        caseDown: 'я',
        caseUp: 'Я',
      },
      which: '90',
    }, {
      eng: {
        caseDown: 'x',
        caseUp: 'X',
      },
      ru: {
        caseDown: 'ч',
        caseUp: 'Ч',
      },
      which: '88',
    }, {
      eng: {
        caseDown: 'c',
        caseUp: 'C',
      },
      ru: {
        caseDown: 'с',
        caseUp: 'С',
      },
      which: '67',
    }, {
      eng: {
        caseDown: 'v',
        caseUp: 'V',
      },
      ru: {
        caseDown: 'м',
        caseUp: 'М',
      },
      which: '86',
    }, {
      eng: {
        caseDown: 'b',
        caseUp: 'B',
      },
      ru: {
        caseDown: 'и',
        caseUp: 'И',
      },
      which: '66',
    }, {
      eng: {
        caseDown: 'n',
        caseUp: 'N',
      },
      ru: {
        caseDown: 'т',
        caseUp: 'Т',
      },
      which: '78',
    }, {
      eng: {
        caseDown: 'm',
        caseUp: 'M',
      },
      ru: {
        caseDown: 'ь',
        caseUp: 'Ь',
      },
      which: '77',
    }, {
      eng: {
        caseDown: ',',
        caseUp: '<',
      },
      ru: {
        caseDown: 'б',
        caseUp: 'Б',
      },
      which: '188',
    }, {
      eng: {
        caseDown: '.',
        caseUp: '>',
      },
      ru: {
        caseDown: 'ю',
        caseUp: 'Ю',
      },
      which: '190',
    }, {
      eng: {
        caseDown: '/',
        caseUp: '?',
      },
      ru: {
        caseDown: '.',
        caseUp: ',',
      },
      which: '191',
    }, {
      eng: {
        caseDown: 'keyboard_arrow_up',
        caseUp: 'keyboard_arrow_up',
      },
      ru: {
        caseDown: 'keyboard_arrow_up',
        caseUp: 'keyboard_arrow_up',
      },
      which: '38',
      icon: 'keyboard_arrow_up',
    }, {
      eng: {
        caseDown: 'shift',
        caseUp: 'shift',
      },
      ru: {
        caseDown: 'shift',
        caseUp: 'shift',
      },
      size: 'key-shift-right',
      which: '16',
    }, {
      eng: {
        caseDown: 'ctrl',
        caseUp: 'ctrl',
      },
      ru: {
        caseDown: 'ctrl',
        caseUp: 'ctrl',
      },
      which: '17',
    }, {
      eng: {
        caseDown: 'win',
        caseUp: 'win',
      },
      ru: {
        caseDown: 'win',
        caseUp: 'win',
      },
      which: '91',
    }, {
      eng: {
        caseDown: 'alt',
        caseUp: 'alt',
      },
      ru: {
        caseDown: 'alt',
        caseUp: 'alt',
      },
      which: '',
      size: 'key-alt-left',
    }, {
      eng: {
        caseDown: '&nbsp;',
        caseUp: '&nbsp;',
      },
      ru: {
        caseDown: '&nbsp;',
        caseUp: '&nbsp;',
      },
      which: '32',
      size: 'key-space',
    }, {
      eng: {
        caseDown: 'alt',
        caseUp: 'alt',
      },
      ru: {
        caseDown: 'alt',
        caseUp: 'alt',
      },
      which: '18',
    }, {
      eng: {
        caseDown: 'keyboard_arrow_left',
        caseUp: 'keyboard_arrow_left',
      },
      ru: {
        caseDown: 'keyboard_arrow_left',
        caseUp: 'keyboard_arrow_left',
      },
      which: '37',
      icon: 'keyboard_arrow_left',
    }, {
      eng: {
        caseDown: 'keyboard_arrow_down',
        caseUp: 'keyboard_arrow_down',
      },
      ru: {
        caseDown: 'keyboard_arrow_down',
        caseUp: 'keyboard_arrow_down',
      },
      which: '40',
      icon: 'keyboard_arrow_down',
    }, {
      eng: {
        caseDown: 'keyboard_arrow_right',
        caseUp: 'keyboard_arrow_right',
      },
      ru: {
        caseDown: 'keyboard_arrow_right',
        caseUp: 'keyboard_arrow_right',
      },
      which: '39',
      icon: 'keyboard_arrow_right',
    }, {
      eng: {
        caseDown: 'ctrl',
        caseUp: 'ctrl',
      },
      ru: {
        caseDown: 'ctrl',
        caseUp: 'ctrl',
      },
      which: '17',
      size: 'key-ctrl-right',
    }];
    let i = 0;
    this.keys.forEach((key) => {
      if (this.rowDivs[i].dataset.count <= this.rowDivs[i].children.length) i += 1;
      const keyDiv = document.createElement('div');
      keyDiv.classList.add('key');
      if (key.value) keyDiv.dataset.constValue = key.value;
      if (key.size) keyDiv.classList.add(key.size);
      keyDiv.dataset.which = key.which;

      const langTemplate = `
      <span class="key_language en ${this.isEnglish ? '' : 'hidden'}">
        <span class="caseUp ${this.isCapsLock ? '' : 'hidden'}">${key.icon ? `<span class="material-icons">
        ${key.icon}</span>` : key.eng.caseUp}</span>
        <span class="caseDown ${this.isCapsLock ? 'hidden' : ''}">${key.icon ? `<span class="material-icons">
        ${key.icon}</span>` : key.eng.caseDown}</span>
      </span>
      <span class="key_language ru ${this.isEnglish ? 'hidden' : ''}">
        <span class="caseUp ${this.isCapsLock ? '' : 'hidden'}">${key.icon ? `<span class="material-icons">
        ${key.icon}</span>` : key.ru.caseUp}</span>
        <span class="caseDown ${this.isCapsLock ? 'hidden' : ''}">${key.icon ? `<span class="material-icons">
        ${key.icon}</span>` : key.ru.caseDown}</span>
      </span>`;

      keyDiv.innerHTML = langTemplate;
      this.rowDivs[i].append(keyDiv);
    });
  }

  languageHandler() {
    const languageSpans = [...document.querySelectorAll('.key_language')];
    languageSpans.forEach((span) => {
      span.classList.toggle('hidden');
    });
    this.setKeyValue();
    this.isEnglish = !this.isEnglish;
    localStorage.setItem('language', this.isEnglish);
  }

  capsLockHandler() {
    const caseUpCaseDownKeys = [...document.querySelectorAll('.caseUp'), ...document.querySelectorAll('.caseDown')];
    caseUpCaseDownKeys.forEach((key) => {
      key.classList.toggle('hidden');
    });
    this.setKeyValue();
  }

  setKeyValue() {
    this.keysElements = document.querySelectorAll('.key');
    this.keysElements.forEach((key) => {
      const children = [...key.children];
      children.forEach((child) => {
        if (!child.classList.contains('hidden')) {
          const childChildren = [...child.children];
          childChildren.forEach((element) => {
            if (!element.classList.contains('hidden') || element.dataset.value) {
              key.setAttribute('data-value', element.innerText);
            }
          });
        }
      });
    });
  }

  addEventListeners() {
    this.keyboard.addEventListener('mousedown', (event) => this.mouseDownHandler(event));
    document.addEventListener('mouseup', (event) => this.mouseUpHandler(event));
    document.addEventListener('keydown', (event) => this.keyDownHandler(event));
    document.addEventListener('keyup', (event) => this.keyUpHandler(event));
  }

  mouseDownHandler(event) {
    if (event.target.classList.contains('key') || event.target.closest('.key')) {
      this.clickTarget = event.target.closest('.key');
      switch (+this.clickTarget.dataset.which) {
        case 16:
          this.capsLockHandler();
          break;
        case 20:
          if (!this.isCapsLock) {
            this.isCapsLock = true;
            this.capsLockHandler();
          } else {
            this.isCapsLock = false;
            this.capsLockHandler();
          }
          break;
        default:
          break;
      }
      this.clickTarget.classList.toggle('key-active');
      this.keyDownHandler(this.clickTarget);
      if (+this.clickTarget.dataset.which === 16 || +this.clickTarget.dataset.which === 17) {
        this.pressedButtons.add(+this.clickTarget.dataset.which);
      }
    }
  }

  mouseUpHandler() {
    if (this.pressedButtons.has(16) && this.pressedButtons.has(17)) this.languageHandler();

    if (this.clickTarget) {
      switch (+this.clickTarget.dataset.which) {
        case 8:
          this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1);
          break;
        case 9:
          this.clickTarget.dataset.value = '\t';
          break;
        case 13:
          this.clickTarget.dataset.value = '\n';
          break;
        case 16:
          this.capsLockHandler();
          break;
        case 20:
          this.clickTarget = null;
          return null;
        case 37:
          this.clickTarget.dataset.value = '←';
          break;
        case 38:
          this.clickTarget.dataset.value = '↑';
          break;
        case 39:
          this.clickTarget.dataset.value = '→';
          break;
        case 40:
          this.clickTarget.dataset.value = '↓';
          break;
        default:
          break;
      }
      if (!this.notPrintButtons.includes(+this.clickTarget.dataset.which) && !this.clickTarget.classList.contains('key-alt-left')) {
        this.textarea.value += this.clickTarget.dataset.value;
      }

      this.clickTarget.classList.remove('key-active');

      if (+this.clickTarget.dataset.which === 16 || +this.clickTarget.dataset.which === 17) {
        this.pressedButtons.delete(+this.clickTarget.dataset.which);
      }
    }

    this.clickTarget = null;
    return true;
  }

  keyDownHandler(event) {
    let key = document.querySelector(`[data-which='${event.which}']`);
    switch (event.which) {
      case 8:
        this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1);
        break;
      case 9:
        event.preventDefault();
        key.dataset.value = '\t';
        break;
      case 13:
        key.dataset.value = '\n';
        break;
      case 16:
        if (this.lastEventWhich !== event.which) {
          this.pressedButtons.add(event.which);
          this.lastEventWhich = event.which;
          this.isCapsLock = true;
          this.capsLockHandler();
        }
        if (event.location === 2) {
          key = document.querySelector('.key-shift-right');
        }
        break;
      case 18:
        if (event.location === 1) {
          key = document.querySelector('.key-alt-left');
        }
        break;
      case 17:
        if (this.lastEventWhich !== event.which) {
          this.pressedButtons.add(event.which);
          if (event.location === 2) {
            key = document.querySelector('.key-ctrl-right');
          }
        }
        break;
      case 20:
        if (this.lastEventWhich !== event.which) {
          if (!this.isCapsLock) {
            this.lastEventWhich = event.which;
            this.isCapsLock = true;
            this.capsLockHandler();
          } else {
            this.lastEventWhich = null;
            this.isCapsLock = false;
            this.capsLockHandler();
          }
          key.classList.toggle('key-active');
        }
        break;
      case 37:
        key.dataset.value = '←';
        break;
      case 38:
        key.dataset.value = '↑';
        break;
      case 39:
        key.dataset.value = '→';
        break;
      case 40:
        key.dataset.value = '↓';
        break;
      default:
        break;
    }

    if (key && event.which !== 20) {
      if (!this.notPrintButtons.includes(event.which)) {
        this.textarea.value += key.dataset.value;
      }
      key.classList.add('key-active');
    }
  }

  keyUpHandler(event) {
    let key = document.querySelector(`[data-which='${event.which}']`);
    if (this.pressedButtons.has(16) && this.pressedButtons.has(17)) this.languageHandler();

    switch (event.which) {
      case 16:
        if (this.isCapsLock) {
          this.pressedButtons.delete(event.which);
          this.lastEventWhich = null;
          this.isCapsLock = false;
          this.capsLockHandler();
        }
        if (event.code === 'ShiftRight') {
          key = document.querySelector('.key-shift-right');
        }
        break;
      case 17:
        this.pressedButtons.delete(event.which);
        this.lastEventWhich = null;
        if (event.code === 'ControlRight') {
          key = document.querySelector('.key-ctrl-right');
        }
        break;
      case 18:
        if (event.code === 'AltLeft') {
          key = document.querySelector('.key-alt-left');
        }
        break;
      case 20:
        this.lastEventWhich = null;
        break;
      default:
        break;
    }

    if (key && event.which !== 20) {
      key.classList.remove('key-active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard(JSON.parse(localStorage.getItem('language')) || false);
  keyboard.init();
});
