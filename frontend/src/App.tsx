import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/", "/login"]}>
          <Home />
        </Route>
        <Route path="/users">{/* <Users /> */}</Route>
        <Route path="/categories">{/* <Categories /> */}</Route>
        <Route path="/api">{/* <Api /> */}</Route>
      </Switch>
    </Router>
  );
}

export default App;
