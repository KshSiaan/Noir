const socket = io("http://localhost:3000");

socket.on("hello", (data) => {
  document.body.innerHTML = data;

  socket.emit("Nana", "Ayoo.. wtf did u say to me?");
});

function sendText() {
  const inpField = document.getElementById("inputField");
  console.log(inpField.value);

  socket.emit("textService", inpField.value);
}

socket.on("connect", () => {
  console.log("Connected to the Server");
});

socket.emit("wtv", "This is data #1");

socket.on("connect", () => {
  socket.on("textService", (data) => {
    console.log("Got the data back from server :" + data);
  });
});
socket.on("serve", (data) => {
  console.log("Got the data back from server :" + data);

  document.querySelector(".messagePlace").innerHTML +=
    `<p> ` + data + ` </p> <br/><br/>`;
});
