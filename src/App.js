import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import AlertBlock from "./components/AlertBlock";
import {observer} from "mobx-react-lite"
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import ModalBlock from "./components/ModalBlock";

const App = observer( () => {

  const {user} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      if(data) {
        user.setIsAuth(true)
        user.setUser(data)
      }
    }).finally(() => setIsLoading(false))
  })

  if(isLoading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AlertBlock />
      <ModalBlock />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;