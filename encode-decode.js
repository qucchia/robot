let chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890{}[]()\"' ,.:;-_?!/\\ºª+*<>"

export function decode(number) {
  let string = "";
  for (let i = 0; i < number.length; i += 2) {
    string += chars[parseInt(number[i] + number[i + 1])];
  }
  return JSON.parse(string);
}

export function encode(json) {
  let string = JSON.stringify(json);
  let number = "";
  for (let i = 0; i < string.length; i++) {
    let j = chars.indexOf(string[i]);
    if (j < 10) {
      j = "0" + j;
    }
    number += j;
  }
  return number;
}