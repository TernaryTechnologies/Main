import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { AuthContext } from "./App";
import {
  handleTokenRefreshed,
  fetchWithTokenRefresh,
} from "./tokenUtils";

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

const EventListItem = ({ eventGroup, eventNumber, context, triggerEventsUpdate }) => {
  const [address, setAddress] = useState("");
  const [joinedEventIds, setJoinedEventIds] = useState([]);

  useEffect(() => {
    const fetchAddressForEventGroup = async () => {
      const firstEvent = eventGroup[0];
      const fetchedAddress = await fetchAddress(
        firstEvent.latitude,
        firstEvent.longitude
      );
      setAddress(fetchedAddress);
    };

    const checkUserJoinedEvent = () => {
      const userId = context.state.user.id;
      console.log("User ID:", userId);

      const calculatedJoinedEventIds = eventGroup
        .filter((event) => {
          console.log("Players in event:", event.players);
          const hasJoined =
            event.players &&
            event.players.some((player) => player.player.id === userId);
          console.log("User has joined:", hasJoined);
          return hasJoined;
        })
        .map((event) => event.id);

      setJoinedEventIds(calculatedJoinedEventIds);
    };

    fetchAddressForEventGroup();
    checkUserJoinedEvent();
  }, [JSON.stringify(eventGroup)]);

  const joinEvent = async (eventId) => {
    const { token } = context.state;
    const { dispatch } = context;
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetchWithTokenRefresh(
        `/api/events/${eventId}/join/`,
        requestOptions,
        () => JSON.parse(localStorage.getItem("refreshToken")), // Pass a function that retrieves the refresh token from local storage
        (newAccessToken) => handleTokenRefreshed(newAccessToken, dispatch), // Pass the handleTokenRefreshed function
        dispatch // Pass the dispatch function
      );
  
      if (response.ok) {
        alert("Successfully joined the event!");
        setJoinedEventIds((prevJoinedEventIds) => [
          ...prevJoinedEventIds,
          eventId,
        ]);
        triggerEventsUpdate();
      } else {
        const error = await response.json();
        alert(`Failed to join the event: ${error.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "LOGOUT" });
    }
  };
  

  const leaveEvent = async (eventId) => {
    const { token } = context.state;
    const { dispatch } = context;
  
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetchWithTokenRefresh(
        `/api/events/${eventId}/leave/`,
        requestOptions,
        () => JSON.parse(localStorage.getItem("refreshToken")), // Pass a function that retrieves the refresh token from local storage
        (newAccessToken) => handleTokenRefreshed({ token: newAccessToken }, dispatch), // Pass the handleTokenRefreshed function with the new access token
        dispatch // Pass the dispatch function
      );
  
      if (response.ok) {
        alert("Successfully left the event!");
        setJoinedEventIds((prevJoinedEventIds) =>
          prevJoinedEventIds.filter((id) => id !== eventId)
        );
        triggerEventsUpdate();
      } else {
        const error = await response.json();
        alert(`Failed to leave the event: ${error.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <li key={eventGroup[0].id} className="event-list-item">
      <span className="event-number">{eventNumber} </span>
      {eventGroup.map((event, index) => (
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
          <div className="event-detail">Players: {event.players.length}</div>
          <div>
            {joinedEventIds.includes(eventGroup[0].id) ? (
              <button onClick={() => leaveEvent(eventGroup[0].id)}>
                Leave Event
              </button>
            ) : (
              <button onClick={() => joinEvent(eventGroup[0].id)}>
                Join Event
              </button>
            )}
          </div>

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

const FilteredEvents = ({ latitude, longitude }) => {
  const [events, setEvents] = useState([]);
  const [zoom, setZoom] = useState(11);

  const context = React.useContext(AuthContext);

  const [filters, setFilters] = useState({
    sport: "",
    beginner_friendly: false,
    women_only: false,
    user_lat: 34.057919,
    user_lng: -117.821342,
    range: 50,
  });

  const [eventsVersion, setEventsVersion] = useState(0);

  const triggerEventsUpdate = () => {
    setEventsVersion((prevVersion) => prevVersion + 1);
  };


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
  }, [filters, eventsVersion]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({ ...filters, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div>
      <div className="filters-container">
        <div className="filter-item">
          <label htmlFor="sport">Sport:</label>
          <input
            type="text"
            name="sport"
            value={filters.sport}
            onChange={handleChange}
          />
        </div>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="beginner_friendly"
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
                name="women_only"
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
                context={context}
                triggerEventsUpdate={triggerEventsUpdate}
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
