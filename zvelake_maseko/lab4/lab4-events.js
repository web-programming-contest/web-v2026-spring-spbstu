"use strict";
class Event {
    constructor(id, title, organizers, location) {
        this.id = id;
        this.title = title;
        this.organizers = organizers;
        this.location = location;
    }
    addOrganizer(name) {
        this.organizers.push(name);
    }
    removeOrganizer(name) {
        if (!this.organizers.includes(name))
            return;
        this.organizers = this.organizers.filter(org => org !== name);
    }
    get organizerCount() {
        return this.organizers.length;
    }
}
const events = [
    new Event(crypto.randomUUID(), "Tech Conference 2026", ["Alice Johnson", "Bob Smith"], "Convention Center"),
    new Event(crypto.randomUUID(), "Music Festival", ["Carol Davis"], "Central Park"),
    new Event(crypto.randomUUID(), "Startup Meetup", ["David Lee"], "Innovation Hub"),
    new Event(crypto.randomUUID(), "Art Exhibition", ["Emma Wilson", "Frank Brown", "Grace Taylor"], "Art Gallery"),
    new Event(crypto.randomUUID(), "Charity Run", ["Henry Adams"], "City Stadium"),
    new Event(crypto.randomUUID(), "Workshop: React Basics", ["Isabel Chen", "Jack Robinson"], "Tech Space"),
    new Event(crypto.randomUUID(), "Book Club Meeting", ["Karen White"], "Public Library"),
    new Event(crypto.randomUUID(), "Food Festival", ["Liam Martinez", "Mia Garcia"], "Downtown Square"),
    new Event(crypto.randomUUID(), "Career Fair", ["Noah Anderson"], "University Campus"),
    new Event(crypto.randomUUID(), "Yoga Session", ["Olivia Thomas"], "Wellness Center")
];
function groupByLocation(events) {
    return events.reduce((groups, event) => {
        const locationEvents = groups.get(event.location) || [];
        groups.set(event.location, [...locationEvents, event]);
        return groups;
    }, new Map());
}
function getUniqueOrganizers(events) {
    const allOrganizers = events.flatMap(e => e.organizers);
    const uniqueOrganizers = new Set(allOrganizers);
    return Array.from(uniqueOrganizers).filter(org => org !== null);
}
function getEventsByOrganizer(organizer, events) {
    return events.filter(e => e.organizers.includes(organizer));
}
function groupByOrganizerCount(events) {
    const groups = new Map();
    events.forEach(event => {
        const count = event.organizerCount;
        if (!groups.has(count)) {
            groups.set(count, []);
        }
        groups.get(count).push(event);
    });
    return groups;
}
function getEventsInLocation(location, events) {
    return events.filter(e => e.location.toLowerCase() === location.toLowerCase());
}

export {events, groupByLocation, getUniqueOrganizers, getEventsByOrganizer, groupByOrganizerCount, getEventsInLocation};
export default Event;
