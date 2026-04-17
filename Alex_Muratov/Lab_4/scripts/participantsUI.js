"use strict";
import {getList, renderEventsCard, setList, setMessage} from "./index.js";
import {participantValidation} from "./participantsValidation.js";

function addParticipant() {
    const form = document.getElementById('addParticipantForm');
    const formData = new FormData(form);
    const firstName = formData.get("participantFirstName");
    const secondName = formData.get("participantSecondName");
    const newParticipant = firstName + " " + secondName;

    getList()
        .then(res => {
            const event = res.find(event => event.id === +window.currentCardId);
            const validationResult =  participantValidation(firstName, secondName, res, event);
            if (!validationResult.correct){
                setMessage(validationResult.message,"messagePartSpan",validationResult.color);
                throw(new Error(validationResult.message));
            }
            else {
                setMessage(validationResult.message, "messagePartSpan",validationResult.color);
                event.addParticipant(newParticipant);
                renderEventsCard(res);

                return setList(res);
            }
        })
        .catch(error => console.log(error.message));
}

function deleteParticipant(button){
    const elementForDelete = +button.id;
    const eventId = button.closest(".event-card").id;

    getList()
        .then(res => {
            const curCard = res.find(curEvent => curEvent.id === +eventId);
            curCard.removeParticipant(elementForDelete);

            renderEventsCard(res);
            return setList(res);
        })
        .catch(error => console.log(error));
}

window.deleteParticipant = deleteParticipant;
window.addParticipant = addParticipant;