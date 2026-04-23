import {Event} from './event.js'
import {titleList,namesList} from "./constants.js";

const start = new Date(2024, 0, 1);  // 1 января 2024
const end = new Date(2024, 11, 31);




function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPeopleList(n){
    const arr = [];
    let i = 0;
    while (i !== n){
        arr.push(namesList[getRandomInt(0,namesList.length-1)])
        i++;
    }
    return arr
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export function eventsListFiller(size,list){
    let n = 0;

    while(n !== size){
        list.push(new Event(list.length+1,titleList[getRandomInt(0,titleList.length-1)],getRandomPeopleList(getRandomInt(4,10)),getRandomDate(start,end)))
        n++;
    }
}