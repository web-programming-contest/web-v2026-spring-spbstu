import React, {useState, useEffect} from "react";

import Event, {events, groupByLocation, getUniqueOrganizers, 
                getEventsByOrganizer, groupByOrganizerCount,
                getEventsInLocation} from './lab4-events.js';

let porpularLocations = [
    "Main Hall", "City Center", "Tech Park", "Cultural Hub",
    "Business Tower", "Community Center", "Stadium", "Convention Hall"
];

let tabs = ['All Events','locations', 'organizers'];

function EventCard({event, setEventsList, setCurrentEventId, setEditMode}){
    const editEvent = function(){
        setCurrentEventId(event.id);
        setEditMode(true);
    };
    const deleteEvent = async () => {
        setEventsList(prev => prev.filter(e => e.id != event.id));
    }
    return (<>
    <div className="event-card">
        <div className="event-card__header">
            <h3 className="event-title">{event.title}</h3>
        </div>
        <div className="event-card__body">
            <div className="event-info">
                <div>Место: <span className="event-location">{event.location}</span></div>
                <div>Организаторы: <ul className="event-organizers">
                    {event.organizers.map((org,i) => (<li key={"org-" + i}>{org}</li>))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="event-card__footer">
            <div className="event-actions">
                <button className="delete-btn danger" type="button" onClick={deleteEvent}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button className="edit-btn warn" type="button" onClick={editEvent}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
            </div>
        </div>
    </div>
    </>);
}

function NavigationTabs({currentTabIndx, setCurrentTabIndx}){
    return (<>
    <div className="tabs">
        <div className="tabs-list-box">
            <ul className="tabs-list">
                {tabs.map((t, i) => (<li key={i} className={`tab-item ${(i === currentTabIndx) ? 'active' : ''}`}
                                        tabIndex={1}
                                        onClick={()=>{setCurrentTabIndx(i)}}>{t}
                                    </li>)
                            )
                }
            </ul>
        </div>
    </div>
    </>)
}

function LocationGroups({
    eventsList,
    setEventsList,
    setEditMode,
    setCurrentEventId
}){
    let groups = groupByLocation(eventsList);
    return (<>
    {Array.from(groups.entries()).map(([location, events]) => (
                <section key={location}>
                    <div className="section-header">
                        <h2>{location}</h2>
                    </div>
                    <div className="events-grid">
                        {events.map((event) => (
                            <EventCard 
                                key={event.id}
                                event={event}
                                setEventsList={setEventsList}
                                setEditMode={setEditMode}
                                setCurrentEventId={setCurrentEventId}
                            />
                        ))}
                    </div>
                </section>
            ))}
    </>);
}

function AllEvents({
    eventsList,
    setEventsList,
    setEditMode,
    setCurrentEventId,
    openEditor
}){
    return (
    <section>
        <div className="section-header">
            <h1>Events</h1>
        </div>
        <div className="actions-panel">
            <div className="quick-actions">
                <a className="action" onClick={openEditor}>Add Events</a>
            </div>
        </div>
            {eventsList.length === 0 ?
            <div className="alert-bob">
                <h1>No Events</h1>
            </div> :
            <div className="events-grid">
                {eventsList.map((e,i) => (<EventCard key={i}
                            event={e}
                            setEventsList={setEventsList}
                            setEditMode={setEditMode}
                            setCurrentEventId={setCurrentEventId}/>
                            )
                        )
                }
            </div>
            }
    </section>
    );
}

function Editor({
    currentEvent,
    setEventsList,
    setEditMode,
    setCurrentEventId
}){
    const [organizers, setOrganizers] = useState(currentEvent ? currentEvent.organizers : []);
    const [organizer, setOrganizer] = useState("");
    const [eventTitle, setEventTitle] = useState(currentEvent ? currentEvent.title : "");
    const [eventLocation, setEventLocation] = useState(currentEvent ? currentEvent.location : "");

    const addOrganizer = async (name)=>{
        setOrganizers([...organizers, name]);
    }

    const removeOrganizer = async (name) => {
        setOrganizers(organizers.filter(org => org !== name));
    };

    const saveEvent = async ()=>{
        const id = crypto.randomUUID();
        let e = currentEvent ?? new Event(id, '', [], '');
        e.title = eventTitle;
        e.location = eventLocation;
        e.organizers = organizers;
        currentEvent ?? setEventsList(prev => [...prev, e]);
        setCurrentEventId(-1);
        setEditMode(false);
    }

    const closeEditor = ()=>{
        setCurrentEventId(-1);
        setEditMode(false);
    }
    return (<>
        <div className="form-container">
            <div className="form-title">
                <h2>{currentEvent ? 'Edit Event' : 'Create Event'}</h2>
            </div>
            <div className="edit-panel">
                <div className="edit-area">
                    <form>
                        <div className="field">
                            <label htmlFor="inp-title">Title</label>
                            <input type="text" value={eventTitle} name="title" id="inp-title" onChange={function(e){setEventTitle(e.target.value)}} />
                        </div>
                        <div className="field">
                            <label htmlFor="inp-location">Location</label>
                            <input type="text" value={eventLocation} name="location" id="inp-location" onChange={function(e){setEventLocation(e.target.value)}}/>
                        </div>
                        <div className="field">
                            <label htmlFor="inp-organizer">Organiser</label>
                            <div className="inp-btn">
                                <input type="text" name="organizer" value={organizer} id="inp-organizer" onInput={function(e){setOrganizer(e.target.value)}}></input>
                                <button className="add-organizer-btn" type="button" onClick={()=>{ !organizers.includes(organizer) && addOrganizer(organizer); setOrganizer('') }}>Add</button>
                            </div>
                        </div>
                        <div className="form-control-btns">
                            <button type="button" className="submit-btn" onClick={saveEvent}>Сохранить</button>
                            <button type="button" className="cancel-btn" onClick={closeEditor}>Отменить</button>
                        </div>
                    </form>
                </div>
                <div className="preview-area">
                    <div className="section-header">
                        <h2>Preview</h2>
                    </div>
                    <table>
                        <tbody>
                            <tr className="preview-event-title">
                                <td className="object-key bold">title: </td>
                                <td>{eventTitle}</td>
                            </tr>
                            <tr className="preview-event-location">
                                <td className="object-key bold">location: </td>
                                <td>{eventLocation}</td>
                            </tr>
                            <tr className="preview-event-organizers">
                                <td className="object-key bold">Организаторы:</td>
                                <td>
                                    <ul className="organizers-list">{organizers.map((org,i) => (
                                        <li key={"preview-org-"+i} className="organizer-item">
                                            <span className="organizer-name">{org}</span>
                                            <div className="organizer-item-actions">
                                                <button type="button" className="delete-btn danger" onClick={()=>{ removeOrganizer(org)}}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </li>
                                    ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

function App(){
    const [eventsList, setEventsList] = useState(()=>{
        try{
            let stored = localStorage.getItem('events');

            if(!stored || stored === 'undefined') return [];

            let parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch(err){
            return [];
        }
    });
    const [editMode, setEditMode] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [currentTabIndx, setCurrentTabIndx] = useState(0);

    useEffect(()=>{
        localStorage.setItem('events', JSON.stringify(eventsList));
    }, [eventsList]);

    const openEditor = ()=>{
        setEditMode(true);
    }
    return (
    <>
        <NavigationTabs 
            currentTabIndx={currentTabIndx} 
            setCurrentTabIndx={setCurrentTabIndx}
        />
        
        {!editMode && currentTabIndx === 0 && (
            <AllEvents 
                eventsList={eventsList}
                setEventsList={setEventsList}
                setEditMode={setEditMode}
                setCurrentEventId={setCurrentEventId}
                openEditor={openEditor}
            />
        )}
        
        {!editMode && currentTabIndx === 1 && (
            <LocationGroups 
                eventsList={eventsList}
                setEventsList={setEventsList}
                setEditMode={setEditMode}
                setCurrentEventId={setCurrentEventId}
            />
        )}
        
        {editMode && (
            <Editor 
                currentEvent={eventsList.find(e => e.id === currentEventId)}
                eventsList={eventsList}
                setEventsList={setEventsList}
                setEditMode={setEditMode}
                setCurrentEventId={setCurrentEventId}
            />
        )}
    </>
    );
}

export default App;
