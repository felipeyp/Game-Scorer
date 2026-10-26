const matchKEY = 'matchInfo';                       // the key the whole match is saved under
const btnAplus = document.getElementById("btnAplus");
const btnAminus = document.getElementById("btnAminus");
const btnBplus = document.getElementById("btnBplus");
const btnBminus = document.getElementById("btnBminus");

let match = {                                       // let, so loadScore can replace the whole object
    teamA:{player1:{name:"Fe", rank:"D"}, player2:{name:"Ana", rank:"D"},score:0},
    teamB:{player1:{name:"Joao", rank:"D"}, player2:{name:"Maria", rank:"D"}, score:0}
};


// localStorage.setItem("match", JSON.stringify(match));
// console.log(JSON.parse(localStorage.getItem("match")));

function loadScore(){
    try{
      const savedRefresh = localStorage.getItem(matchKEY);  // read the saved string, or null
      if(savedRefresh !== null){                            // only replace match if something was saved
        match = JSON.parse(savedRefresh);                   // turn the string back into the match object
      }
    }catch(err){
      return 'error'                                        // match keeps its starting values
    }  
}


function showScore(){
    document.querySelector('#scoreA').textContent = match.teamA.score;
    document.querySelector('#scoreB').textContent = match.teamB.score;
}

function addScore(team){
   let scoreTeam = '';
   if(team === 'teamA') {scoreTeam = '#scoreA'}
   else if (team === 'teamB') {scoreTeam = '#scoreB'}
   else return 'team invalid'
   match[team].score += 1;                      // write it back into match
   localStorage.setItem(matchKEY, JSON.stringify(match));   // save the whole object
   document.querySelector(scoreTeam).textContent = match[team].score; // show the new score
}

function deductScore(team){
   let scoreTeam = '';
   if(team === 'teamA') {scoreTeam = '#scoreA'}
   else if (team === 'teamB') {scoreTeam = '#scoreB'}
   else return 'team invalid'
   if(match[team].score > 0){match[team].score -= 1}
   localStorage.setItem(matchKEY, JSON.stringify(match));
   document.querySelector(scoreTeam).textContent = match[team].score;
}


loadScore();
showScore();

btnAplus.addEventListener("click", () => addScore('teamA'));
btnAminus.addEventListener('click', () => deductScore('teamA'));
btnBplus.addEventListener("click", () => addScore('teamB'));
btnBminus.addEventListener('click', () => deductScore('teamB'));
