class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}
class Pokemon extends Selectors {
    constructor( {name, hp, type, extraAbility = false, selectors}) {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.extraAbility = extraAbility;

        this.renderHP();
    }
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }
    
    renderHPLife = () =>  {
        this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
    }
    
    renderProgressbarHP  = () =>  {
        this.elProgressbar.style.width = this.hp.current / this.hp.total * 100  + '%';
    }
    
    changeHP = (damage, callback) => {
        this.hp.current -= damage;

        if (this.hp.current <= 0 ) {
            this.hp.current = 0;
            this.renderHP();
            alert (`Бедный ${this.name} проиграл бой!`);
            return;
        }

        this.renderHP();
        callback && callback(damage);
    }
}

export default Pokemon;