/* jshint esversion: 6 */

/*GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Global variables
var scores, roundScore, activePlayer, isActive;
var twoSix;

// Game Sounds effects
playSoundClick = function() {
    let audio = new Audio('click.wav');
    audio.loop = false;
    audio.play();
};

playSoundHold = function() {
    let audio = new Audio('hold.wav');
    audio.loop = false;
    audio.play();
};

playSoundWin = function() {
    let audio = new Audio('winner.wav');
    audio.loop = false;
    audio.play();
};

playSoundNew = function() {
    let audio = new Audio('new.wav');
    audio.loop = false;
    audio.play();
};

// Call of starting the Game
init();

// Roll button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isActive) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            playSoundClick();
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            nextPlayer();
        }
    }
});

// Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isActive) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];

        //
        if (scores[activePlayer] >= 100) {
            roundScore = 0;
            document.getElementById('name-' + activePlayer).innerHTML = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playSoundWin();
            isActive = false;
        } else {
            playSoundHold();
            nextPlayer();
        }
    }
});

// Initialize a new game
document.querySelector('.btn-new').addEventListener('click', init);

// Switch players
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Start the game
function init() {

    playSoundNew();
    // Initialization counters
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    twoSix = 0;
    isActive = true;

    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

    // Reset all scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Reset players names
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';

    // Reset format
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}