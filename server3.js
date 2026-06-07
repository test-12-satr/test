const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

const BOT_TOKEN =
process.env.BOT_TOKEN;

const CHAT_ID =
process.env.CHAT_ID;

app.post("/submit", async(req,res)=>{

try{

const {name, place, age} =
req.body;

if(
!name ||
!place ||
!age
){

return res.status(400).json({
success:false
});

}

const message =

`New Customer Form

Name: ${name}

Place: ${place}

Age: ${age}`;

await axios.post(

`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,

{

chat_id: CHAT_ID,

text: message

}

);

res.json({

success:true

});

}catch(error){

console.log(error.message);

res.status(500).json({

success:false

});

}

});

app.get("/",(req,res)=>{

res.send("Backend Running");

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, ()=>{

console.log(
`Running on ${PORT}`
);

});
