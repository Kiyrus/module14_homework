const input = document.querySelector("input");
const textBlock = document.querySelector(".text__row");
const imagesBlock = document.querySelector(".images__row");
const btnNode = document.querySelector("button");

btnNode.addEventListener("click", checkInput);

function checkInput() {
    const value = input.value;
    if (value >= 1 && value <= 10 && !isNaN(value)) {
        useRequest("http://jsonplaceholder.typicode.com/photos?_limit=" + value, showResult);
        printStatus("Uploading a photo...");
    } else {
        printStatus("A number outside the range from 1 to 10.");
    }
}

function printStatus(text) {
    textBlock.innerHTML = text;
}

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status !== 200) {
            printStatus("Response status:", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            printStatus("Photos uploaded.");
        }
    };
    xhr.onerror = function () {
        printStatus("Error! Response status:", xhr.status);
    };
    xhr.send();
}

function showResult(apiData) {
    let img = "";
    apiData.forEach((item) => {
        const imgBlock = `
        <div class="img_container">
            <img src="${item.thumbnailUrl}" style="width: 150px;"/>
            <p>${item.title}</p>
        </div>
        `;
        img += imgBlock;
    });
    imagesBlock.innerHTML = img;
}
