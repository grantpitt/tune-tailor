import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Feed from "./views/Feed";
import styled from "@emotion/styled";

function App() {
  return (
    <Router>
      <Main>
        {/* <div className="container">
        <Navbar />
        <br/> */}
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/feed" component={Feed} />

        {/* <Route path="/edit/:id" component={EditExercise} /> 
        </ div>*/}
      </Main>
    </Router>
  );
}

const Main = styled.div`
  width: 100%;
`;

export default App;
