require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
mongoose.connect(process.env.MONGO_URI)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ images + html serve
app.use(express.static("public"))

// ✅ MongoDB Atlas connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// Schema
const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
})

// API
app.post("/contact", async (req, res) => {
    try {
        await Contact.create(req.body)
        res.json({ message: "Message Saved Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Error saving data" })
    }
})

// Home route (optional)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})