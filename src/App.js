import './App.css';
import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideNavbar from "./components/navbar/SideNavbar";
import TopNavbar from "./components/navbar/TopNavbar";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import CouriersPage from "./components/courier/CouriersPage";
import ParcelsPage from "./components/parcel/ParcelsPage";


function App() {
    return (
        <div className="App">
            <Router>
                <TopNavbar />
                <SideNavbar />

                <div className="container mt-5">
                    <Switch>
                        <Route path="/couriers">
                            <CouriersPage />
                        </Route>
                        <Route path="/parcels">
                            <ParcelsPage />
                        </Route>
                        <Route path="/">
                            {/*<Home />*/}
                        </Route>
                    </Switch>
                </div>

                <footer className="App-footer">Hello I'm a little footer</footer>
            </Router>
        </div>
    );
}


export default App;