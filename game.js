import Pokemon from './pokemon.js';
import {random, generateLog, renderLog, controlClicks} from './utils.js';
import {pokemons} from './pokemons.js';

class Selectors {
    constructor(selectors){
        this.elLogContainer = document.querySelector(this.buildClassName(selectors.logContainer));
        this.elPlayer1Info = document.querySelector(this.buildClassName(selectors.player1));
        this.elPlayer2Info = document.querySelector(this.buildClassName(selectors.player2));
        this.elControl = document.querySelector(this.buildClassName(selectors.control));

        this.logContainerClassName = selectors.logContainer;
        this.player1ClassName = selectors.player1;
        this.player2ClassName = selectors.player2;
        this.controlClassName = selectors.control;
    }

    buildClassName = (selector) => {
        let result = '';

        let splittedString = selector.split(' ');
        splittedString.forEach(element => {
            result += `.${element}`;
        });
        return result;
    }
}
class Game extends Selectors {
    constructor (selectors, initializeFight) {
        super(selectors);
        //this.player1 = player1;
        //this.player2 = player2;
        this.initializeFight = initializeFight;

        this.initBattleField();
    }

    initBattleField = () => {
        /**
         * Show button start game
         * 
         */
        this.clearBattleField();

        this.handleAddStartButton();
    }

    startGame = () => {
        /**
         * Clear buttons from .control div
         * Choose characters and start fight
         * 
         */
        this.clearBattleField();

        this.elLogContainer.classList.add('show');
        this.elPlayer1Info.classList.add('show');
        this.elPlayer2Info.classList.add('show');

        this.initializeFight(false, true);
    }
    
    clearBattleField = () => {
        this.handleHidePlayers();
        this.handleClearButtons();
        this.handleClearLog();
    }

    showLooseResults = () => {
        this.handleClearButtons();
        this.handleAddStartButton();
    }

    handleClearButtons = () => {
        let allButtons = this.elControl.children;
        
        for (let i = allButtons.length-1; i >= 0; i--) {
            allButtons[i].remove();
        };
    }

    handleClearLog = () => {
        const $logElement = document.querySelector(`${this.buildClassName(this.logContainerClassName)} div div`);

        while ($logElement.nextSibling) {
            $logElement.nextSibling.remove();
        }
    }

    handleHidePlayers = () => {
        this.elLogContainer.className = this.logContainerClassName;
        this.elPlayer1Info.className = this.player1ClassName;
        this.elPlayer2Info.className = this.player2ClassName;
    }

    handleAddStartButton = () => {
        const $btn = document.createElement('button');
        $btn.innerText = 'START GAME';
        $btn.classList.add('button');

        $btn.addEventListener('click', () => {
            this.startGame();
        });

        this.elControl.appendChild($btn);
    }




}

export default Game;