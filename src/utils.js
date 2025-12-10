import { v4 as uuidv4 } from 'uuid';

export const constructChatMessage = ({ name, msg, type }) => {
  const ob = {
    key: uuidv4(),
    name,
    msg,
    timeStamp: new Date(),
    type,
  };
  return { ...ob };
};

export const calculateCPUBenchmark = () => {
  var _speedconstant = 8.9997e-9; //if speed=(c*a)/t, then constant=(s*t)/a and time=(a*c)/s
  var d = new Date();
  var amount = 150000000;
  var estprocessor = 1.7; //average processor speed, in GHZ
  const generalSpeed = `(JSBenchmark) Running loop ${amount} times.     Estimated time (for ${estprocessor}ghz processor) is ${(Math.round(((_speedconstant * amount) / estprocessor) * 100) / 100)}s`
  for (var i = amount; i > 0; i--) { }
  var newd = new Date();
  var accnewd = Number(String(newd.getSeconds()) + "." + String(newd.getMilliseconds()));
  var accd = Number(String(d.getSeconds()) + "." + String(d.getMilliseconds()));
  var di = accnewd - accd;
  if (d.getMinutes() !== newd.getMinutes()) {
    di = (60 * (newd.getMinutes() - d.getMinutes())) + di
  }
  let spd = ((_speedconstant * amount) / di);
  const msg = `${generalSpeed} | Time: ${Math.round(di * 1000) / 1000}s, estimated speed: ${Math.round(spd * 1000) / 1000}GHZ.`;
  return msg;
}