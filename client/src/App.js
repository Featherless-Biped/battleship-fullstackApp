import NavBar from "./components/navBar/NavBar";
// import PetForm from "./components/PetForm";
// import PetList from "./components/PetList";
import Profile from "./components/profile/Profile";
import Game from "./components/game/Game";
import GamePvP from "./components/game/GamePvP";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
// import Axios from "axios";
import { Route, Routes } from "react-router-dom";
import GlobalContextProvider from "./contexts/GlobalContext";

import "./index.css";

function App() {
  return (
    <GlobalContextProvider>
      <div className="container-css">
        {/* <NavBar /> */}
        <Routes>
          <Route
            path="/"
            element={
              // <PrivateRoute>
              <Home />
              // </PrivateRoute>
            }
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/gamePvP" element={<GamePvP />}></Route>
        </Routes>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
