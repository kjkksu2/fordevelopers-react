import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dev from "./components/pages/Dev";
import Header from "./components/common/Header";
import LoginSuccess from "./components/auth/LoginSuccess";
import Home from "./routes/Home";
import Enrollment from "./components/common/Enrollment";
import { useRecoilValue } from "recoil";
import { corsUrl } from "./recoil/atom";
import { useEffect } from "react";

function App() {
  const backendUrl = useRecoilValue(corsUrl);
  const user = localStorage.getItem("user");

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
        <Route exact path={["/devs", "/devs/:id([0-9a-f]{24})"]}>
          <Header />
          <Dev />
        </Route>
        <Route exact path="/devs/enrollment">
          <Header />
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
