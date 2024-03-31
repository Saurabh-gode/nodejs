var TimeLimitedCache = function () {
  this.kvStore = {};
  this.timerStore = {};
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  let valueToReturn = false;
  if (this.kvStore.hasOwnProperty(key)) {
    clearTimeout(this.kvStore[key].timerId);
    valueToReturn = true;
  }

  let timerId = setTimeout(() => {
    delete this.kvStore[key];
  }, duration);

  this.kvStore[key] = {
    duration,
    timerId,
    value,
  };

  return valueToReturn;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (this.kvStore.hasOwnProperty(key)) {
    return this.kvStore[key].value;
  } else {
    return -1;
  }
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return Object.keys(this.kvStore).length;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
