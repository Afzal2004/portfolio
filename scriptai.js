const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const welcome = document.querySelector(".welcome");

const suggestions = document.querySelectorAll(".suggestions button");

/* AI */
function reply(msg){
msg = msg.toLowerCase();

if(msg.includes("hello")) return "Hello 👋";
 if(msg.includes("hi")) return "Hi 👋 I'm Afzal AI";
  if(msg.includes("hey")) return "Hey 👋 Afzal here";

  // Bye
  if(msg.includes("bye")) return "Okay bye 👋 Take care!";

  // How are you
  if(msg.includes("how are you")) return "I'm fine 😊 Thank you for asking!";

  // Name related
  if(msg.includes("your name") || msg.includes("who are you")) {
    return "I'm Afzal AI 🤖, your personal assistant built with HTML, CSS & JavaScript.";
  }

  // Knowledge fallback (IMPORTANT)
  if(msg.includes("what is html")) return "HTML is used to structure webpages.";
  if(msg.includes("what is css")) return "CSS is used to style webpages beautifully.";
  if(msg.includes("what is javascript")) return "JavaScript makes websites interactive.";

  // “do you know” style questions
  if(msg.includes("do you know")) {
    return "Yes 😊 I know many things! But not that deep.. Try asking me about HTML, CSS, JavaScript or web development.";
  }

  // Default fallback
 
return "I'm still learning 🤖";
}

/* MESSAGE */
function addMessage(text,type){
const div=document.createElement("div");
div.classList.add("message",type);
div.textContent=text;
chatBox.appendChild(div);
chatBox.scrollTop=chatBox.scrollHeight;
}

/* SEND */
function send(){
const text=userInput.value.trim();
if(!text) return;

welcome.style.display="none";

addMessage(text,"user");
userInput.value="";

setTimeout(()=>{
addMessage(reply(text),"ai");
},500);
}

sendBtn.onclick=send;

userInput.addEventListener("keydown",(e)=>{
if(e.key==="Enter") send();
});

/* SUGGESTIONS */
suggestions.forEach(btn=>{
btn.onclick=()=>{
userInput.value=btn.innerText;
send();
};
});

/* NEW CHAT FIX */
document.querySelector(".new-chat").onclick=()=>{
chatBox.innerHTML="";
welcome.style.display="flex";
};

/* THEME */
document.querySelector(".theme-toggle").onclick=()=>{
document.body.classList.toggle("light");
};

/* PARTICLES */
const particleBox=document.getElementById("particles");

for(let i=0;i<40;i++){
const p=document.createElement("div");
p.classList.add("particle");
p.style.left=Math.random()*100+"vw";
p.style.animationDuration=(5+Math.random()*10)+"s";
particleBox.appendChild(p);
}