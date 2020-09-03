import Pokemon from './pokemon.js';
import Game from './game.js';
import {random, generateLog, renderLog, controlClicks} from './utils.js';
import {pokemons} from './pokemons.js';

const gameMetaData = {
    player1: 'pokemon player1',
    player2: 'pokemon player2',
    logContainer: 'playground-log',
    control: 'control',
}

let initialize;
let enemyCount = 0;
let player1;
let player2;

function initializeCharacter (isEnemy, selectors, isNew = false) {
    let pokemonsAmount = pokemons.length;
    let playerPart = pokemons[random(pokemonsAmount - pokemonsAmount, pokemonsAmount - 1)];
    let side = isEnemy ? 'enemy' : '';

    let player = new Pokemon({
        ...playerPart,
        selectors: selectors,
        side: side,
        isNew: isNew,
        showLooseResults: showLooseResults,
        initializeFight: initializeFight,
    });

    return player;
}

function initializeFight (isRefreshEnemy, isRefreshBothPlayers) {
    if (isRefreshEnemy) {
        initialize.handleClearButtons();
        enemyCount += 1;
        player2 = initializeCharacter(true, 'player2', true);
    }

    if (isRefreshBothPlayers) {
        player1 = initializeCharacter(false, 'player1');
        player2 = initializeCharacter(true, 'player2'); 
    }
    const $control = document.querySelector('.control');
    
    player1.attacks.forEach( item => {
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;
    
        const controlClicksAmount = controlClicks($btn, item.maxCount);
    
        $btn.addEventListener('click', () => {

            player2.changeHP(random(item.maxDamage, item.minDamage), function (damage) {
                //console.log(generateLog(player2, player1, damage));
                renderLog(generateLog(player2, player1, damage), player2);
            });
    
            let plr2_attacks = player2.attacks;
            let enemyAttack = player2.attacks[random(plr2_attacks.length - plr2_attacks.length, plr2_attacks.length - 1)];
            //console.log("#### player2" , player2);
            //console.log("#### player2.isNew" , player2.isNew);

            if(!player2.isNew) {
                player1.changeHP(random(enemyAttack.maxDamage, enemyAttack.minDamage), function (damage) {
                    //console.log(generateLog(player1, player2, damage));
                    renderLog(generateLog(player2, player1, damage), player1);
                });
            }
            player2.isNew = false;
            //console.log("#### player2.isNew" , player2.isNew);
            controlClicksAmount();
        });
    
        $control.appendChild($btn);
    });
}

function init () {
    initialize = new Game(gameMetaData, initializeFight);
}

function showLooseResults () {
    //console.log("#### enemyCount, ", enemyCount);
    if (enemyCount > 0 && enemyCount < 5) {
        renderLog(`Ты уничтожил ${enemyCount} врага!\n Нажми на кнопку 'START GAME' чтобы попробовать снова!`,{side: true});
    } else {
        renderLog(`Ты уничтожил ${enemyCount} врагов!\n Нажми на кнопку 'START GAME' чтобы попробовать снова!`,{side: true});
    }

    initialize.showLooseResults();
}

init();