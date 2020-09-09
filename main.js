import Pokemon from './pokemon.js';
import Game from './game.js';
import {random, generateLog, renderLog, controlClicks} from './utils.js';
import {getPokemons, getDamage} from './API.js';

let pokemons = [];

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
        player1 = {...initializeCharacter(false, 'player1')};
        player2 = {...initializeCharacter(true, 'player2')}; 
    }

    const $control = document.querySelector('.control');
    
    player1.attacks.forEach( item => {
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;
    
        const controlClicksAmount = controlClicks($btn, item.maxCount, handlePushClicksAmountLeftToPlayer1);
    
        $btn.addEventListener('click', async () => {
            controlClicksAmount();

            const damage = await getDamage(player1.id, item.id, player2.id);


            player2.changeHP( damage.kick.player2
                , function (damage) {
                renderLog(generateLog(player2, player1, damage), player2);
            });

            if(!player2.isNew) {
                
                player1.changeHP( damage.kick.player1
                    , function (damage) {
                    renderLog(generateLog(player1, player2, damage), player1);
                });
            }
            player2.isNew = false;
        });
    
        $control.appendChild($btn);
    });
}

function handlePushClicksAmountLeftToPlayer1 (ability, clickAmountLeft) {
    for (let i = 0; i < player1.attacks.length; i++) {
        if(player1.attacks[i].name == ability) {
            let restOfAttacks = [];
            for (let y = 0; y < player1.attacks.length; y++) {
                if (player1.attacks[y].name !== ability) {
                    restOfAttacks.push(player1.attacks[y]);
                }
            }

            let changedAttack = {
                name : player1.attacks[i].name,
                maxDamage : player1.attacks[i].maxDamage,
                minDamage: player1.attacks[i].minDamage,
                id : player1.attacks[i].id,
                maxCount : clickAmountLeft,
            };

            restOfAttacks.splice(i, 0, changedAttack);

            player1 = {
                ...player1,
                attacks : restOfAttacks,
            }

        }
    }
}

async function init () {
    pokemons = await getPokemons();
    initialize = new Game(gameMetaData, initializeFight);
}

function showLooseResults () {
    if (enemyCount > 0 && enemyCount < 5) {
        renderLog(`Ты уничтожил ${enemyCount} врага!\n Нажми на кнопку 'START GAME' чтобы попробовать снова!`,{side: true});
    } else {
        renderLog(`Ты уничтожил ${enemyCount} врагов!\n Нажми на кнопку 'START GAME' чтобы попробовать снова!`,{side: true});
    }
    enemyCount = 0;
    initialize.showLooseResults();
}

init();