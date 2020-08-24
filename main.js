const $btn = document.getElementById('btn-kick');
const $btnPikachuAbility = document.getElementById('btn-pikachu-1');

const character = {
    name : 'Pikachu',
    defaultHP : 100,
    damageHP : 100,
    elHP : document.getElementById('health-character'),
    elProgressBar : document.getElementById('progressbar-character'),
    extraAbility: false,
}

const enemy = {
    name : 'Charmander',
    defaultHP : 100,
    damageHP : 100,
    elHP : document.getElementById('health-enemy'),
    elProgressBar : document.getElementById('progressbar-enemy'),
    extraAbility: false,
}

function init () {
    console.log('Start game!');
    renderHP(enemy);
    renderHP(character);

    $btn.addEventListener('click', function () {
        console.log('kick');
        changeHP(random(20), character);
        changeHP(random(20), enemy);
    });

    $btnPikachuAbility.addEventListener('click', function () {
        console.log('Lightning rod!');
        changeHP(random(20), enemy);
        $btnPikachuAbility.disabled = true;
        character.extraAbility = true;
    });

    $btnPikachuAbility.disabled = true;
};

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function changeHP(damage, person) {
    console.log(`${person.name} получает урон ${damage}`);

    if(person.damageHP <= 50 && !character.extraAbility) {
        $btnPikachuAbility.disabled = false;

    }

    if(person.damageHP < damage ) {
        person.damageHP = 0;
        alert (`Бедный ${person.name} проиграл бой!`);
        $btn.disabled = true;
    } else {
        person.damageHP -= damage;
    }

    renderHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressBar.style.width = person.damageHP + '%';
}

function random (num) {
    return Math.ceil(Math.random() * num)
}

init();