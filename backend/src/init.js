import app from "./app";
import "./db";

const PORT = 4000;

app.listen(PORT, () => console.log(`✅ Listening on port ${PORT}`));
