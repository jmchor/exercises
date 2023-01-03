class Player {
	constructor(hp, attackValue, name) {
		this.hp = hp;
		this.attackValue = attackValue;
		this.name = name;
		console.log('The player was spawned.');
	}

	attack(target) {
		target.hp -= this.attackValue;
		console.log(`${target.name} lost ${this.attackValue} hp and stil has ${target.hp} remaining.`);
	}
}

// create a class monster with hp and attack values.
class Monster {
	constructor(hp, attackValue, name) {
		this.hp = hp;
		this.attackValue = attackValue;
		this.name = name;
	}

	attack(target) {
		target.hp -= this.attackValue;
		console.log(`${target.name} lost ${this.attackValue} hp and stil has ${target.hp} remaining.`);
	}
}

class Slime extends Monster {
	constructor(hp, attackValue, name) {
		super(hp, attackValue, name);
		this.hasExploded = false;
	}

	explode(target) {
		if (!this.hasExploded) {
			target.hp -= 10;
			this.hp -= 10;
			console.log(`The slime exploded and ${target.name} lost 10hp.`);
			this.hasExploded = true;
		} else {
			console.log(`The slime already exploded and can't explode now.`);
		}
	}
}

let mainPlayer = new Player(20, 3, 'Dani');
let monster1 = new Slime(40, 3, 'Purple Slimerino');
let monster2 = new Monster(30, 1, 'Goblin');

mainPlayer.attack(monster1);
monster1.attack(mainPlayer);

/* EXERCISE:
    Create a Player class that has hp, attack, title
    Create a Monster class that has hp, attack, title
    Create a Boss class that extends the Monster and has 2 different spells */

class Player {
	constructor(hp, attackValue, title) {
		this.hp = hp;
		this.attackValue = attackValue;
		this.title = title;
		console.log('The player was spawned.');
	}

	attack(target) {
		target.hp -= this.attackValue;
		console.log(`${target.title} lost ${this.attackValue} hp and still has ${target.hp} remaining.`);
	}
}

class Monster {
	constructor(hp, attackValue, title) {
		this.hp = hp;
		this.attackValue = attackValue;
		this.title = title;
	}

	attack(target) {
		target.hp -= this.attackValue;
		console.log(`${target.title} lost ${this.attackValue} hp and stil has ${target.hp} remaining.`);
	}
}

class Boss extends Monster {
	constructor(hp, attackValue, title, power) {
		super(hp, attackValue, title);

		this.power = power;
	}
	acidTears(target) {
		let rnd = Math.floor(Math.random() * 2);
		console.log("The Boss will cast Acid Tears - there's a 50-50 chance he will hit himself");
		if (rnd !== 0) {
			target.hp -= 30;
			this.power -= 30;
			console.log(
				`${target.title} was struck with Acid Tears and they are melting his face. ${target.title} loses 30 hp and now has ${target.hp} HP left. The spell weakened the Boss, his power levels are at ${this.power}`
			);
		} else {
			this.hp -= 30;
			console.log(`The curse rebounded and the Boss is now melting his own face! He has ${this.hp} HP left!`);
		}
	}
}
