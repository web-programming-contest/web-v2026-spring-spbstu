"use strict";
import {eventsListFiller} from "./eventsListFiller.js"
import {Event} from "./event.js"
import {monthNames} from "./constants.js";

function loadData(){
    let newEventsList = [];

    if (!localStorage.getItem("EventsList") || localStorage.getItem("EventsList") === "Undefined"){
        eventsListFiller(20,newEventsList);
        localStorage.setItem("EventsList",JSON.stringify(newEventsList));
    }
    else{
        let parsedList = JSON.parse(localStorage.getItem("EventsList"));
        newEventsList = parsedList.map((data)=>new Event(data.id,data.title,data.participants,new Date(data.date)));
    }
    return newEventsList;
}

export let restoredEvents = loadData()

export function parseDateToString(date) {
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2,"0");
    return (day+' '+month+' '+year);
}

function sortByDate(events) {
    return events.sort((a,b) => a.date - b.date);
}

function groupByDate(events) {
    const sortedEvents = sortByDate(events)
    const dateGroup = {};

    for (let event of sortedEvents){

        const curDate = parseDateToString(event.date);

        if (!dateGroup[curDate]){
            dateGroup[curDate] = [];
        }
        dateGroup[curDate].push(event);
    }
    return dateGroup;
}

function groupByParticipantsCount(events){
    const countGroup = {};

    for (let event of events){
        const participantsCount = event.participantCount;

        if ( !countGroup[participantsCount]){
            countGroup[participantsCount] = [];
        }
        countGroup[participantsCount].push(event);
    }
    return countGroup;
}

function getParticipantList(events) {
    const participantList = new Set();

    for (let event of  events){
        for ( let participant of event.participants){
            participantList.add(participant);
        }
    }
    return participantList;
}

function getEventsByMonths(events,month){
    return events.filter((event) =>{
        const eventDate = new Date(event.date);
        return  month === monthNames[eventDate.getMonth()]
    })
}

function getPersonEvents(events,person){
    return events.filter((event) => event.participants.includes(person))
}

console.log("Вывожу мероприятия Апреля",getEventsByMonths(restoredEvents,"Апрель"))

console.log("Вывожу список всех участников",getParticipantList(restoredEvents));

console.log("Вывожу мероприятия Андрея Васильева",getPersonEvents(restoredEvents,"Андрей Васильев"));

console.log("Вывожу мероприятия сгруппированные по дате",groupByDate(restoredEvents));

console.log("Вывожу мероприятия сгруппированные по количеству участников",groupByParticipantsCount(restoredEvents));


