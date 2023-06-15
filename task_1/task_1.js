/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDOM.querySelectorAll("student");
const resultList = [];

listNode.forEach((item) => {
    const nameNode = item.querySelector("name");
    const firstNode = item.querySelector("first");
    const secondNode = item.querySelector("second");
    const ageNode = item.querySelector("age");
    const profNode = item.querySelector("prof");

    // Получение данных из атрибутов
    const langAttr = nameNode.getAttribute("lang");

    /* Этап 3. Запись данных в результирующий объект */
    const result = {
        name: firstNode.textContent + " " + secondNode.textContent,
        age: Number(ageNode.textContent),
        lang: langAttr,
        prof: profNode.textContent,
    };
    resultList.push(result);
    console.log("result", result);
});
