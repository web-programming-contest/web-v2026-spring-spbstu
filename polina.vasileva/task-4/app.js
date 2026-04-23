import { Student, uniqueSubject } from "./student.js";

function saveStudentsToLocalStorage() {
    const studentsData = students.map(student => ({
        id: student.id, 
        name: student.name,
        grades: student.grades
    }));
    localStorage.setItem("listStudents", JSON.stringify(studentsData));
}

function loadStudentsFromLocalStorage() {
    const data = localStorage.getItem("listStudents");
    if (!data) return [];
    const studentsData = JSON.parse(data);
    return studentsData.map(data => {
        const student = new Student(data.name, data.id);
        for (let subject in data.grades) {
            student.addGrade(subject, data.grades[subject]);
        }
        return student;
    });
}

let students = [];

const loadedStudents = loadStudentsFromLocalStorage();

if (loadedStudents && loadedStudents.length > 0) {
    students = loadedStudents;
} else {
    let s1 = new Student("Polina");
    s1.addGrade("math", 5);
    s1.addGrade("russian", 4);
    s1.addGrade("english", 4);

    let s2 = new Student("Lexa");
    s2.addGrade("math", 5);
    s2.addGrade("russian", 5);

    let s3 = new Student("Katy");
    s3.addGrade("english", 4);
    s3.addGrade("russian", 4);

    let s4 = new Student("Max");
    s4.addGrade("geography", 5);
    s4.addGrade("math", 2);

    students = [s1, s2, s3, s4];
    
    saveStudentsToLocalStorage();
}

function renderStudents() {
    saveStudentsToLocalStorage();
    const container = document.getElementById("studentsList");
    container.innerHTML = "";
    const subjects = uniqueSubject(...students);

    let selectHTML = `<select class="subject-select">`;
    subjects.forEach(subject => {
    selectHTML += `<option value="${subject}">${subject}</option>`;});
    selectHTML += `</select>`;

    let selectHTML2 = `<select class="subject-select">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option></select>`;

    students.forEach(student => {
        const div = document.createElement("div");
        div.classList.add("student-card");

        const grades = student.grades;

        let gradesHTML = "";
        for (let subject in grades) {
            gradesHTML += `
                <li>
                ${subject}: 
                <span class="${grades[subject] >= 4 ? 'good' : 'bad'}">
                ${grades[subject]}
                </span>
                </li>`;
        }
        div.innerHTML = `
        <h3>${student.summary}</h3>
        <ul>${gradesHTML}</ul>
        <div class="error"></div>
        ${selectHTML}
        ${selectHTML2}<br>
        <button class="add-btn">Добавить оценку</button>
        <button class="delete-btn">Удалить оценку</button>
        `;

        div.querySelector(".add-btn").addEventListener("click", (e) => {
            addGrade(e.target, student.id);
        });

        div.querySelector(".delete-btn").addEventListener("click", (e) => {
            deleteGrade(e.target, student.id);
        });

        container.appendChild(div);
    });
}
renderStudents();

let addStudentBtn = document.querySelector("#addStudentBtn");
let deleteStudentBtn = document.querySelector("#deleteStudentBtn");

function addStudentAsync(id, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {

                const isIdExist = students.some(s => s.id == id);
                if (isIdExist) {
                    throw new Error("ID уже существует");
                }

                let student = new Student(name, id);
                students.push(student);
                resolve(student); 
            } catch (error) {
                const wrappedError = new Error(`Ошибка при добавлении студента (id: ${id}, name: ${name}): ${error.message}`);
                wrappedError.originalError = error;
                console.error("Исходная ошибка:", error);
                reject(wrappedError);
            }
        }, 1000); 
    });
}

function deleteStudentAsync(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let found = students.find(s => s.id == id);
                
                if (!found) {
                    throw new Error("Студент не найден");
                }
                students = students.filter(s => s.id != id);

                resolve("Студент удален");
            } catch (error) {
                const wrappedError = new Error(`Ошибка при удалении студента (id: ${id}): ${error.message}`);
                wrappedError.originalError = error;
                console.error("Исходная ошибка:", error);
                reject(wrappedError);
            }
        }, 1000);
    });
}


async function addStudent() {
    const id = document.querySelector("#ID_add").value;
    const name = document.querySelector("#name_add").value;
    const errorDiv = document.querySelector("#errorMessage_add");
    const addButton = document.querySelector("#addStudentBtn");
    
    errorDiv.textContent = "";
    
    addButton.disabled = true;
    addButton.textContent = "Добавление...";

    addStudentAsync(id, name)
        .then(() => {
            renderStudents();
            
            document.querySelector("#ID_add").value = "";
            document.querySelector("#name_add").value = "";
        })
        .catch(error => {
            errorDiv.textContent = "Студент не добавлен: " + error.message;
            console.error(error);
        })
        .finally(() => {
            addButton.disabled = false;
            addButton.textContent = "Добавить студента";
        });
}

async function deleteStudent() {
    const id = document.querySelector("#ID_delete").value;
    const errorDiv = document.querySelector("#errorMessage_delete");
    const deleteButton = document.querySelector("#deleteStudentBtn");
    
    errorDiv.textContent = "";
    
    deleteButton.disabled = true;
    deleteButton.textContent = "Удаление...";

    deleteStudentAsync(id)
        .then(() => {
            renderStudents();
            
            document.querySelector("#ID_delete").value = "";
        })
        .catch(error => {
            errorDiv.textContent = "Студент не удален: " + error.message;
            console.error(error);
        })
        .finally(() => {
            deleteButton.disabled = false;
            deleteButton.textContent = "Удалить студента";
        });
}

function addGrade(button, studentId) {
    const selects = button.parentElement.querySelectorAll("select");

    const subject = selects[0].value;
    const grade = Number(selects[1].value);

    const student = students.find(s => s.id == studentId);

    student.addGrade(subject, grade);
    renderStudents();
}

function deleteGrade(button, studentId) {
    const errorDiv = button.parentElement.querySelector(".error");

    if (errorDiv) {
        errorDiv.textContent = "";
    }
    try {
        const selects = button.parentElement.querySelectorAll("select");

        const subject = selects[0].value;

        const student = students.find(s => s.id == studentId);

        student.deleteGrade(subject);
        renderStudents();
    }
    catch (error) {
        errorDiv.textContent = "Ошибка при удалении оценки: " + error.message;
    }

}

addStudentBtn.addEventListener("click", addStudent);
deleteStudentBtn.addEventListener("click", deleteStudent);