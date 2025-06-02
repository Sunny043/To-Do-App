const express = require('express')
const bodyParse = require('body-parser')
const mongoose=require('mongoose')
const port = 3000;
var app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParse.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/todolistDB');
const trySchema = new mongoose.Schema({
    name: String,
});
const Item = mongoose.model('Task', trySchema);
const todo = new Item({
    name: "Welcome to your todo list"
});

app.get('/', function(_,res){
        Item.find({})
        .then(foundItems => {
            res.render('list',{ejes:foundItems});
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong.!!");
        });
});
app.post('/', async function(req, res){
    const ItemName = req.body.ele1;
    const todo = new Item({
        name: ItemName
    });
    todo.save();
    res.redirect('/');
});

app.post('/delete', async function(req, res){
    const checked = req.body.checkbox1;
    try{
        await Item.findByIdAndDelete(checked);
        res.redirect('/');
    }catch(err){
        console.error("Error deleting item:", err); 
        res.status(500).send("Error deleting item.");
    }
});

app.listen(port, function(){
    console.log(`Server is running on port http://localhost:${port}`);
});