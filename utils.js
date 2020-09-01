export function random (num) {
    return Math.ceil(Math.random() * num);
}

export function generateLog(firstPerson, secondPerson, damage) {
    const {name: nameFirstPerson, hp:{current: currentHP, total: totalHP} } = firstPerson;
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
};