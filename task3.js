function memoize(fn, options = {}) {

      const {
  maxSize = Infinity,
  policy = "LRU",
  ttl = null,
  customEvict = null
} = options;

    const cache = new Map();

    return function (...args) {

        const key = JSON.stringify(args);

        if (cache.has(key)) {

            const entry = cache.get(key);

            if (ttl && Date.now() - entry.time > ttl) {
                cache.delete(key);
            } else {

                entry.freq++;

                if (policy === "LRU") {
                    cache.delete(key);
                    cache.set(key, entry);
                }

                return entry.value;
            }
        }

        const result = fn(...args);

        cache.set(key, {
            value: result,
            freq: 1,
            time: Date.now()
        });

        if (cache.size > maxSize) {

            if (policy === "LRU") {

                const oldestKey = cache.keys().next().value;
                cache.delete(oldestKey);

            } else if (policy === "LFU") {

                let minFreq = Infinity;
                let keyToDelete;

                for (const [k, v] of cache) {
                    if (v.freq < minFreq) {
                        minFreq = v.freq;
                        keyToDelete = k;
                    }
                }

                cache.delete(keyToDelete);

            } else if (policy === "CUSTOM" && typeof customEvict === "function") {

                const keyToDelete = customEvict(cache);
                cache.delete(keyToDelete);

            }
        }

        return result;
    };
}


function sum(a, b) {
    return a + b;
}

const memoSum = memoize(sum, {
    maxSize: 5,
    policy: "LRU",
    ttl: 10000
});

console.log(memoSum(2,3));
console.log(memoSum(2,3));