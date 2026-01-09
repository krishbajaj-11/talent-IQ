import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const __dirname = path.resolve();
const app = express();


app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});


if (ENV.NODE_ENV === "production") {


  // Serve static assets
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // SPA fallback (MUST be last)
  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}







const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>{
  console.log("Server is running on port:", ENV.PORT)
  
}
);

  } catch (error) {
    console.error("Failed to start server:", error);
  }
}


startServer();