class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elCharacterImage = document.getElementById(`image-${name}`);
    }
}
class Pokemon extends Selectors {
    constructor( {name, hp, type, isNew, extraAbility = false, selectors, side, attacks = [], img, id, showLooseResults, initializeFight}) {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.isNew = isNew;
        this.id = id;
        this.extraAbility = extraAbility;
        this.side = side;
        this.attacks = attacks;
        this.img = img;

        this.showLooseResults = showLooseResults;
        this.initializeFight = initializeFight;

        this.renderHP();
    }
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
        this.renderName();
        this.loadCharacterImage();
    }
    
    renderHPLife = () =>  {
        this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
    }
    
    renderProgressbarHP  = () =>  {
        const hpPercent = this.hp.current / this.hp.total * 100;
        this.elProgressbar.style.width = hpPercent  + '%';
        if (hpPercent < 20) {
            this.elProgressbar.classList.add('critical');
        } else if (hpPercent >= 20 && hpPercent < 60) {
            this.elProgressbar.classList.add('low');
        } else {
            this.elProgressbar.className = 'health';
        }
    }

    renderName = () => this.elName.innerText = this.name;

    loadCharacterImage = () => this.elCharacterImage.src = this.img;
    
    changeHP = (damage, callback) => {
        this.hp.current -= damage;

        if (this.hp.current <= 0 ) {
            this.hp.current = 0;
            this.renderHP();
            alert (`Бедный ${this.name} проиграл бой!`);
            if (this.side === 'enemy') {
                callback && callback(damage);
                this.initializeFight(true, false);
                return;
            } else {
                callback && callback(damage);
                this.showLooseResults();
                return;
            }
        }

        this.renderHP();
        callback && callback(damage);
    }
}

export default Pokemon;