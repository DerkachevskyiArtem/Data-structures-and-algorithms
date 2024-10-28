'use strict';

class LinkedListNode {
  #next;
  #prev;
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  get next() {
    return this.#next;
  }

  get prev() {
    return this.#prev;
  }

  set next(node) {
    if (node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#next = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  set prev(node) {
    if (node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#prev = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  static isLinkedListNode(value) {
    return value instanceof LinkedListNode;
  }
}

class DoubleLinkedList {
  #head;
  #tail;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  set head(node) {
    if (node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#head = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  set tail(node) {
    if (node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#tail = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  push(data) {
    /*
      1. створити новий вузол списку
      2. вставити вузол у список
        2.1 якщо список пустий то зробити вузол 
            і головою і хвостом списку
        2.2 якщо список не пустий то 
            2.2.1 новий вузол має вказувати на попередній хвіст
            2.2.2 попередній хвіст має вказувати на новий вузол як на насутпний вузол
            2.2.3 маємо зміними хвіст на новий елемент
      3. збільшити довжину списку
      4. повернути довжину списка
    */

    const newNode = new LinkedListNode(data);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this.length;
  }

  pop() {
    /*
      1. якщо список пустий то нічого не робимо взагалі
      2. якщо він не пустий то:
        2.1 зберігаємо останній вузол в окрему змінну
        2.2 змінюємо хвіст на передостанній елемент
        2.3 перевіряємо чи існує передостанній елемент (чи довжина дорівнює 1)
          2.3.1 якщо не існує то head встановлюємо в null
          2.3.2 якщо існує то передостанньому елементу змінюемо next на null
              (опціонально витираємо останнюому елементу prev)
      3. зміеншиємо довжину
      4. повертаємо вузол який видалили зі списку
    */

    if (this.length === 0) {
      return undefined;
    }

    const deletedNode = this.tail;
    const prevNode = deletedNode.prev;
    this.tail = prevNode;
    if (this.length === 1) {
      this.head = null;
    } else {
      prevNode.next = null;
      deletedNode.prev = null;
    }

    this.length--;
    return deletedNode;
  }

  unshift(data) {
    /*
      1. Створюємо новий вузол з переданими даними.
      2. Якщо список порожній:
         - Встановлюємо новий вузол як голову і хвіст списку.
      3. Інакше:
         - Встановлюємо поточну голову як наступний вузол нового вузла.
         - Встановлюємо новий вузол як попередній вузол для поточної голови.
         - Оновлюємо голову списку.
      4. Збільшуємо довжину списку на 1.
      5. Повертаємо нову довжину списку.
    */
    const newNode = new LinkedListNode(data);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;

    return this.length;
  }

  shift() {
    /*
      1. Якщо список порожній, повертаємо undefined.
      2. Зберігаємо перший вузол у змінну.
      3. Оновлюємо голову, встановлюючи наступний вузол як нову голову.
      4. Якщо довжина списку дорівнює 1:
         - Встановлюємо хвіст на null.
      5. Інакше:
         - Встановлюємо prev нового вузла-глави на null.
         - Очищаємо next видаленого вузла.
      6. Зменшуємо довжину списку на 1.
      7. Повертаємо видалений вузол.
    */
    if (this.length === 0) {
      return undefined;
    }

    const deletedNode = this.head;
    this.head = this.head.next;

    if (this.length === 1) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }

    deletedNode.next = null;
    this.length--;

    return deletedNode;
  }

  find(data) {
    /*
      1. Починаємо з поточного вузла, що є головою списку.
      2. Перебираємо кожен вузол списку:
         - Якщо дані вузла дорівнюють шуканим даним, повертаємо вузол.
         - Інакше переходимо до наступного вузла.
      3. Якщо вузол не знайдено, повертаємо null.
    */
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.data === data) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }
}


class MyArray {
  constructor(...args) {
    this.length = 0;
    this.data = {};

    for (let i = 0; i < args.length; i++) {
      this.push(args[i]);
    }
  }

  static isArray(value) {
    return value instanceof MyArray;
  }

  push(...items) {
    /*
      1. Проходимо по кожному елементу вхідних аргументів.
      2. Додаємо елемент у масив за поточним індексом (this.length).
      3. Збільшуємо довжину масиву на 1 для кожного доданого елемента.
      4. Повертаємо нову довжину масиву.
    */
    for (let i = 0; i < items.length; i++) {
      this[this.length] = items[i];
      this.length++;
    }
    return this.length;
  }

  pop() {
    /*
      1. Якщо масив порожній, повертаємо undefined.
      2. Зберігаємо останній елемент у змінну.
      3. Видаляємо останній елемент з масиву, зменшуючи length на 1.
      4. Повертаємо видалений елемент.
    */
    if (this.length === 0) {
      return undefined;
    }

    const lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;

    return lastItem;
  }

  unshift(...items) {
    /*
      1. Проходимо по масиву з кінця до початку, зміщуючи кожен елемент праворуч на кількість елементів items.
      2. Додаємо елементи з items на початок масиву.
      3. Збільшуємо length на кількість доданих елементів і повертаємо нову довжину масиву.
    */
    for (let i = this.length - 1; i >= 0; i--) {
      this[i + items.length] = this[i];
    }

    for (let j = 0; j < items.length; j++) {
      this[j] = items[j];
    }

    this.length += items.length;

    return this.length;
  }

  shift() {
    /*
      1. Якщо масив порожній, повертаємо undefined.
      2. Зберігаємо перший елемент масиву у змінну.
      3. Проходимо по масиву з початку до кінця, зміщуючи кожен елемент ліворуч.
      4. Видаляємо останній елемент і зменшуємо length на 1.
      5. Повертаємо видалений елемент.
    */
    if (this.length === 0) {
      return undefined;
    }

    const firstItem = this[0];

    for (let i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1];
    }
    delete this[this.length - 1];
    this.length--;

    return firstItem;
  }

  forEach(callback) {
    /*
      1. Проходимо по кожному елементу масиву.
      2. Викликаємо callback з поточним елементом, його індексом та масивом.
      3. Повертаємо undefined, так як forEach не повертає значення.
    */
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  }

  map(callback) {
    /*
      1. Створюємо новий екземпляр MyArray для збереження результатів.
      2. Проходимо по кожному елементу масиву, застосовуючи callback.
      3. Додаємо результат виклику callback до newArray за допомогою метода push.
      4. Повертаємо newArray з результатами.
    */
    const newArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArray.push(callback(this[i], i, this));
    }

    return newArray;
  }

  filter(callback) {
    /*
      1. Створюємо новий екземпляр MyArray для збереження відфільтрованих елементів.
      2. Проходимо по кожному елементу масиву, перевіряючи, чи він відповідає умові callback.
      3. Якщо умова виконується, додаємо елемент до newArray за допомогою метода push.
      4. Повертаємо newArray з відфільтрованими елементами.
    */
    const newArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        newArray.push(this[i]);
      }
    }

    return newArray;
  }
}

const myArr = new MyArray();

myArr.push(10, 20, 30);
myArr.pop();
myArr.shift();
myArr.pop();
myArr.unshift(40, 50, 80);

console.log(myArr);

const mappedArr = myArr.map((e) => e * 2);
console.log(mappedArr);

const myArr2 = new MyArray(12,15,17)
myArr2.push(18,19);
console.log(myArr2);


