'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    let date = new Date("2020-01-06T00:00:00");
    date.setSeconds(date.getSeconds() + seconds);
    alert("The date is " + date);
}



/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    let array = decimal.split(".");
    let binaryNumber = "";
    let leftPart = array[0];
    while(leftPart !== 1 && leftPart !== 0){
        if(leftPart % 2 === 0){
            leftPart = leftPart / 2;
            binaryNumber = binaryNumber + 0;
        }else{
            leftPart = (leftPart - 1) / 2;
            binaryNumber = binaryNumber + 1;
        }
    }
    binaryNumber += leftPart;
    let reverse = "";
    for(let i = binaryNumber.length - 1; i >= 0; i--){
        reverse += binaryNumber[i];
    }
    binaryNumber = reverse;
    if(array.length === 2){
        binaryNumber = binaryNumber + "."
        let count = 11;
        let rightPart = "0." + array[1];
        while(count > 0){
            rightPart *= 2;
            binaryNumber += Math.trunc(rightPart);
            if(rightPart >= 1){
                rightPart -= 1;
            }
            if(rightPart % 2 === 0){
                break;
            }
            count--;
        }
    }
    alert("The binary number " + binaryNumber);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    let substrCount = 0;
    let position = 0;
    while(true){
        let index = text.indexOf(substring, position);
        if(index === -1){
            break;
        } else{
            substrCount++;
        }
        position = index + 1;
    }
    alert("The amount is " + substrCount);
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    let map = new Map();
    if(string.length > 0){
        map.set(string.charAt(0), 1);
    }
    for(let i = 1; i < string.length; i++){
        let flag = false;
        let letter = string.charAt(i);
        for(let j of map.keys()){
            if(letter === j){
                flag = true;
                let count = map.get(j);
                map.set(j, ++count);
            }
        }
        if(!flag){
            map.set(letter, 1);
        }
    }
    for(let key of map.keys()){
        if(map.get(key) == 1){
            let indexFirst = string.indexOf(key);
            let substringEnd = string.slice(indexFirst);
            let substringStart = string.slice(0, indexFirst);
            string = substringStart + key + substringEnd;
        }
    }
    alert("Result: " + string);
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return function(str){
        return str;
    }
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {

}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {

}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {

}