// Dev
export function getPostLists() {
  return fetch("http://localhost:4000/menus/devs/board", {
    credentials: "include",
  }).then(async (response) => ({
    status: response.status,
    postLists: (await response.json()) || null,
  }));
}
