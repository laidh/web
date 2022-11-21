function fetchData(){
    return fetch("http://localhost:3000/gems")
}

async function getData() {
    const response = await fetchData();
    const data = await response.json();
    console.log(data.data);
    return data.data;
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
            htmlData += `<div class="item"><div class="gem"><div>${item.name}</div><div>${item.carats}</div><div>${item.price}</div></div><a href="edit.html?id=${item.id}" class="edit-button">Edit Item</a><a href="#" class="edit-button" onclick="deleteData('${item.id}')">Delete</a><hr></div>`
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

    getData().then((data)=>{
        const results = data.filter(function (item) {
            const itemName = item.name.toLowerCase();
            return itemName.includes(searchText.toLowerCase());
        });

        renderData(results);
        renderTotalAmount(getTotalAmount(results))
    });
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
    const data = getData().then((data)=>{
        const sortedData = data.sort(comparator());

        renderData(sortedData);
        renderTotalAmount(getTotalAmount(sortedData))
    });
}

function getQueryParam(name) {
    const location = window.location;
    const queryParam = new URL(location);
    return queryParam.searchParams.get(name)
}

async function getDataByID() {
    const id = getQueryParam('id');
    const data = await getData();
    const dataById = data.filter(function (item) {
        return item.id === id;
    })
    console.log(dataById[0]);
    return dataById[0];
}

function renderDefaultFormData() {
    getDataByID().then((data) => {
        console.log(data);
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
    })
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
        fetch(
            `http://localhost:3000/gems/${editGem.id}`,
            {
                method: "PATCH",
                body: JSON.stringify(editGem),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
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
        validateData(editGem);
        fetch(
            `http://localhost:3000/gems`,
            {
                method: "POST",
                body: JSON.stringify(editGem),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
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
    fetch(
        `http://localhost:3000/gems/${id}`,
        {
            method: "DELETE",
        }
    )
    window.location.reload();
}

//------------------------
