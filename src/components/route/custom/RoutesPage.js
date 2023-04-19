import React, {useState} from 'react';
import MapContainer from './MapContainer';
import SelectedAddressesList from "./SelectedAddressesList";
import RouteControls from "./RouteControls";

export default function RoutesPage() {


    return (
        <div className="MapContainer">
            <h1>My Dashboard</h1>
            <RouteControls/>
            {/*<MapContainer*/}
            {/*    zoom={10}*/}
            {/*/>*/}
        </div>
    );
}