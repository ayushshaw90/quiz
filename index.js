const express = require('express');
const path=require('path')
let question = require(path.join(__dirname,'questions.js'))
const res = require('express/lib/response');
let answers = ['d', 'b', 'c', 'a', 'd', 'b', 'c', 'd', 'b', 'b', 'b', 'b', 'c', 'a', 'c']
const app = express()
app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'welcome.html'))
})
app.get('/quiz',(req, res)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})
app.get('/end', (req,res)=>{
    res.sendFile(path.join(__dirname,'end.html'))
})
app.post('/question/:qid', (req, res) => {
    try {
        let id = parseInt(req.params.qid)
        if (id < 0 || id >= answers.length) {
            res.status(404).send(JSON.stringify({ "evaluation": "undefined" }));
            res.end();
        } else {
            let json = req.body
            // console.log(json)
            if (json.answer == answers[id]) {
                res.send(JSON.stringify({ "evaluation": "correct" }));
                res.end()
            } else {
                res.send(JSON.stringify({ "evaluation": "incorrect" }));
                res.end();
            }
        }
    } catch (error) {
        res.send(JSON.stringify({ "evaluation": "undefined" }), 404);
        res.end();
    }
})
app.get('/getQ/:qid', (req, res)=>{
    try{
        let id=parseInt(req.params.qid)
        if(id<0 || id>=answers.length){
            res.status(404).send(JSON.stringify({"question": "unavailable"}))
            res.end()
        }else{
            res.send(JSON.stringify(question[id]))
            res.end();
        }
    }catch(err){
        res.status(403).send(JSON.stringify({"question": "unavailable"}))
        res.end()
    }
})
app.all("*",(req, res)=>{
    res.status(404).send(JSON.stringify({"evaluation": "undefined"}))
    res.end()
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('App running in port 8080')
})