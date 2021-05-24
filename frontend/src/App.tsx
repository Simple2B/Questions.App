import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useBeforeunload } from "./hooks/useExitPrompt";
import { Asker } from "./components/asker/Asker";
import { Answerer } from "./components/answerer/Answerer";
import "./app.css";
import { Navigation } from "./components/nav";

export const App = () => {
  const [page, setPage] = useState(true);

  useBeforeunload((event) => {
    event.preventDefault();
  });

  const handlePage = () => {
    setPage(!page);
  };

  return (
    <Router>
      <Navigation />
      <Switch>
        {/* {page ? <Asker /> : <Answerer />} */}
        <Route path="/" exact>
          <Asker />
        </Route>
        <Route path="/answerer">
          <Answerer />
        </Route>
        <Route path="/login">
          <Asker />
        </Route>
        <Route path="/register">
          <Asker />
        </Route>
      </Switch>
    </Router>
  );
};
