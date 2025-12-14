let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : items;
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    // удаление
    deleteButton.addEventListener("click", () => {
        clone.remove();
        saveTasks(getTasksFromDOM());
    });

    // копирование
    duplicateButton.addEventListener("click", () => {
        const newItem = createItem(textElement.textContent);
        listElement.prepend(newItem);
        saveTasks(getTasksFromDOM());
    });

    // редактирование
    editButton.addEventListener("click", () => {
        textElement.contentEditable = "true";
        textElement.focus();
    });

    textElement.addEventListener("blur", () => {
        textElement.contentEditable = "false";
        saveTasks(getTasksFromDOM());
    });

    textElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            textElement.blur();
        }
    });

    return clone;
}

function getTasksFromDOM() {
    const elements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];

    elements.forEach((el) => {
        tasks.push(el.textContent);
    });

    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// загрузка задач при открытии
items = loadTasks();
items.forEach((item) => {
    listElement.append(createItem(item));
});

// добавление
formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const value = inputElement.value.trim();
    if (!value) return;

    listElement.prepend(createItem(value));
    saveTasks(getTasksFromDOM());

    inputElement.value = "";
});
