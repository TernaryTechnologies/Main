import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";

function groupEventsByAddress(events) {
    const groupedEvents = events.reduce((acc, event) => {
        const key = `${event.latitude}-${event.longitude}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(event);
        return acc;
    }, {});

    return Object.values(groupedEvents);
}

const EventListItem = ({ eventGroup, eventNumber }) => {
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchAddressForEventGroup = async () => {
            const firstEvent = eventGroup[0];
            const fetchedAddress = await fetchAddress(
                firstEvent.latitude,
                firstEvent.longitude
            );
            setAddress(fetchedAddress);
        };

        fetchAddressForEventGroup();
    }, [eventGroup]);

    return (
        <li key={eventGroup[0].id} className="event-list-item">
            <span className="event-number">{eventNumber} </span>
            {eventGroup.map((event) => (
                <div key={event.id}>
                    <div className="event-detail">
                        Sport: {event.sport && event.sport.name}
                    </div>
                    <div className="event-detail">Date: {event.date}</div>
                    <div className="event-detail">Time: {event.time}</div>
                    <div className="event-detail">
                        Beginner Friendly: {event.beginner_friendly ? "Yes" : "No"}
                    </div>
                    <div className="event-detail">
                        Women Only: {event.women_only ? "Yes" : "No"}
                    </div>
                    <div className="event-detail">Address: {address}</div>
                    <br />
                </div>
            ))}
        </li>
    );
};

const fetchAddress = async (latitude, longitude) => {
    const url = new URL("/api/reverse_geocode/", window.location.origin);
    url.search = new URLSearchParams({ latitude, longitude }).toString();
    const response = await fetch(url);
    const data = await response.json();
    return data.address;
};

const FilteredEvents = ({latitude, longitude}) => {
    const [events, setEvents] = useState([]);
    const [zoom, setZoom] = useState(11);

    const [filters, setFilters] = useState({
        sport: "",
        beginner_friendly: "",
        women_only: "",
        user_lat: 34.057919,
        user_lng: -117.821342,
        range: 50,
    });

    const fetchEvents = async () => {
        const queryParameters = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/filtered/?${queryParameters}`);
        const data = await response.json();
        setEvents(data);
    };

    useEffect(() => {
        if (latitude && longitude) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                user_lat: latitude,
                user_lng: longitude,
            }));
        }
    }, [latitude, longitude]);

    useEffect(() => {
        fetchEvents();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({ ...filters, [name]: type === "checkbox" ? checked : value });
    };

    return (
        <div>
            <div className="filters-container">
{/*
                <div className="events-label">Events</div>
*/}
                <div className="filter-item">
                    <label htmlFor="sport">Sport:</label>
                    <input
                        type="text"
                        name="sport"
                        value={filters.sport}
                        onChange={handleChange}
                    />
                </div>
       {/*         <div className="filter-item">
                    <label htmlFor="beginner_friendly">Beginner Friendly:</label>
                    <input
                        type="checkbox"
                        name="beginner_friendly"
                        checked={filters.beginner_friendly}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="women_only">Women Only:</label>
                    <input
                        type="checkbox"
                        name="women_only"
                        checked={filters.women_only}
                        onChange={handleChange}
                    />
                </div>*/}
                <Grid item xs={12} sm={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.beginner_friendly}
                                onChange={handleChange}
                            />
                        }
                        label="Beginner Friendly"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.women_only}
                                onChange={handleChange}
                            />
                        }
                        label="Women Only"
                    />
                </Grid>
                <div className="filter-item">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={filters.date || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="range">Range (miles):</label>
                    <input
                        type="number"
                        name="range"
                        min="0"
                        value={filters.range}
                        onChange={handleChange}
                    />
                </div>
                {/* Add other filters similarly */}
            </div>

            <div className="map-and-events-container">
                <div className="event-list-wrapper">
                    <ul>
                        {groupEventsByAddress(events).map((eventGroup, index) => (
                            <EventListItem
                                key={eventGroup[0].id}
                                eventGroup={eventGroup}
                                eventNumber={index + 1}
                            />
                        ))}
                    </ul>
                </div>
                <div className="map-wrapper">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={{
                            lat: latitude,
                            lng: longitude,
                        }}
                        zoom={zoom}
                    >
                        {groupEventsByAddress(events).map((eventGroup, index) => (
                            <Marker
                                key={eventGroup[0].id}
                                position={{
                                    lat: parseFloat(eventGroup[0].latitude),
                                    lng: parseFloat(eventGroup[0].longitude),
                                }}
                                label={`${index + 1}`}
                            />
                        ))}
                    </GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default FilteredEvents;
