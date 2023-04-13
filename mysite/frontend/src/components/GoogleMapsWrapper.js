import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const GoogleMapsWrapper = ({ children }) => {
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyB_sMVgUoBDYt8hNkW_cEorXESyE93jOgg"
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsWrapper;

