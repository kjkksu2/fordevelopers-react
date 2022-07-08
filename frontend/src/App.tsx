import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import LoginSuccess from "./components/auth/LoginSuccess";
import Home from "./routes/Home";
import Write from "./routes/Write";
import Board from "./routes/Board";
import Post from "./routes/Post";
import { memo } from "react";

const App = memo(() => {
  // useEffect(() => {
  //   // 유저가 로그인한 상태일 때
  //   if (user) {
  //     const { _id: userId } = JSON.parse(user);

  //     const fetcher = function (on_or_off: string) {
  //       fetch(`${backendUrl}/users/web/${on_or_off}`, {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ userId }),
  //       });
  //     };

  //     // offline
  //     window.addEventListener("unload", () => {
  //       fetcher("close");
  //     });

  //     // online
  //     window.addEventListener("load", () => {
  //       fetcher("open");
  //     });
  //   }
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path={["/board", "/board/search"]}>
          <Header />
          <Board />
        </Route>
        <Route exact path={["/board/write", "/board/article/update"]}>
          <Header />
          <Write />
        </Route>
        <Route exact path="/board/article">
          <Header />
          <Post />
        </Route>
        <Route exact path="/login/success" component={LoginSuccess} />
      </Switch>
    </Router>
  );
});

export default App;
