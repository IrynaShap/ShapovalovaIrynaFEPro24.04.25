"use strict";

function Student(name, surname, birthYear, assessments = []) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
    this.assessments = assessments;

    this._attendance = new Array(25);
    this._attendanceCount = 0;
}

Student.prototype._attend = function (isPresent) {
    if (this._attendanceCount < this._attendance.length) {
        this._attendance[this._attendanceCount++] = isPresent;
    } else {
        console.warn("Досягнуто ліміту відвідувань");
    }
    return this;
}

Student.prototype.getAge = function () {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
};

Student.prototype.getAverage = function () {
    if (this.assessments.length === 0) return 0;
    const total = this.assessments.reduce((acc, curr) => acc + curr, 0);
    return total / this.assessments.length;
};

Student.prototype.present = function () {
    return this._attend(true);
};

Student.prototype.absent = function () {
    return this._attend(false);
};

Student.prototype.summary = function () {
    const average = this.getAverage();
    const presentCount = this._attendance
        .slice(0, this._attendanceCount)
        .filter(att => att === true).length;
    const averageAttendance = this._attendanceCount > 0
        ? (presentCount / this._attendanceCount) : 0;

    if (average > 90 && averageAttendance > 0.9) {
        return "Молодець";
    } else if (average < 90 && averageAttendance < 0.9) {
        return "Редиска!";
    }

    return "Добре, але можна краще";

};

// --- Демонстрація використання ---
const studentA = new Student("Іван", "Петренко", 2000, [95, 92, 95, 100]);
const studentB = new Student("Олена", "Шевченко", 2001, [70, 80, 65, 75]);
const studentC = new Student("Максим", "Коваленко", 1999, [90, 91, 89, 92]);

studentA.present().present().present().present().present();
studentB.absent().absent().present().absent().present();
studentC.present().present().present().present().absent();

console.log("--- Student A ---");
console.log("Вік:", studentA.getAge());
console.log("Середній бал:", studentA.getAverage());
console.log("Відвідуваність:", studentA._attendance);
console.log("Підсумок:", studentA.summary());

console.log("--- Student B ---");
console.log("Вік:", studentB.getAge());
console.log("Середній бал:", studentB.getAverage());
console.log("Відвідуваність:", studentB._attendance);
console.log("Підсумок:", studentB.summary());

console.log("--- Student C ---");
console.log("Вік:", studentC.getAge());
console.log("Середній бал:", studentC.getAverage());
console.log("Відвідуваність:", studentC._attendance);
console.log("Підсумок:", studentC.summary());
