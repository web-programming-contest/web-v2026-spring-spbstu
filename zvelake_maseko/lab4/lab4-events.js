"use strict";
class Event {
    static max_id = 0;
    constructor(id, title, organizers, location) {
        this.id = id;
        this.title = title;
        this.organizers = organizers;
        this.location = location;

        Event.max_id = Math.max(Event.max_id, this.id);
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
    new Event(1, "Tech Conference 2026", ["Alice Johnson", "Bob Smith"], "Convention Center"),
    new Event(2, "Music Festival", ["Carol Davis"], "Central Park"),
    new Event(3, "Startup Meetup", ["David Lee"], "Innovation Hub"),
    new Event(4, "Art Exhibition", ["Emma Wilson", "Frank Brown", "Grace Taylor"], "Art Gallery"),
    new Event(5, "Charity Run", ["Henry Adams"], "City Stadium"),
    new Event(6, "Workshop: React Basics", ["Isabel Chen", "Jack Robinson"], "Tech Space"),
    new Event(7, "Book Club Meeting", ["Karen White"], "Public Library"),
    new Event(8, "Food Festival", ["Liam Martinez", "Mia Garcia"], "Downtown Square"),
    new Event(9, "Career Fair", ["Noah Anderson"], "University Campus"),
    new Event(10, "Yoga Session", ["Olivia Thomas"], "Wellness Center")
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