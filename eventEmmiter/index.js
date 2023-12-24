module.exports = class EventEmmiter {
  constructor() {
    this.events = {};
  }

  on(eventName, callBackFn) {
    if (this.events[eventName]) {
      this.events[eventName].push(callBackFn);
    } else {
      this.events[eventName] = [callBackFn];
    }
  }

  once(eventName, callBackFn) {
    if (this.events[eventName]) {
      this.events[eventName].push(callBackFn);
    } else {
      this.events[eventName] = [callBackFn];
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb) => {
        cb.apply(null, args);
      });
    }
  }

  //   once() {}
};
