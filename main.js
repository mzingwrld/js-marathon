const $btn = document.getElementById('btn-kick');
const $btnPikachuAbility = document.getElementById('btn-pikachu-1');

const character = {
    name : 'Pikachu',
    defaultHP : 100,
    remainingHP : 100,
    elHP : document.getElementById('health-character'),
    elProgressBar : document.getElementById('progressbar-character'),
    extraAbility : false,
    renderHPLife : renderHPLife,
    renderHP : renderHP,
    renderProgressbarHP : renderProgressbarHP,
    changeHP: changeHP,
}

const enemy = {
    name : 'Charmander',
    defaultHP : 100,
    remainingHP : 100,
    elHP : document.getElementById('health-enemy'),
    elProgressBar : document.getElementById('progressbar-enemy'),
    extraAbility : false,
    renderHPLife : renderHPLife,
    renderHP : renderHP,
    renderProgressbarHP : renderProgressbarHP,
    changeHP: changeHP,
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(damage) {
    console.log(`${this.name} получает урон ${damage}`);
    if (this.name === character.name) {
        if (this.remainingHP - damage <= 50 && !character.extraAbility) {
            $btnPikachuAbility.disabled = false;
        } 
    }


    if (this.remainingHP < damage ) {
        this.remainingHP = 0;
        alert (`Бедный ${this.name} проиграл бой!`);
        $btn.disabled = true;
    } else {
        this.remainingHP -= damage;
    }

    this.renderHP();
}

function renderHPLife() {
    this.elHP.innerText = this.remainingHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    this.elProgressBar.style.width = this.remainingHP / this.defaultHP * 100  + '%';
}

function random (num) {
    return Math.ceil(Math.random() * num);
}

function init () {
    console.log('Start game!');
    enemy.renderHP();
    character.renderHP();

    $btn.addEventListener('click', function () {
        console.log("kick'n'fight!");
        character.changeHP(random(20));
        enemy.changeHP(random(20));
    });

    $btnPikachuAbility.addEventListener('click', function () {
        console.log('Lightning rod!');
        enemy.changeHP(random(20));
        $btnPikachuAbility.disabled = true;
        character.extraAbility = true;
    });

    $btnPikachuAbility.disabled = true;
};

init();