import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dev from "./components/pages/Dev";
import Header from "./components/common/Header";
import LoginSuccess from "./components/auth/LoginSuccess";
import Home from "./routes/Home";
import Enrollment from "./components/common/Enrollment";
import Post from "./components/common/Post";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path={["/devs", "/devs/:id([0-9a-f]{24})"]}>
          <Dev />
        </Route>
        <Route exact path="/devs/enrollment">
          <Enrollment />
        </Route>
        <Route exact path="/login/success" component={LoginSuccess} />
        <Route path="/categories">{/* <Categories /> */}</Route>
        <Route path="/api">{/* <Api /> */}</Route>
      </Switch>
    </Router>
  );
}

export default App;
