function* fibonacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const gen = fibonacci();

// приклад отримання перших 15 чисел
for (let i = 0; i < 15; i++) {
  console.log(gen.next().value);
}