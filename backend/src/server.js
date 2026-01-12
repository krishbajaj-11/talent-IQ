import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import{serve} from "inngest/express";
import { inngest ,functions} from "./lib/inngest.js";
import {clerkMiddleware} from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";

import chatRoutes from "./routes/chatRoutes.js";

const __dirname = path.resolve();
const app = express();



//middleware
app.use(express.json());
//credentials:true meaning server allows a browser to send cookies along with requests
//origin:ENV.CLIENT_URL meaning only requests from this origin are allowed
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(clerkMiddleware()); //this adds req.auth to request objects: req.auth()



app.use("/api/inngest",serve({client:inngest,functions}))//These requests never reach normal routes , They are handled by Inngest background / event functions
app.use("/api/chat",chatRoutes);





app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});







//when you pass an array of middleware functions, they are executed in order

//Static file exists? → serve it
//   ↓
//No match? → index.html (SPA fallback)

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