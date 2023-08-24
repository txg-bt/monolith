import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurants from "./Containers/Restaurants";
import Login from "./Containers/Login";
import Register from "./Containers/Register/";
import { Flex } from "rebass";
import Reservations from "./Containers/Reservations";

const GlobalStyle = createGlobalStyle`
  font-family: sans-serif;
  font-size: 16;

  body, html {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  * {
   box-sizing: border-box;
   font-family: Nunito, sans-serif
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;

function App() {
  return (
    <>
      <Flex>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              key={"restaurants"}
              index
              path=""
              element={<Restaurants />}
            ></Route>
            <Route key={"login"} path="/login" element={<Login />}></Route>
            <Route
              key={"register"}
              path="/register"
              element={<Register />}
            ></Route>
            <Route
              key={"reservations"}
              path="/reservations"
              element={<Reservations />}
            ></Route>
            <Route
              key={"not-found"}
              path="*"
              element={<div> Not found</div>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
}

export default App;
