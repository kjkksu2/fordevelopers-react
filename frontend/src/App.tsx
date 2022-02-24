import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dev from "./components/pages/Dev";
import Header from "./components/common/Header";
import LoginSuccess from "./components/auth/LoginSuccess";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/devs">
          <Dev />
        </Route>
        <Route exact path="/login/success" component={LoginSuccess} />
        <Route path="/users">{/* <Users /> */}</Route>
        <Route path="/categories">{/* <Categories /> */}</Route>
        <Route path="/api">{/* <Api /> */}</Route>
      </Switch>
    </Router>
  );
}

export default App;
