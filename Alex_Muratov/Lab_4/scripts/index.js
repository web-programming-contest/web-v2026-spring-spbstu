"use strict";
import {parseDateToString} from "./eventsList.js";
import {Event} from "./event.js";

export function getList(){
    return new Promise(function(resolve){
        setTimeout(()=>{
            const parsedList = JSON.parse(localStorage.getItem("EventsList"))
            const data = parsedList.map((data)=>new Event(data.id,data.title,data.participants,new Date(data.date)));
            resolve(data);
        },30)
    })
}

export function setList(list){
    return new Promise(function(resolve) {
      setTimeout(()=>{
          localStorage.setItem("EventsList", JSON.stringify(list));
          resolve(list,"OK");
      },20)
    })
}

export function setMessage(message,element,color) {
    const span = document.getElementById(element);
    span.style.display = 'block';
    span.style.background = color;
    span.innerText = message;

    setTimeout(() => {
        span.classList.add('show');

    }, 10)

    setTimeout(()=>{
        span.classList.remove('show');
        span.style.display = "none";

    },2000)
}

function showModal(button) {
    const modal = document.getElementById("participant-modal");
    const cardId = +(button.closest(".event-card").id);
    modal.style.display = "block";
    window.currentCardId = cardId;
}

function showCreateEventModal(){
    const modal = document.getElementById("event-modal");
    modal.style.display="block";
}

function closeModal (button){
    const modal = button.closest(".modal");
    modal.style.display="none";
}

export function renderEventsCard(events){
    const container = document.querySelector(".events-container");

    const addCardHtml = `
        <div class="event-card" id="addEventCard">
            <button class="create-event-button" onclick="showCreateEventModal()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `;

    container.innerHTML = addCardHtml + events.map((event)=> {
        let participantsList = event.participants;
        participantsList = event.participants.length !== 0 ? participantsList.map((participant, index)=>
                `<div class="pill-button participant-element">
                ${participant} 
                <button class="small-button" id="${index}" onclick="deleteParticipant(this)"> 
                    <i class="fa-solid fa-minus"></i> 
                </button> 
            </div>`
            ).join('')
            : `<span>У события пока нет участников</span>`;

        return(
            `<div class="event-card" id="${event.id}">
        <button class="cross-btn" onclick="deleteEvent(this)">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="event-card-head">
            <span class="event-name">${event.title}</span>
            <span class="event-date">${parseDateToString(event.date)}</span>
        </div>
        <div class="event-card-body"> 
            <div class="participants-section">
                <span class="title">Участники:</span>
                <div class="participants-container"> 
                    ${participantsList}
                </div>
            </div>
            <div class="title"> 
                Всего участников: ${event.participantCount} 
            </div>
            <div class="button-container">
                <button class="pill-button add-part-button" onclick="showModal(this)"> 
                    Добавить участника
                </button>
            </div>
        </div>
    </div>`
        )}).join('');
}


getList().then(res => renderEventsCard(res));

window.showCreateEventModal =showCreateEventModal;
window.closeModal = closeModal;
window.showModal = showModal;
