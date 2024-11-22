const {callTagger} = require("./tagging-jobs.js")
const {callTransfiguration} = require("./transfiguration-jobs.js")
const {callChatbot} = require("./call-chatbot.js")

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json()); 

app.post('/tags', async (req, res) => {
    console.log("tags request recieved")
    const prompt = req.body.prompt;
    console.log(req.body)
    console.log("calling tagger model")
    const tags = await callTagger(prompt)
    //SEND DATA
    res.json(tags)
});


app.post('/transfiguration', async (req, res) => {
    console.log("transfiguration request recieved")
    const prompt = req.body.prompt;
    const known_tag = req.body.known_tag;
    console.log(req.body)
    console.log(req.known_tag)
    console.log("calling transfiguration model")
    const resp = await callTransfiguration(prompt,known_tag)
    //SEND DATA
    res.send(resp)
});

app.post('/callChatbot', async (req, res) => {
    console.log("transfiguration request recieved")
    const prompt = req.body.prompt;
    console.log("calling transfiguration model")
    const resp = await callChatbot(prompt)
    //SEND DATA
    res.send(resp)
});


const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});