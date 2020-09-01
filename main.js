import Pokemon from './pokemon.js';
import {random, generateLog} from './utils.js';

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 100,
    selectors: 'character',
    extraAbility: true,
});
const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 100,
    selectors: 'enemy',
});

const $btn = document.getElementById('btn-kick');
const $btnPikachuAbility = document.getElementById('btn-pikachu-1');

$btn.addEventListener('click', function () {
    player2.changeHP(random(20), function (damage) {
        console.log('Some change after change HP ' + damage);
        console.log(generateLog(player2, player1, damage));
        renderLog(generateLog(player2, player1, damage), player2);
    });
    player1.changeHP(random(20), function (damage) {
        console.log('Some change after change HP ' + damage);
        console.log(generateLog(player1, player2, damage));
        renderLog(generateLog(player2, player1, damage), player1);
    });
});

$btn.addEventListener('click', controlClicks($btn, 10) );

$btnPikachuAbility.addEventListener('click', function () {
    player2.changeHP(random(20), function (damage) {
        console.log('Some change after change HP ' + damage);
        console.log(generateLog(player2, player1, damage));
        renderLog('Пикачу запустил Lightning Rod!', player2);
    });
    player1.extraAbility = false;
});

$btnPikachuAbility.addEventListener('click', controlClicks($btnPikachuAbility, 1) );

function controlClicks(button, amountOfClicksAvailable) {
    let buttonInnerText = button.innerText;
    button.innerText = `${buttonInnerText} [${amountOfClicksAvailable}] `;

    return function () {
        amountOfClicksAvailable -= 1;
        button.innerText = `${buttonInnerText} [${amountOfClicksAvailable}] `;
        if(amountOfClicksAvailable <= 0) {
            button.disabled = true;
        }
    }
}

function renderLog(text, person) {
    const $logTitle = document.querySelector('.log-title');
    const $p = document.createElement('p');
    
    $p.className = person === player2 ? 'damage-dealt' : 'damage-received';

    $p.innerText = text;

    $logTitle.parentNode.insertBefore($p, $logTitle.nextSibling);
}
