import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { questions_ws } from "./socket";
import { Socket } from "socket.io-client";
import { useBeforeunload } from "./hooks/useExitPrompt";
import { Asker } from "./components/asker/Asker";
import { Answerer } from "./components/answerer/Answerer";
import { Login } from "./components/login/Login"
import { Registration } from "./components/registration/Registration"
import "./app.css";

export const App = () => {
  const [page, setPage] = useState(true);

  useBeforeunload((event) => {
    event.preventDefault();
  });

  const handlePage = () => {
    setPage(!page);
  };

  return (
    <>
      <Link className="link-button" to="">Pages</Link>
      <Link className="link-button" to="/login">Sing in</Link>
      <Link className="link-button" to="/registration">Registration</Link>

      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/registration'>
          <Registration />
        </Route>
        <Route path="">
          <button onClick={handlePage}>Change Page</button>
          {page ? <Asker /> : <Answerer />}
        </Route>
      </Switch>
    </>
  );
};
