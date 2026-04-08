export function participantValidation(firstName, secondName, events, currentEvent) {
    const result = {
        correct: false,
        message: "",
        color: "red",
    };

    if (!checkFirstName(firstName, result)) {
        return result;
    }

    if (!checkSecondName(secondName, result)) {
        return result;
    }

    if (!checkUniqueParticipant(firstName, secondName, events, currentEvent, result)) {
        return result;
    }

    result.correct = true;
    result.message = "Участник успешно добавлен";
    result.color = "green";
    return result;
}

function checkFirstName(firstName, result) {
    if (!firstName || firstName.trim().length === 0) {
        result.message = "Имя участника не может быть пустым";
        result.correct = false;
        return false;
    }

    if (firstName.trim().length < 2) {
        result.message = "Имя должно содержать минимум 2 символа";
        result.correct = false;
        return false;
    }

    if (firstName.trim().length > 20) {
        result.message = "Имя не должно превышать 20 символов";
        result.correct = false;
        return false;
    }

    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-']+$/;
    if (!nameRegex.test(firstName.trim())) {
        result.message = "Имя может содержать только буквы, пробелы, дефисы и апострофы";
        result.correct = false;
        return false;
    }

    return true;
}

function checkSecondName(secondName, result) {
    if (!secondName || secondName.trim().length === 0) {
        result.message = "Фамилия участника не может быть пустой";
        result.correct = false;
        return false;
    }

    if (secondName.trim().length < 2) {
        result.message = "Фамилия должна содержать минимум 2 символа";
        result.correct = false;
        return false;
    }

    if (secondName.trim().length > 20) {
        result.message = "Фамилия не должна превышать 20 символов";
        result.correct = false;
        return false;
    }

    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-']+$/;
    if (!nameRegex.test(secondName.trim())) {
        result.message = "Фамилия может содержать только буквы, пробелы, дефисы и апострофы";
        result.correct = false;
        return false;
    }

    return true;
}

function checkUniqueParticipant(firstName, secondName, events, currentEventId, result) {
    const trimmedFirstName = firstName.trim();
    const trimmedSecondName = secondName.trim();

    const targetEvent = events.find(event => event.id === currentEventId);

    if (!targetEvent) {
        result.message = "Событие не найдено";
        result.correct = false;
        return false;
    }

    const isDuplicate = targetEvent.participants && targetEvent.participants.some(participant =>
        participant === trimmedFirstName + " " + trimmedSecondName
    );

    if (isDuplicate) {
        result.message = "Такой участник уже зарегистрирован на это событие";
        result.correct = false;
        return false;
    }

    return true;
}