let buttonDiv = document.getElementById('buttonDiv');
function constructOptions(kButtonColors) {
    for (let color of kButtonColors) {
        let button = document.createElement('button');
        button.style.backgroundColor = color;
        button.setAttribute('value', color);
        button.addEventListener('click', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.backgroundColor = "' + color + '";' });
            });
        });
        buttonDiv.appendChild(button);
    }
}

chrome.storage.sync.get('kButtonColors', function (data) {
    constructOptions(data.kButtonColors);
});
