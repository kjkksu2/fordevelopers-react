// LoginSuccess
export function getUserData() {
  return fetch("http://localhost:4000/users/auth", {
    credentials: "include",
  }).then((response) => response.json()); // return Promise
}
