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

const gemsInStorage = localStorage.getItem('gems')
if (!gemsInStorage) {
    localStorage.setItem('gems', JSON.stringify(gems));
}

function getData() {
    return gemsInStorage ? JSON.parse(gemsInStorage) : gems;
}

function renderTotalAmount(totalAmount) {
    const mainElement = document.getElementById('totalAmount');
    mainElement.innerText = totalAmount;
}

function renderData(data) {
    let htmlData = '';
    const mainElement = document.getElementById('gems');
    console.log(mainElement);
    if (!data.length) {
        mainElement.innerHTML = '<h2>No such result available</h2>';
    } else {
        data.forEach(function (item) {
            htmlData += `<div class="item"><div class="gem"><div>${item.name}</div><div>${item.carats}</div><div>${item.price}</div></div><a href="edit.html?id=${item.id}" class="edit-button">Edit Item</a><a href="#" class="edit-button" onclick="deleteData(${item.id})">Delete</a><hr></div>`
        })
        mainElement.innerHTML = htmlData
    }
}

function getTotalAmount(data) {
    return data.reduce(function (previousValue, currentValue) {
        return previousValue + Number(currentValue.price);
    }, 0)
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
        if (a[field] < b[field]) {
            return -1;
        }
        if (a[field] > b[field]) {
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

function getQueryParam(name) {
    const location = window.location;
    const queryParam = new URL(location);
    return queryParam.searchParams.get(name)
}

function getDataByID() {
    const id = getQueryParam('id');
    const data = getData();
    const dataById = data.filter(function (item) {
        return Number(item.id) === Number(id);
    })
    return dataById[0];
}

function renderDefaultFormData() {
    const data = getDataByID();
    if (data) {
        console.log(data);
        const id = document.getElementById('id')
        const name = document.getElementById('name')
        const carates = document.getElementById('carates')
        const price = document.getElementById('price')
        id.value = data.id;
        name.value = data.name;
        carates.value = data.carats;
        price.value = data.price;
    }
}

function validateData(editGem) {
    if (editGem) {
        if (typeof Number(editGem.carats) !== 'number' || typeof Number(editGem.price) !== 'number') {
            throw new Error('Fields carates and price have to be number');
        }
        if (!editGem.name.length || !editGem.carats || !editGem.price) {
            throw new Error('All fields have to be filled');
        }
        if (/\s/.test(editGem.name)){
            throw new Error('All fields have to be filled');
        }
        return true;
    }
    throw new Error('Something went wrong!')
}

function editData(editGem) {
    try {
        validateData(editGem);
        const data = getData()

        const editedData = data.map(function (item) {
            if (Number(item.id) === Number(editGem.id)) {
                return editGem;
            }
            return item
        })
        console.log(editedData);
        localStorage.setItem('gems', JSON.stringify(editedData));
        window.location.replace('index.html')
    } catch (error) {
        console.log(error);
        const modal = document.getElementById('modal');
        const errTxt = document.getElementById('errorTxt');
        modal.style.display = 'block';
        errTxt.innerText = error;
    }
}

function createData(editGem) {
    try {
        console.log(editGem);
        validateData(editGem);
        const data = getData()
        const createdData = [...data, editGem]
        console.log(createdData);
        localStorage.setItem('gems', JSON.stringify(createdData));
        window.location.replace('index.html')
    } catch (error) {
        console.log(error);
        const modal = document.getElementById('modal');
        const errTxt = document.getElementById('errorTxt');
        modal.style.display = 'block';
        errTxt.innerText = error;
    }
}

function deleteData(id) {
    console.log(id);
    const data = getData();
    const deletedData = data.filter(function (item) {
             return Number(item.id) !== Number(id);
    })
    console.log(deletedData);
    localStorage.setItem('gems', JSON.stringify(deletedData));
    window.location.reload();
}

