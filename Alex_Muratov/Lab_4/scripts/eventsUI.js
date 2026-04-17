"use strict";
import {Event} from "./event.js";
import {getList, renderEventsCard, setList, setMessage} from "./index.js";
import {eventsValidation} from "./eventsValidation.js";

function addEvent(){
    const form = document.getElementById("addEventForm");
    const formData = new FormData(form);
    const title =  formData.get("eventTitle");
    const id = formData.get("eventId");
    const date = formData.get("eventDate");

    getList()
        .then(res => {
            const validationResult = eventsValidation(id, title, date,res);
            if(!validationResult.correct){
                setMessage(validationResult.message,"messageEventSpan",validationResult.color);
            }
            else {
                const event = new Event(+id,title,[],new Date(date))
                res.push(event);
                renderEventsCard(res)
                setMessage("Событие успешно добавлено","messageEventSpan",validationResult.color);
                return setList(res);

            }
        })
        .catch(error => console.log(error));

}

function deleteEvent(button){
    const cardToRemove =  +button.closest(".event-card").id;

    getList()
        .then(res => {
            const newList = res.filter(event => event.id !== cardToRemove);
            renderEventsCard(newList);
            return setList(newList);
        })
        .catch(error => console.log(error));
}

window.deleteEvent = deleteEvent;
window.addEvent = addEvent;