let loggerIsOn = false;
const logger = {
  turnOn: function() {
    loggerIsOn = true;
  },
  turnOff: function() {
    loggerIsOn = false;
  },
  log: function(...params) {
    loggerIsOn && console.log(...params);
  },
}

export default logger;
