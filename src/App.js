import React from "react";
import { Container } from 'react-bootstrap';
import TopNavbar from "./components/navbar/TopNavbar";
import SideNavbar from "./components/navbar/SideNavbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AssignCourierPage from "./components/courier/AssignCourierPage";
import CouriersPage from "./components/courier/CouriersPage";
import ParcelsRoutePage from "./components/route/parcels/ParcelsRoutePage";
import ParcelsPage from "./components/parcel/ParcelsPage";
import RoutesPage from "./components/route/custom/RoutesPage";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import UsersPage from "./components/user/UsersPage";

function App() {
    return (
        <div className="App">
            <Router>
                <TopNavbar />
                <SideNavbar />
                <Container className="mt-5 pt-4">
                    <Switch>
                        <Route path="/couriers/assign">
                            <AssignCourierPage />
                        </Route>
                        <Route path="/couriers">
                            <CouriersPage />
                        </Route>
                        <Route path="/parcels/route">
                            <ParcelsRoutePage/>
                        </Route>
                        <Route path="/parcels" exact={true}>
                            <ParcelsPage />
                        </Route>
                        <Route path="/route">
                            <RoutesPage/>
                        </Route>
                        <Route path="/users">
                            <UsersPage/>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
