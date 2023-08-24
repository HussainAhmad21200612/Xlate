

function s(){
    var txt = document.getElementById("text").value;
    var optn=document.getElementById("optn").value;
    var tex2=document.getElementById("text2");
    fetch("/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "txt":txt,
            "lng":optn
        })
    }).then(async(res)=>{
        const tex2=document.getElementById("text2");
        res.json().then((data)=>{
            console.log("data send")
            tex2.value=data.c;
            
        })
        

    });
    tex2.value="Loading..."
}
const btn=document.getElementById("btn");
btn.addEventListener("click",s);

