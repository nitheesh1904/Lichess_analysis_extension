async function check(gameId){
  const response=await fetch(`https://lichess.org/game/export/${gameId}?moves=true&pgnInJson=false&tags=true&clocks=true&evals=true&accuracy=true`,{
  method:"GET",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
});
const data = await response.json();
console.log(data);
if(data.players.white.analysis===undefined){
  c=0;
}
}

async function popup(gameId){
  await analysis_check(gameId).then(()=>{
    const popupHTML = `
    <div id="custom-popup">
        <div id="popup-content">
            <div class="player-section">
                <h2>White</h2>
                <h3>Accuracy</h3>
                <p style="font-size: 18px; color: black;"><span>${accuracy_white}</span></p>
                <h3>Blunder</h3>
                <p style="font-size: 18px; color: black;">${blunder_white}</p>
                <h3>Inaccuracy</h3>
                <p style="font-size: 18px; color: black;">${inaccuracy_white}</p>
                <h3>Mistake</h3>
                <p style="font-size: 18px; color: black;">${mistake_white}</p>
            </div>
            <div class="player-section">
                <h2>Black</h2>
                <h3>Accuracy</h3>
                <p style="font-size: 18px; color: black;"><span>${accuracy_black}</span></p>
                <h3>Blunder</h3>
                <p style="font-size: 18px; color: black;">${blunder_black}</p>
                <h3>Inaccuracy</h3>
                <p style="font-size: 18px; color: black;">${inaccuracy_black}</p>
                <h3>Mistake</h3>
                <p style="font-size: 18px; color: black;">${mistake_black}</p>
            </div>
        </div>
        <button id="close-dialog">Close</button>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', popupHTML);
  

  const popupCSS = `
          #custom-popup {
              position: fixed;
              width: 300px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: #D7D7D7;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              z-index: 9999;
          }
          #popup-content {
              display: flex;
              justify-content: space-between; /* Adjust alignment as needed */
              text-align: center;
          }
          .player-section {
              flex: 1;
              padding: 0 10px;
          }
          h2 {
              font-size: 18px;
              color: black;
              font-weight:bold;
          }
          h3 {
              font-size: 12px;
              color: black;
          }
          p {
              font-size: 10px;
              color: black;
          }

          #close-dialog {
              position:fixed;
              top: 85%;
              left: 40%;
              cursor: pointer;
              padding:5px 20px;
              width: 60px;
              height: 30px;
          }
          #bg-white{
            position:fixed;
            color :red'
          }
          #close-dialog {
            position: fixed;
            top: 85%;
            left: 40%;
            cursor: pointer;
            padding: 5px 20px;
            width: 60px;
            height: 30px;
            background-color: #FF3535; /* Change the background color to red */
            color: white; /* Change the text color to white */
            border: none; /* Remove the button border */
            border-radius: 5px; /* Optional: Add border-radius for rounded corners */
        }
        
      `;
  const style = document.createElement('style');
  style.textContent = popupCSS;
  document.head.appendChild(style);
  

  document.getElementById('close-dialog').addEventListener('click', function() {
      document.getElementById('custom-popup').remove();
  });});
}

function createbutton(rControlsDiv,analysisBoardLink){
  const href = analysisBoardLink.getAttribute('href');
  const urlPieces = href.split('/');
  const gameId = urlPieces[1];
  console.log(href);  
  const myButtonContainer = document.createElement('div');
  myButtonContainer.classList.add('computer-analysis', 'active'); 
  const actionUrl = `/${gameId}/request-analysis`; 

  const myForm = document.createElement('form');
  myForm.method = 'post';
  myForm.classList.add('future-game-analysis');

  const myButton = document.createElement('button');
  myButton.type = 'submit';
  myButton.classList.add('button', 'text');
  myButton.href='lichess.org'+href;

  const mySpan = document.createElement('span');
  mySpan.classList.add('is3', 'text');
  mySpan.innerText = 'Accuracy';
  myForm.action = actionUrl;  


  myButton.appendChild(mySpan);
  myForm.appendChild(myButton);
  myButtonContainer.appendChild(myForm);

  rControlsDiv.appendChild(myButtonContainer);
  return myButtonContainer;
}
var inaccuracy_white=0;
var inaccuracy_black=0;
var accuracy_white=0;
var accuracy_black=0;
var mistake_white=0;
var mistake_black=0;
var blunder_white=0;
var blunder_black=0;
var c=1;

async function analysis_check(gameId){
  while(true){
  const response=await fetch(`https://lichess.org/game/export/${gameId}?moves=true&pgnInJson=false&tags=true&clocks=true&evals=true&accuracy=true`,{
  method:"GET",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
});
const data = await response.json();
 console.log(data);
if(data.players.white.analysis!==undefined)
  { accuracy_white=data.players.white.analysis.accuracy;
    blunder_white=data.players.white.analysis.blunder;
    mistake_white=data.players.white.analysis.mistake;
    inaccuracy_white=data.players.white.analysis.inaccuracy;
    accuracy_black=data.players.black.analysis.accuracy;
    blunder_black=data.players.black.analysis.blunder;
    mistake_black=data.players.black.analysis.mistake;
    inaccuracy_black=data.players.black.analysis.inaccuracy;
    console.log(data.players.white.analysis);
    break;

}
else{
  await new Promise(resolve => setTimeout(resolve, 10000));
}
  }
}
async function addButtonToRControls() {
  const rControlsDiv = document.querySelector('.rcontrols');
  const analysisBoardLink = document.querySelector('.rcontrols a.fbt[href*="/black#"],.rcontrols a.fbt[href*="/white#"]'); 
  const href = analysisBoardLink.getAttribute('href');
  const urlPieces = href.split('/');
  const gameId = urlPieces[1]; 
  
  if (rControlsDiv) {
    const button=createbutton(rControlsDiv,analysisBoardLink);
    await check(gameId);
    if(c===1){
    button.addEventListener("click",function(event){
      event.preventDefault();
      popup(gameId);
    }); 
    }
    else{
      button.addEventListener("click",function(event){
        popup(gameId);

      })
    }
  }
}
addButtonToRControls(); 