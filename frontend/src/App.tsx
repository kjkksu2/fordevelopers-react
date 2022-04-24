import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import LoginSuccess from "./components/auth/LoginSuccess";
import Home from "./routes/Home";
import Enrollment from "./components/common/Enrollment";
import Lists from "./routes/Lists";

function App() {
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
        <Route exact path={["/board", "/board/:id([0-9a-f]{24})"]}>
          <Header />
          <Lists />
        </Route>
        <Route exact path="/devs/enrollment">
          <Header />
          <Enrollment />
        </Route>
        <Route exact path="/login/success" component={LoginSuccess} />
      </Switch>
    </Router>
  );
}

export default App;
