import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import{serve} from "inngest/express";
import { inngest ,functions} from "./lib/inngest.js";

const __dirname = path.resolve();
const app = express();



//middleware
app.use(express.json());
//credentials:true meaning server allows a browser to send cookies along with requests
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use("/api/inngest",serve({client:inngest,functions}))






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