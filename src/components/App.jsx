import { Route, Switch } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';

import { NavBar } from './header/NavBar'
import { ProtectedRoute } from './header/ProtectedRoute'
import { Banner } from "./header/Banner";
import { SubPageBody } from '../styles/App';

import { Home } from "./loggedOutPage/Home";
import { About } from "./loggedOutPage/About";
import { Landmarks } from "./loggedOutPage/Landmarks";
import { Login } from './loggedOutPage/Login';
import { SignUp } from './loggedOutPage/SignUp';

import { Profile } from "./loggedInPage/Profile";
import { ProfileForm } from "./loggedInPage/ProfileForm";
import { TripLog } from "./loggedInPage/TripLog";
import TripLogEdit from "./loggedInPage/TripLogEdit";
import { LandmarkPrivate } from "./loggedInPage/LandmarkPrivate";
import { LandmarkPrivateEdit } from "./loggedInPage/LandmarkPrivateEdit";
import { DayPlanner } from "./loggedInPage/DayPlanner";

export const LoginContext = createContext({
  login: false,
  setLogin: () => {}
});

function App() {

  const [login, setLogin] = useState(false);
  const value = { login, setLogin };

  useEffect(() => {
    localStorage.getItem("token") ? setLogin(true) : setLogin(false)
  }, [])
  
  
  return (
    <LoginContext.Provider value={value}>
      <NavBar />
      <Banner />
      <SubPageBody>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/landmarks/:location" component={Landmarks} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <ProtectedRoute exact path="/day_planner" component={DayPlanner} />
          <ProtectedRoute exact path="/day_planner/:trip_id/edit" component={DayPlanner} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/profile/form" component={ProfileForm} />
          <ProtectedRoute exact path="/trip_log/:trip_title/:trip_id" component={TripLog} />
          <ProtectedRoute exact path="/trip_log/:trip_title/:trip_id/edit" component={TripLogEdit} />
          <ProtectedRoute exact path="/private_gallery/:landmark_city/:landmark_title" component={LandmarkPrivate} />
          <ProtectedRoute exact path="/private_gallery/:landmark_city/:landmark_title/edit" component={LandmarkPrivateEdit} />
          <Route exact path="/" component={Home} />
        </Switch>
      </SubPageBody>
    </LoginContext.Provider>
  );
}

export default App;
