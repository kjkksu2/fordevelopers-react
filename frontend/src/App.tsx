import React, { useState } from "react";

function App() {
  const [name, setName] = useState<string>("");

  function onChange(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setName(value);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("http://localhost:4000/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((json) => alert(json));
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={name} onChange={onChange} />
      <input type="submit" value="submit" />
    </form>
  );
}

export default App;
