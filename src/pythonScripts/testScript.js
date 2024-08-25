const SerialPort = require('serialport');
const ReadlineParser = require('@serialport/parser-readline');

let serialPortMultiple1 = new SerialPort({
    path: 'COM11',
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    autoOpen: true
});
  
const parserMultiple1 = serialPortMultiple1.pipe(new ReadlineParser({ delimiter: '\r\n' })); 

console.log("CALLED")