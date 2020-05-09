function throwSphere(){

}
function summon(creature){
    var img = document.createElement("img")
    img.src = "Animations/LionLike.gif"
    img.style.height = creature.size + "%"
    img.style.opacity = creature.opacity
    var left = Math.floor(Math.random() * 20) + 40 
    img.style.left = left + "%"
    var direction = Math.floor(Math.random() * 10) < 5 ? 180: 0
    img.style.transform = "rotateY("+direction+"deg)"
    game.appendChild(img)   
    setTimeout(walk,1000)
    function walk(){
        if(creature.duration > 0){
            rest = Math.floor(Math.random()*10) < 7 ? 0.5 : (-0.5)
            left += rest
            img.style.left = left + "%"
            Math.floor(Math.random() * 10) < 3 ? rotate(180) : rotate(0)
            function rotate(deg){
                deg += direction
                img.style.transform = "rotateY("+deg+"deg)"
            }
            function nothing(){}
            creature.duration--
            setTimeout(walk,1000)
        }
        else{
            game.removeChild(img)
        }
    }
}
var player = document.getElementById("player")
var rival = document.getElementById("rival")
var game = document.getElementById("game")
var cover = document.getElementById("cover")
var menu = document.getElementById("menu")
var main = document.getElementsByClassName("main")[0]
var codes = document.getElementsByClassName("code")
var cards = document.getElementsByClassName("card")
var audioButton = document.getElementById("audio_button")
audioButton.addEventListener("click",pause)
var backgroundMusic = document.getElementsByTagName("audio")[0]
backgroundMusic.volume = 0.4
document.getElementById("start").addEventListener("click",enterGame)
document.getElementsByTagName("form")[0].addEventListener("change",startGame)
document.getElementById("cast").addEventListener("click",code)
game.addEventListener("click",zoom)
function startGame(){
    event.preventDefault()
    if(event.target.id == "male"){
        player.src = "Assets/SideKushal.png"
        rival.src = "Assets/SideMagnate.png"
        player.style.left = "40%"
        rival.style.left = "50%"        
        playGame()
    }
    else if(event.target.id == "female"){
        rival.src = "Assets/SideKushal.png"
        player.src = "Assets/SideMagnate.png"
        player.style.left = "50%"
        rival.style.left = "40%"        
        playGame()
    }
    function playGame(){
        menu.classList.toggle("translate_right")
        backgroundMusic.src = "Mp3/Caketown.mp3"
        backgroundMusic.autoplay = true
        var txtArray = []
        var txt = "Hi Kushal! \nI saw your efforts to get in here.\nI hope you are getting a good time by our side."+
        "\nWe already know you came for magic and you show us a kind heart and love for animals so.."
        txtArray.push(txt)
        var imgSrc = "Assets/FaceMagnate.png"
        var txtDiv = dialog(txt, imgSrc)
        txt = "As you are interest in learn magic i'll be to teach you. \nI made a connection with a very powerful source of energy."+
        "\nI'll share you my faculties so you would only need to know how I cast the spells i already created."
        txtArray.push(txt)
        txt = "To cast spells what you'll do is like create a copy of my spell. \nSo i give you my 'happyHit', to cast this"+
        " you create the object like 'let happyHit = {}'\nThat object would have properties with own values like 'let happyHit"+
        " = {speed:9}"
        txtArray.push(txt) 
        txt = "To zoom the image you just need to click the background image.\nTo cast a spell click the button 'cast code'.\n"+
        "It would show you a black screen were you would (write)make the objects."
        txtArray.push(txt)
        txt = "So i gave you the spell to  summon one of my creations, it doesn't do much yet but is a beauty.\nSo press the button 'cast code',"+
        "change each property value and to cast the spell you would use 'summon(lionLike)'.\nThen press the button again"
        txtArray.push(txt)
        txt ="To change properties use the name of the object a dot and name of the property.\nPlease do not exagerate with the values."+
        "\nI am not pretty powerful yet so the spell could kill your browser.\nGood luck!"
        txtArray.push(txt)
        var i = 0       
        setTimeout(replace, 10000)
        function replace(){
            game.removeChild(txtDiv)
            txtDiv = dialog(txtArray[i], imgSrc)
            i++
            if(i <= txtArray.length){
                setTimeout(replace,12000)
            }
            else{
                game.removeChild(txtDiv)                
                txt = "let lionLike = {\n size:50\n opacity:0.5\nsecondsDuration:10\n}\nlionLike.size = 60\nsummon(lionLike)"
                codes[0].setAttribute("placeholder",txt)
            }
        }
    }
}
function dialog(txt, imgSrc){
    var div = document.createElement("div")
    var text = document.createElement("pre")
    var img = document.createElement("img")
    div.className = "spell"
    div.classList.add("black_background")
    div.style.right = "1%"
    div.style.zIndex = 2
    div.style.height = "100px"
    text.textContent = txt
    text.style.position = "absolute"
    text.style.left = "5%"
    text.style.right = "15%"
    text.style.top = "5%"
    img.src = imgSrc
    img.style.width = "10%"
    img.style.position = "absolute"
    img.style.left = "85%"
    div.appendChild(text)
    div.appendChild(img)
    game.appendChild(div)
    return div
}
function enterGame(){
    cover.classList.toggle("translate_top")
    backgroundMusic.play()
}
function zoom(){
    var scale = Number(game.style.width.substring(0,3)) + 300
    if(scale > 400) scale = 100
    game.style.width = scale + "%"
    game.style.height = scale + "%"
    var height = game.clientHeight
    var width = game.clientWidth
    window.scrollTo(width/2.8, height/1.5)
}
function code(){
    codes[0].classList.toggle("rotate")
    cards[0].classList.toggle("rotate")
    if(!cards[0].classList.contains("rotate")){
        var codeText = codes[0].value
        try{eval(codeText)}catch(error){alert("hey, thats wrong!")}
    } 
}
function pause(){
    backgroundMusic.pause()
    audioButton.removeEventListener("click",pause)
    audioButton.addEventListener("click",play)
}
function play(){
    backgroundMusic.play()
    audioButton.removeEventListener("click",play)
    audioButton.addEventListener("click",pause)
}