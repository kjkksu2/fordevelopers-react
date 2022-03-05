// Dev
export function getDevLists() {
  return fetch("http://localhost:4000/menus/devs/board", {
    credentials: "include",
  }).then(async (response) => ({
    status: response.status,
    devLists: (await response.json()) || null,
  }));
}
