//generator
function* fibonacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

//iterator
function timeoutIterator(iterator, seconds) {
  const endTime = Date.now() + seconds * 1000;

  const interval = setInterval(() => {
    if (Date.now() >= endTime) {
      clearInterval(interval);
      console.log("Time out");
      return;
    }

    const value = iterator.next().value;
    console.log(value);
  }, 200); 
}

const fib = fibonacci();

timeoutIterator(fib, 5); //working for 5 sec