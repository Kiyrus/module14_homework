const input = document.querySelector("input");
const textBlock = document.querySelector(".text__row");
const imagesBlock = document.querySelector(".images__row");
const btnNode = document.querySelector("button");

btnNode.addEventListener("click", checkInput);

function checkInput() {
    const value = input.value;
    if (value >= 1 && value <= 10 && !isNaN(value)) {
        useRequest("https://picsum.photos/v2/list?limit=" + value, showResult);
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
        <div> <img src="${item.download_url}" style="width: 150px; margin-right: 30px"/>
            <p>${item.author}</p>
        </div>
        `;
        img += imgBlock;
    });
    imagesBlock.innerHTML = img;
}
