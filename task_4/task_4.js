const inputWidth = document.querySelector(".sender__width");
const inputHeight = document.querySelector(".sender__height");
const textBlock = document.querySelector(".text__row");
const imagesBlock = document.querySelector(".image__row");
const btnNode = document.querySelector("button");

btnNode.addEventListener("click", checkInput);

function checkInput() {
    const width = inputWidth.value;
    const height = inputHeight.value;

    if (
        width < 100 ||
        width > 300 ||
        isNaN(width) ||
        height < 100 ||
        height > 300 ||
        isNaN(height)
    ) {
        printStatus("One of the numbers outside the range from 100 to 300.");
        return;
    }

    printStatus("Uploading a photo...");

    fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => response.url)
        .then((result) => {
            showrResult(result);
            printStatus("The photo is uploaded.");
        })
        .catch((reason) => {
            printStatus("Error: " + reason);
        });
}

function printStatus(text) {
    textBlock.innerHTML = text;
}

function showrResult(photoUrl) {
    const imgBlock = `<img src="${photoUrl}" style="margin-right: 30px"/>`;
    imagesBlock.innerHTML = imgBlock;
}
