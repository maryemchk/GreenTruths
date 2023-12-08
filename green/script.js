gsap.registerPlugin(ScrollTrigger)

gsap.from('.logo div',{
    opacity:0,
    delay:1,
    x:20
} )

const menu_items = document.querySelector('.menu-items')
gsap.from(menu_items.children ,{
    opacity:0,
    x:0,
    duration:1,
    delay:1.5,
    stagger:{
        amount:1
    }
})


gsap.utils.toArray('.star').forEach(star=>{
    gsap.fromTo(star,{
        rotation:450,
        opacity:0,
        y:100
    },{
        rotation:0,
        opacity:1,
        y:0,
        duration:1,
        delay:1.5,
        scrollTrigger:star
    })
})


gsap.utils.toArray('.title').forEach(title=>{
    gsap.fromTo(title,{
        letterSpacing:'10px',
        opacity:0,
        x:300,
        skewX:65
    },{
        letterSpacing:'0',
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:title
    })
})

gsap.utils.toArray('p').forEach(p=>{
    gsap.fromTo(p,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:p

    })
})


gsap.utils.toArray('button').forEach(button=>{
    gsap.fromTo(button,{
        opacity:0,
    },{
        opacity:1,
        duration:1,
        delay:1,
        scrollTrigger:button

    })
})


gsap.from('.pyramid' ,{
    opacity:0,
    scale:.5,
    duration:1,
    delay:.5
})

gsap.fromTo('.hand',{
    scale:.2,
    opacity:0,
    skewY:30
},{
    scale:1,
    opacity:1,
    skewY:0,
    duration:1,
    delay:.5,
    scrollTrigger:'.hand'
})



gsap.utils.toArray('.line').forEach(line=>{
    gsap.fromTo(line,{
        opacity:0,
        width:'0%'
    },{
        opacity:1,
        width:'100%',
        duration:1,
        delay:1,
        scrollTrigger:line

    })
})


gsap.utils.toArray('.rotation').forEach(rotate=>{
    gsap.fromTo(rotate,{
        opacity:0,
        rotation:350,
        scale:.2
    },{
        opacity:1,
        rotation:0,
        scale:1,
        duration:1,
        delay:1,
        scrollTrigger:rotate

    })
})


gsap.fromTo('.card' ,{
    opacity:0,
    scale:.1,
},{
    opacity:1,
    scale:1,
    duration:1,
    delay:.5,
    stagger:{
        amount:1
    },
    scrollTrigger:'.card'
})

const menu = document.querySelector('.menu')


gsap.from(menu.children,{
    opacity:0,
    x:50,
    duration:1,
    delay:.5,
    stagger:{
        amount:1
    },
    scrollTrigger:{
        trigger:menu.children
    }
})


/**************** */
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
//////const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;
const responses = {
    "yes, i have": "Great!Do you want to know more about this subject? \n choose one of these options :\n yes, please\n no,thank you ",
    "yes, please": "Climate change refers to significant and lasting changes in global weather patterns and temperatures over an extended period, often resulting in alterations to ecosystems, weather events, and sea levels \n do you know that you are contributing to pollute your mother earth? \n Choose \yes,but can you explain more\n no,how ",
    "yes, but can you explain more,": "Now, picture those plastic bags and bottles we toss without a second thought. Add a sprinkle of excessive paper usage and a dash of leaving lights on. Oh, and the grand finale – fast fashion frenzy! We've got a planet-polluting masterpiece. \nworry not! Stick around, and I'll share some cool tips to turn this eco- into an Earth-loving blockbuster. Ready for the green adventure? ",
    "of course": "Ready to be an eco-hero?\nSwap disposable coffee cups for a reusable mug, ditch plastic with a reusable shopping bag and bottle, go digital to save trees, power down to cut energy waste, and opt for quality over quantity in your wardrobe.!\nSmall changes, big impact! You're the superhero Earth needs. Let's go green!",
    "no,how?": "Now, picture those plastic bags and bottles we toss without a second thought. Add a sprinkle of excessive paper usage and a dash of leaving lights on. Oh, and the grand finale – fast fashion frenzy! We've got a planet-polluting masterpiece. \nworry not! Stick around, and I'll share some cool tips to turn this eco- into an Earth-loving blockbuster. Ready for the green adventure? ",
    "of course": "Ready to be an eco-hero?\nSwap disposable coffee cups for a reusable mug, ditch plastic with a reusable shopping bag and bottle, go digital to save trees, power down to cut energy waste, and opt for quality over quantity in your wardrobe.!\nSmall changes, big impact! You're the superhero Earth needs. Let's go green!",
    "no,thank you":"No problem, But never forget to be friendly with you mother earth  ",
    "no,i don't  have": "No Problem \n Climate change refers to significant and lasting changes in global weather patterns and temperatures over an extended period, often resulting in alterations to ecosystems, weather events, and sea levels \n do you know that you are contributing to pollute your mother earth? \n Choose \nyes,but can you explain more\n no,how"
    
    // Add more user questions and responses as needed
};
const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    const answer = responses[message] || "I'm sorry, I didn't understand that.";

    // Display user message in chat
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Display "Thinking..." message
    const thinkingMessage = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(thinkingMessage);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Simulate bot response after a slight delay
    setTimeout(() => {
        // Remove "Thinking..." message
        chatbox.removeChild(thinkingMessage);

        // Display bot's response
        const botResponse = createChatLi(answer, "incoming");
        chatbox.appendChild(botResponse);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 1000); // Adjust the delay time as needed (in milliseconds)
};


const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(userMessage); // Pass the userMessage, not the chat element
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));