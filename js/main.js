const gems = [
    {
        id: 1,
        name: 'Сапфір',
        carats: 5,
        price: 16000
    },
    {
        id: 2,
        name: 'Агат',
        carats: 3,
        price: 400
    },
    {
        id: 3,
        name: 'Діамант',
        carats: 1,
        price: 38600
    },
    {
        id: 4,
        name: 'Рубін',
        carats: 1,
        price: 1500
    },
    {
        id: 5,
        name: 'Рубін круглий',
        carats: 1,
        price: 1500
    },
    {
        id: 6,
        name: 'Аметист',
        carats: 2,
        price: 2300
    },
    {
        id: 7,
        name: 'Аквамарин',
        carats: 6,
        price: 23500
    },
];

function getData() {
    return gems;
}

function renderTotalAmount(totalAmount) {
    const mainElement = document.getElementById('totalAmount');
    mainElement.innerText = totalAmount;
}

function renderData(data) {
    let htmlData = '';
    const mainElement = document.getElementById('gems');

    if (!data.length) {
        mainElement.innerHTML = '<h2>No such result available</h2>';
    } else {
        data.forEach(function (item) {
            htmlData += `<div class="gem"><div>${item.name}</div><div>${item.carats}</div><div>${item.price}</div></div><hr>`
        })
        mainElement.innerHTML = htmlData
    }
}

function getTotalAmount(data) {
    return data.reduce(function(previousValue, currentValue){
        return previousValue + currentValue.price;
    },0)
}

function search(event) {
    event.preventDefault();
    const searchText = document.getElementById('search').value;

    if (!searchText.length) return;

    const data = getData();
    const results = data.filter(function (item) {
        const itemName = item.name.toLowerCase();
        return itemName.includes(searchText.toLowerCase());
    });

    renderData(results);
    renderTotalAmount(getTotalAmount(results))
}
 
function comparator(field = 'carats') {
    return function (a, b) {
        if ( a[field] < b[field] ){
            return -1;
        }
        if ( a[field] > b[field] ){
            return 1;
        }
        return 0;
    }
}

function sortBy(event) {
    event.preventDefault();
    const data = getData();

    const sortedData = data.sort(comparator());

    renderData(sortedData);
    renderTotalAmount(getTotalAmount(sortedData))
}

//------------------------------------

const data = getData();
console.log(getTotalAmount(data));
renderData(data);
renderTotalAmount(getTotalAmount(data))

const searchForm = document.getElementById("searchForm");
const sortForm = document.getElementById("sortForm");
searchForm.addEventListener('submit', search);
sortForm.addEventListener('submit', sortBy);
