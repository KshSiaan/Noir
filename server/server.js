const express = require("express");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { chatData, updateData } = require("./data/chatData");

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(
  cors({
    origin: ["https://noir-eud9.onrender.com", "http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Parse extended types

const expServer = app.listen(process.env.PORT, () => {
  console.log("connected to the server");
});

const io = socketio(expServer, {
  cors: ["https://noir-fgru.onrender.com"],
});

app.get("/", (req, res) => {
  res.end();
});
app.post("/", (req, res) => {
  console.log("Request received");
  console.log(req.body);

  try {
    // Perform access check using a secure authentication method (replace with your implementation)
    const isAuthorized = checkAccess(req.body.username, req.body.password);

    if (isAuthorized) {
      res.status(200).json({
        message: "Access granted",
      });
    } else {
      res.status(401).json({
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

io.on("connect", (socket) => {
  socket.on("talk", (data) => {
    updateData(data);

    var filtered = filterData(chatData);

    io.emit("serve", filtered);
  });

  socket.on("fresh", () => {
    var filtered = filterData(chatData);

    io.emit("serve", filtered);
  });
});

function checkAccess(un, pass) {
  if (un == "shafayat" && pass == "hunter") {
    return true;
  } else if (un == "guest" && pass == "orangejuice") {
    return true;
  } else {
    return false;
  }
}

function filterData(data) {
  if (data.length < 100) {
    return data;
  } else {
    return data.slice(data.length - 100, data.length);
  }
}
