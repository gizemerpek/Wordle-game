var height=6;
var width=5;

var row=0;
var col=0;

var gameover=false;

var wordlist=["radyo","sehpa","dolap","kalem","kavun","kopek","merak","gazap","roman","ceviz","gizem"]
var guesslist=["aahed","aali","aargh","aarti","abaca","abaci","abacs","abaft","abaka","abamp"];
guesslist=guesslist.concat(wordlist);


var word=wordlist[Math.floor(Math.random()*wordlist.length)].toUpperCase();
console.log(word);

window.onload=function(){
    initialize();
}

function initialize(){
    for(r=0;r<height;r++){
        for(let c=0;c<width;c++){
            let tile=document.createElement("span");
            tile.id=r.toString()+"-"+c.toString();
            tile.classList.add("tile");
            tile.innerText="";
            document.getElementById("board").appendChild(tile);
       
        }
    }
   

   let keyboard=[
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
   ]
   for(let i=0; i<keyboard.length;i++){
    let currRow=keyboard[i];
    let keyboardRow=document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for(let j=0;j<currRow.length;j++){
        let keyTile=document.createElement("div");
        let key= currRow[j];
        keyTile.innerText=key;
        if(key=="Enter"){
           keyTile.id="Enter";
        }
        
        else if(key=="⌫"){
            keyTile.id="Backspace";
        }
        else if("A"<= key && key<= "Z"){
            keyTile.id="Key"+ key;
        }
        keyTile.addEventListener("click",processKey);

        if(key== "Enter"){
            keyTile.classList.add("enter-key-tile");
        }
        else{
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
     }
     document.body.appendChild(keyboardRow);
   }





    document.addEventListener("keyup",(e)=> {
        processInput(e);
    })
}
function processKey(){
    let e={"code" : this.id};
    processInput(e);
}



function processInput (e){
if(gameover) return;
if("KeyA" <=e.code && e.code<="KeyZ"){
if(col<width){
    let currTile=document.getElementById(row.toString()+'-'+col.toString());
    if(currTile.innerText==""){
        currTile.innerText=e.code[3];
        col+=1;
    }
    
  }
}
else if(e.code=="Backspace"){
if(0<col && col<=width){
    col-=1;
}
let currTile=document.getElementById(row.toString()+'-'+col.toString());
currTile.innerText="";
}else if(e.code=="Enter"){
  update();
}

if(!gameover && row==height){
gameover=true;
document.getElementById("answer").innerText=" GAME OVER, you lost";

}

}
function update(){

    let guess="";
    document.getElementById("answer").innerText="";

    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+"-"+c.toString());
        let letter=currTile.innerText;
        guess+=letter;
    }

      guess= guess.toLowerCase();
      if(!guesslist.includes(guess)) {
        document.getElementById("answer").innerText="not in the word list";
        return;
      }




    let correct=0;
    let lettercount={};
    for(let i=0;i<word.length;i++){
        letter=word[i];
        if(lettercount[letter]){
            lettercount[letter]+=1;
        }
        else{
            lettercount[letter]=1;
        }
    }
    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;

        if(word[c]==letter) {
            currTile.classList.add("correct");

            let keyTile=document.getElementById("Key"+letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
           
            correct+=1;
            lettercount[letter]-=1;
        }
      
        if(correct==width){
            gameover=true;
            document.getElementById("answer").innerText="YOU WİN";
        }
    }
    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;

        if(!currTile.classList.contains("correct")){
            if(word.includes(letter) && lettercount[letter] >0){
                currTile.classList.add("present");
                let keyTile=document.getElementById("Key"+letter);
                if(!keyTile.classList.contains("correct")){
                    keyTile.classList.add("present");
                }
                lettercount[letter]-=1;
            }
            else{
                currTile.classList.add("absent");
            }
        }
       
    }
    row +=1;
    col=0;

}