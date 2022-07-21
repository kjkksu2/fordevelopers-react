import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginSuccess from "./auth/LoginSuccess";
import Home from "./routes/Home";
import Write from "./routes/Write";
import Board from "./routes/Board";
import Post from "./routes/Post";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path={["/board", "/board/search"]}>
          <Board />
        </Route>
        <Route exact path={["/board/write", "/board/article/update"]}>
          <Write />
        </Route>
        <Route exact path="/board/article">
          <Post />
        </Route>
        <Route exact path="/login/success" component={LoginSuccess} />
      </Switch>
    </Router>
  );
};

export default App;
