const express = require("express");

const server = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Godsheritage Adeoye",
  },
  {
    id: 1,
    name: "Crownfit Adeoye",
  },
  {
    id: 2,
    name: "Mojola Adeoye",
  },
];

server.get("/", (req, res) => {
  res.send("awfa my guy, how you dey");
});

//to create friend route

server.get("/friends", (req, res) => {
  res.send(friends);
});

// for parameterized routing with error handling

server.get("/friends/:id", (req, res) => {
  const id = +req.params.id;
  const friend = friends[id];

  if (friend) {
    res.send(friend);
  } else {
    res.status(404).json({
      error: "not found",
    });
  }
});

server.listen(PORT, () => {
  console.log("Express server is running ...");
});
