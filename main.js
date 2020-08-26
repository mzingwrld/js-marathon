const $btn = document.getElementById('btn-kick');
const $btnPikachuAbility = document.getElementById('btn-pikachu-1');

const character = {
    name : 'Pikachu',
    totalHP : 100,
    currentHP : 100,
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
    totalHP : 100,
    currentHP : 100,
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
    if (this.name === character.name) {
        if (this.currentHP - damage <= 50 && !character.extraAbility) {
            $btnPikachuAbility.disabled = false;
        } 
    }

    this.currentHP -= damage;

    const log = this === enemy ? renderLog(generateLog(this, character, damage), this) : renderLog(generateLog(this, enemy, damage), this);
    console.log(log);

    if (this.currentHP <= 0 ) {
        this.currentHP = 0;
        this.renderHP();
        alert (`Бедный ${this.name} проиграл бой!`);
        $btn.disabled = true;
        return;
    }

    this.renderHP();
}

function renderHPLife() {
    this.elHP.innerText = this.currentHP + ' / ' + this.totalHP;
}

function renderProgressbarHP() {
    this.elProgressBar.style.width = this.currentHP / this.totalHP * 100  + '%';
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

function generateLog(firstPerson, secondPerson, damage) {
    const {name: nameFirstPerson, currentHP, totalHP} = firstPerson;
    const {name: nameSecondPerson} = secondPerson;

    const logs = [
        `${nameFirstPerson} вспомнил что-то важное, но неожиданно ${nameSecondPerson}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} поперхнулся, и за это ${nameSecondPerson} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} забылся, но в это время наглый ${nameSecondPerson}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} пришел в себя, но неожиданно ${nameSecondPerson} случайно нанес мощнейший удар. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} поперхнулся, но в это время ${nameSecondPerson} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} удивился, а ${nameSecondPerson} пошатнувшись влепил подлый удар. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} высморкался, но неожиданно ${nameSecondPerson} провел дробящий удар. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} пошатнулся, и внезапно наглый ${nameSecondPerson} беспричинно ударил в ногу противника. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} расстроился, как вдруг, неожиданно ${nameSecondPerson} случайно влепил стопой в живот соперника. -${damage} [${currentHP}/${totalHP}]`,
        `${nameFirstPerson} пытался что-то сказать, но вдруг, неожиданно ${nameSecondPerson} со скуки, разбил бровь сопернику. -${damage} [${currentHP}/${totalHP}]`,
    ];

    return logs[random(logs.length) - 1];
}

function renderLog(text, person) {
    const $logTitle = document.querySelector('.log-title');
    const $p = document.createElement('p');
    $p.className = person === enemy ? 'damage-dealt' : 'damage-received';

    $p.innerText = text;

    $logTitle.parentNode.insertBefore($p, $logTitle.nextSibling);

}

init();