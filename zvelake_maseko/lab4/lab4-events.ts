
class EventCls{
    id: Number;
    title: string;
    organizers: string[];
    location: string;
    constructor(id: Number, title: string, organizers: string[], location: string){
        this.id = id;
        this.title = title;
        this.organizers = organizers;
        this.location = location;
    }

    addOrganizer(name: string){
        this.organizers.push(name);
    }

    removeOrganizer(name: string){
        if(!this.organizers.includes(name)) return;
        this.organizers = this.organizers.filter(org => org !== name);
    }

    get organizerCount(){
        return this.organizers.length;
    }
}

const events: EventCls[] = [
    new EventCls(1, "Tech Conference 2026", ["Alice Johnson", "Bob Smith"], "Convention Center"),
    new EventCls(2, "Music Festival", ["Carol Davis"], "Central Park"),
    new EventCls(3, "Startup Meetup", ["David Lee"], "Innovation Hub"),
    new EventCls(4, "Art Exhibition", ["Emma Wilson", "Frank Brown", "Grace Taylor"], "Art Gallery"),
    new EventCls(5, "Charity Run", ["Henry Adams"], "City Stadium"),
    new EventCls(6, "Workshop: React Basics", ["Isabel Chen", "Jack Robinson"], "Tech Space"),
    new EventCls(7, "Book Club Meeting", ["Karen White"], "Public Library"),
    new EventCls(8, "Food Festival", ["Liam Martinez", "Mia Garcia"], "Downtown Square"),
    new EventCls(9, "Career Fair", ["Noah Anderson"], "University Campus"),
    new EventCls(10, "Yoga Session", ["Olivia Thomas"], "Wellness Center")
];

function groupByLocation(events: EventCls[]): Map<string, EventCls[]> {
    return events.reduce((groups, event) => {
        const locationEvents = groups.get(event.location) || [];
        groups.set(event.location, [...locationEvents, event]);
        return groups;
    }, new Map<string, EventCls[]>());
}
function getUniqueOrganizers(events: EventCls[]): string[] {
    const allOrganizers = events.flatMap(e => e.organizers);
    const uniqueOrganizers = new Set(allOrganizers);
    return Array.from(uniqueOrganizers).filter(org => org !== null) as string[];
}

groupByLocation(events).
function getEventsByOrganizer(organizer: string, events: EventCls[]): EventCls[]{
    return events.filter(e => e.organizers.includes(organizer));
}

function groupByOrganizerCount(events: EventCls[]): Map<number, EventCls[]>{
    const groups = new Map<number, EventCls[]>();
    
    events.forEach(event => {
        const count = event.organizerCount;
        if (!groups.has(count)) {
            groups.set(count, []);
        }
        groups.get(count)!.push(event);
    });
    
    return groups;
}

function getEventsInLocation(location: string, events: EventCls[]): EventCls[]{
    return events.filter(e => e.location.toLowerCase() === location.toLowerCase());
}