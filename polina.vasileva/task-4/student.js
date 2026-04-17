export class Student {
    #id;
    #name;
    #grades;

    constructor(name, id) {
        if (!name || name.trim() === "") {
            throw new Error("Имя не может быть пустым");
        }

        id = Number(id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID должен быть положительным числом");
        }

        this.#id = Number(id);
        this.#name = name;
        this.#grades = {}; //предмет - оценка
    }

    addGrade(subject, grade) {
        this.#grades[subject] = grade;
    }

    deleteGrade(subject) {
        if (!(subject in this.#grades)) {
            throw new Error("Такого предмета нет");
        }
        delete this.#grades[subject];
    }

    getAverageGrade() {
        const values = Object.values(this.#grades);
        if (values.length == 0) return 0;
        return (values.reduce((s, v) => s + v, 0) / values.length).toFixed(2);
    }

    get summary() {
        return `Студент ${this.#name} (id: ${this.#id}) — средний балл: ${this.getAverageGrade()}`;
    }

    get grades() {
        return this.#grades;
    }

    get id() {
    return this.#id;
    }

    get name() {
        return this.#name;
    }
}

export function groupByAverageGrade(...students) {
    let students_grades = {};
    for (let student of students) {
        const grade = student.getAverageGrade();
        if (!students_grades[grade]) {
            students_grades[grade] = [];
        }
        students_grades[grade].push(student);
    }  
    return students_grades;
}

export function groupBySubject(...students) {
    let map = new Map();

    for (let student of students) {
        for (let subject in student.grades) {
            if (!map.has(subject)) {
                map.set(subject, []);
            }
            map.get(subject).push(student);
        }
    }

    return map;
}

export function uniqueSubject(...students) {
    let subjects = new Set();
    for (let student of students) {
        const grades = Object.keys(student.grades);
        grades.forEach((sub) => subjects.add(sub));
    }
    return Array.from(subjects);
}

export function maxAverageGrade(...students) {
    let max = -Infinity;
    let result = [];

    for (let student of students) {
        const avg = student.getAverageGrade();
        if (avg > max) {
            max = avg;
            result = [student];
        } else if (avg === max) {
            result.push(student);
        }
    }
    return result;
}

export function studentsWithSubject(subject, ...students) {
    return students.filter(student => subject in student.grades);
}

// тест функций
const student1 = new Student("Анна", 1);
student1.addGrade("Математика", 5);
student1.addGrade("Физика", 4);
student1.addGrade("Программирование", 5);

const student2 = new Student("Борис", 10);
student2.addGrade("Математика", 4);
student2.addGrade("Программирование", 4);
student2.addGrade("Английский", 5);

const student3 = new Student("Лейн", 2);
student3.addGrade("Математика", 5);
student3.addGrade("Физика", 5);
student3.addGrade("Программирование", 5);
student3.addGrade("Английский", 5);

const student4 = new Student("Дмитрий", 7);
student4.addGrade("Физика", 3);
student4.addGrade("Программирование", 4);

const student5 = new Student("Ян", 11);
student5.addGrade("Математика", 3);
student5.addGrade("Английский", 4);


console.log("Группировка по среднему баллу:");
const group = groupByAverageGrade(student1, student2, student3, student4, student5);
for (const [grade, students] of Object.entries(group)) {
    console.log(`Средний балл ${grade}: ${students.map(s => s.name).join(", ")}`);
}
console.log();

console.log("Группировка по предметам:");
const groupedBySubject = groupBySubject(student1, student2, student3, student4, student5);
for (const [subject, students] of groupedBySubject) {
    console.log(`${subject}: ${students.map(s => s.name).join(", ")}`);
}
console.log();

console.log("Уникальные предметы:");
const unique = uniqueSubject(student1, student2, student3, student4, student5);
console.log(unique.join(", "));
console.log();

console.log("Студенты с максимальным средним баллом:");
const bestStudents = maxAverageGrade(student1, student2, student3, student4, student5);
console.log(bestStudents.map(s => `${s.name} (${s.getAverageGrade()})`).join(", "));
console.log();

console.log("Студенты, изучающие конкретные предметы:");
console.log("Программирование:", studentsWithSubject("Программирование", student1, student2, student3, student4, student5).map(s => s.name).join(", "));
console.log();

