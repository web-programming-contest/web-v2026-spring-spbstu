export function eventsValidation(idField, titleField, dateField, events) {
    const result = {
        correct: false,
        message: "",
        color: "red",
    };

    if (!checkId(idField, result, events)) {
        return result;
    }

    if (!checkTitle(titleField, result)) {
        return result;
    }

    if (!checkDate(dateField, result)) {
        return result;
    }

    result.correct = true;
    result.message = "Все поля валидны";
    result.color = "green";

    return result;
}

function checkId(idField, result, events) {
    if (idField.trim().length === 0) {
        result.message = "Поле ID не может быть пустым";
        result.correct = false;
        return false;
    }

    const numId = Number(idField);

    if (!isFinite(numId)) {
        result.message = "ID должен быть числом";
        result.correct = false;
        return false;
    }

    if (!Number.isInteger(numId)) {
        result.message = "ID должен быть целым числом";
        result.correct = false;
        return false;
    }

    if (numId <= 0) {
        result.message = "ID должен быть больше нуля";
        result.correct = false;
        return false;
    }

    if (events.find(curEvent => curEvent.id === numId)) {
        result.message = "Событие с таким ID уже существует";
        result.correct = false;
        return false;
    }

    return true;
}

function checkTitle(titleField, result) {
    if (titleField.trim().length === 0) {
        result.message = "Название события не может быть пустым";
        result.correct = false;
        return false;
    }

    if (titleField.trim().length < 3) {
        result.message = "Название должно содержать минимум 3 символа";
        result.correct = false;
        return false;
    }

    if (titleField.trim().length > 100) {
        result.message = "Название не должно превышать 100 символов";
        result.correct = false;
        return false;
    }

    const invalidChars = /[<>{}[\]\\*%$@#&^]/;
    if (invalidChars.test(titleField)) {
        result.message = "Название содержит недопустимые символы";
        result.correct = false;
        return false;
    }

    return true;
}

function checkDate(dateField, result) {
    if (dateField.trim().length === 0) {
        result.message = "Дата не может быть пустой";
        result.correct = false;
        return false;
    }
    const date = new Date(dateField);
    const today = new Date();

    if (date < today) {
        result.message = "Дата не может быть в прошлом";
        result.correct = false;
        return false;
    }

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);

    if (date > maxDate) {
        result.message = "Дата не может быть более чем на 10 лет вперёд";
        result.correct = false;
        return false;
    }

    return true;
}