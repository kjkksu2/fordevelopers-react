import express from "express";
import cors from "cors";

const app = express();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/name", (req, res) => {
  const { name } = req.body;
  console.log(name);
  return res.json("It works!");
});

app.listen(PORT, () => console.log(`✅ Listening on port ${PORT}`));
