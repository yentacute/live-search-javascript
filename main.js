var typingTimer;   
var seconds = 3000; 
var itemContainer = document.querySelector('.item-container');

function keyUpEvent(element) {
    const searchEl = document.querySelector(element);
    searchEl.addEventListener('keyup', function (event) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function () {
            let targetVal = event.target.value;
            liveSearch(targetVal);
        }, seconds);
    });

}

function liveSearch(eventTargetVal) {
    itemContainer.innerHTML = '';
    fetch('./data.json')
        .then(res => {
            if (res.status !== 200) {
                throw new Error("Pls check data source" + res.status);
            }
            return res.json();
        })
        .then(result => {
            if (eventTargetVal) {
                let searchResult = result.filter(el => {
                    return (
                        el.title.toLowerCase().includes(eventTargetVal)
                    );
                }).map(element => {
                    return `
                        <div class= 'item'><h2 class='title'>${element.title}</h2><img src='${element.image}' /><span class='price'>${element.price}</span></div>
                    `
                }).join(' ');
                itemContainer.innerHTML = searchResult;
            } else {
                let allItems = result.map(element => {
                    return `<div class= 'item'><h2 class='title'>${element.title}</h2><img src='${element.image}' /><span class='price'>${element.price}</span></div> `
                }).join(' ');
                itemContainer.innerHTML = allItems;
            }

        })
        .catch(err => {
            console.log(err)
        });

}
keyUpEvent('.container .search-input');
liveSearch();