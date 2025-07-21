class Coach {
    constructor(name, specialization, rating) {
        this.name = name;
        this.specialization = specialization;
        this.rating = rating;
    }

    displayInfo() {
        return `Тренер: ${this.name}, Спеціалізація: ${this.specialization}, Рейтинг: ${this.rating}`;
    }
}

const coach1 = new Coach('John Doe', 'Fitness', 4.7);
const coach2 = new Coach('Alice Smith', 'Yoga', 4.9);

console.log(coach1.displayInfo());
console.log(coach2.displayInfo());