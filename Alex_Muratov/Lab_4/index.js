import {parseDateToString} from "./eventsList.js";
import {Event} from "./event.js";

function restoredList(){
    const parsedList = JSON.parse(localStorage.getItem("EventsList"))
    return parsedList.map((data)=>new Event(data.id,data.title,data.participants,new Date(data.date)));
}

function getList(){
    const parsedList = JSON.parse(localStorage.getItem("EventsList"))
    return parsedList.map((data)=>new Event(data.id,data.title,data.participants,new Date(data.date)));
}

function setList(list){
    localStorage.setItem("EventsList",JSON.stringify(list));
}

function showModal(button) {
    const modal = document.getElementById("participant-modal");
    const cardId = +(button.closest(".event-card").id);
    modal.style.display = "block";

    window.currentCardId = cardId;
}



function addParticipant(){
    const form = document.getElementById('addParticipantForm');
    const formData = new FormData(form);

    const firstName = formData.get("participantFirstName");
    const secondName = formData.get("participantSecondName");
    const newParticipant = firstName+" "+secondName;
    let dataList = getList();
    const event = dataList.find(event => event.id === window.currentCardId);
    event.participants.push(newParticipant);
    setList(dataList)
    renderEventsCard(dataList);
}

function deleteParticipant(button){
    const elementForDelete = +button.id;
    const eventId = button.closest(".event-card").id;
    const curCard = restoredEvents.find(curEvent => curEvent.id === +eventId);
    curCard.participants.splice(elementForDelete,1);
    localStorage.setItem("EventsList",JSON.stringify(restoredEvents));
    renderEventsCard(restoredEvents);
}

function addEvent(){
    const form = document.getElementById("addEventForm");
    const formData = new FormData(form);

    const title =  formData.get("eventTitle");
    const id = formData.get("eventId");
    const date = formData.get("eventDate");
    if(restoredEvents.find(curEvent => curEvent.id === +id)){
        const span = document.getElementById("messageSpan");
        span.style.display = 'block';
        span.innerText = "Мероприятие с таким ID уже существует"
        setTimeout(() => {
            span.classList.add('show');
        }, 10)


        setTimeout(()=>{
            span.classList.remove('show');
            span.style.display = "none";

        },2000)
    }
    else {
        restoredEvents.push(new Event(id, title, [], new Date(date)));
        localStorage.setItem("EventsList",JSON.stringify(restoredEvents));
        renderEventsCard(restoredEvents)
    }
}

function deleteEvent(button){

}

function showCreateEventModal(){
    const modal = document.getElementById("event-modal");
    modal.style.display="block";
}

function closeModal (button){
    const modal = button.closest(".modal");
    modal.style.display="none";
}

window.showCreateEventModal =showCreateEventModal;
window.deleteEvent = deleteEvent;
window.addEvent = addEvent;
window.deleteParticipant = deleteParticipant;
window.closeModal = closeModal;
window.showModal = showModal;
window.addParticipant = addParticipant;

function renderEventsCard(events){
    const container = document.querySelector(".events-container");

    const addCardHtml = `
        <div class="event-card" id="addEventCard">
            <button class="create-event-button" onclick="showCreateEventModal()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `;

    container.innerHTML =addCardHtml + restoredEvents.map((event)=> {
        let participantsList = event.participants;
        participantsList = event.participants.length !==0 ? participantsList.map((participant,index)=>
           `<div class="pill-button participant-element" id="${index}">
            ${participant} 
            <button class="small-button" onclick="deleteParticipant(this)"> 
                <i class="fa-solid fa-minus"></i> 
            </button> 
        </div>`
        ).join('')
            : `<span>У события пока нет участников</span>`;

        return(
        `<div class="event-card" id=${event.id}>
            <div class="event-card-head">
                <span class="event-name"> ${event.title} </span>
                <span class="event-date"> ${parseDateToString(event.date)}</span>
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
                    <button class="pill-button add-part-button" onclick="showModal(this)"> Добавить участника</button>
                </div>
            </div>
            
        </div>
       `
    )}).join('')

}

renderEventsCard(getList())