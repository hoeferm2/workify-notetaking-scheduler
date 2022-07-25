const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs")

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    fs.readFile("./public/db/notes.json", "utf8", (err, data) => {
        if (err) {
            throw err
        } else {
            const notes = JSON.parse(data)
            res.json(notes)
        }
    })
}
)

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    const newNote = {
        id: req.body.id,
        title: req.body.title,
        text: req.body.text,
    }
    fs.readFile("./public/db/notes.json", "utf8", (err, data) => {
        if (err) {
            throw err
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote)
            fs.writeFile("./public/db/notes.json", JSON.stringify(notes, null, 4), (err, data) => {
                if (err) {
                    throw err;
                }
                res.json({ data: req.body, message: "success!" }

                )
            })
        }
    }
    )
}
)


app.listen(PORT, () => {
    console.log("listenin to port " + PORT);
    console.log(__dirname)
});