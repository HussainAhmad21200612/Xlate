const express = require('express');
require('dotenv').config();
const {Configuration,OpenAIApi} = require('openai');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY});


const openai = new OpenAIApi(configuration);

async function getAnswer(){
    const gptResponse = await openai.createCompletion({
        model:'text-davinci-003',
        prompt:`
        for(int i=0;i<10;i++){print(i);}
        convert this code to python
            `,

        max_tokens:2048
    });
    console.log(gptResponse.data.choices[0].text);

}
// getAnswer()


app.get('/',(req,res)=>{
    res.render('index',{cnt:""});
});
app.get('/s.js',(req,res)=>{
    res.sendFile(__dirname+'/views/s.js');
});
app.get("/a",(req,res)=>{
    res.json({a:"hello"});
});
app.post('/',(req,res)=>{
    getAnswer3(req.body.txt+" ",req.body.lng).then((data)=>{
        res.json({c:String(data).trim()});
    });
    
    // res.render("index.js",{cnt:gptResponse.data.choices[0].text});
});
async function getAnswer3(code,lang){
try{
    const response = await openai.createChatCompletion({
model: "gpt-3.5-turbo",
messages: [{ role: "user", content: `
${code}
convert this code to ${lang}
` }],
});
return (response["data"]["choices"][0]["message"]["content"]);
}
catch(err){
    console.log(err);
    return "NoInternet";
}

}
app.listen(5000,()=>{
    console.log("server is running on port 5000");
}
);