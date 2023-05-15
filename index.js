"use strict";
const path = require("path");
const express = require("express");
const app = express();

const { port, host } = require("./config.json");

const Datastorage = require("./sqlStorage/dataStorageLayer");

const storage = new Datastorage();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "pages"));

// app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "menu.html")));

app.get("/computers", (req, res) =>
  storage
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
);

app.get("/all", (req, res) =>
  storage
    .getAll()
    .then((data) => res.render("allComputers", { result: data }))
    .catch((err) => res.json(err))
);

app.get("/computers/:id", express.json(), (req, res) =>
  storage
    .getOne(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
);

app.get("/getone", (req, res) =>
  res.render("form", {
    title: "Computers",
    header: "Input id:",
    action: "/getone",
    fields: [{ name: "Id", size: 5, value: "", readonly: "" }],
  })
);

app.post("/getone", (req, res) =>
  storage
    .getOne(req.body.id)
    .then((data) => res.render("oneComputer", { computer: data }))
    .catch((err) => sendErrorPage(res, err))
);

app.get("/insertform", (req, res) =>
  res.render("form", {
    title: "Computers",
    header: "Fill in the Data",
    action: "/insert",
    fields: [
      { name: "Id", size: 5, value: "", readonly: "" },
      { name: "Name", size: 30, value: "", readonly: "" },
      { name: "Type", size: 10, value: "", readonly: "" },
      { name: "Processor", size: 15, value: "", readonly: "" },
      { name: "Amount", size: 5, value: "", readonly: "" },
      { name: "Imagename", size: 20, value: "", readonly: "" },
    ],
  })
);

app.post("/insert", (req, res) =>
  storage
    .insert(req.body)
    .then((data) => sendStatusPage(res, data))
    .catch((err) => sendErrorPage(res, err))
);

app.get("/updateform", (req, res) =>
  res.render("form", {
    title: "Computers",
    header: "Fill in the Data",
    action: "/update",
    fields: [
      { name: "Id", size: 5, value: "", readonly: "" },
      { name: "Name", size: 30, value: "", readonly: "readonly" },
      { name: "Type", size: 10, value: "", readonly: "readonly" },
      { name: "Processor", size: 15, value: "", readonly: "readonly" },
      { name: "Amount", size: 5, value: "", readonly: "readonly" },
      { name: "Imagename", size: 20, value: "", readonly: "readonly" },
    ],
  })
);

app.post("/update", (req, res) =>
  storage
    .getOne(req.body.id)
    .then((data) =>
      res.render("form", {
        title: "Computers",
        header: "Fill in the Data",
        action: "/updatedata",
        fields: [
          { name: "Id", size: 5, value: data.id, readonly: "readonly" },
          { name: "Name", size: 30, value: data.name, readonly: "" },
          { name: "Type", size: 10, value: data.type, readonly: "" },
          { name: "Processor", size: 15, value: data.processor, readonly: "" },
          { name: "Amount", size: 5, value: data.amount, readonly: "" },
          { name: "Imagename", size: 20, value: data.imagename, readonly: "" },
        ],
      })
    )
    .catch((err) => sendErrorPage(res, err))
);

app.post("/updatedata", (req, res) =>
  storage
    .update(req.body)
    .then((data) => sendStatusPage(res, data))
    .catch((err) => sendErrorPage(res, err))
);

app.get("/removeform", (req, res) =>
  res.render("form", {
    title: "Computers",
    header: "Input id:",
    action: "/remove",
    fields: [{ name: "Id", size: 5, value: "", readonly: "" }],
  })
);

app.post("/remove", (req, res) =>
  storage
    .remove(req.body.id)
    .then((data) => sendStatusPage(res, data))
    .catch((err) => sendErrorPage(res, err))
);

app.listen(port, host, () => console.log(`${host}:${port} serving...`));

function sendErrorPage(res, err) {
  res.render("statuspage", {
    title: "Error",
    header: "Error",
    status: err,
  });
}

function sendStatusPage(res, status, title = "Status", header = "Status") {
  res.render("statuspage", {
    title,
    header,
    status,
  });
}
