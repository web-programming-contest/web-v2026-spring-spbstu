// 4.1. Создать класс event с полями:
//     •
// id — уникальный идентификатор (число)
// •
// title — название мероприятия (строка)
// •
// participants — массив имён участников (строки)
// •
// date — дата проведения (строка или объект Date)
// Реализовать методы:
//     •
// addParticipant(name) — добавляет участника
// •
// removeParticipant(name) — удаляет участника
// •
// геттер participantCount — возвращает количество участников
// 4.2. Дан массив мероприятий:
//     •
// Реализовать функцию, которая группирует мероприятия по дате
// •
// Реализовать функцию, возвращающую уникальный список всех участников
// •
// Реализовать функцию, которая группирует мероприятия по количеству участников
// •
// Реализовать функцию, которая возвращает мероприятия, в которых участвует заданный человек
// •
// Реализовать функцию, которая возвращает мероприятия, проходящие в определённом месяце

"use strict";
export class Event {
    id
    title
    participants
    date

    get participantCount(){
        return this.participants.length;
    }

    constructor(id,title,participants,date) {
        this.id = id;
        this.title = title;
        this.participants = participants ;
        this.date = date;
    }

    addParticipant(name) {
        this.participants.push(name);
    }

    removeParticipant(nameIndex){
        this.participants.splice(nameIndex,1);
    }

}
