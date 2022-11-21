const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const path = "./data.json";

async function getAll() {
        const data = await fs.readFile(path);
        return JSON.parse(data);
}

async function create(req){
    const {data} = await getAll();
    const newItem = {...req.body, id: uuidv4() };
    const createdData = {
        data: [...data, newItem]
    }
    fs.writeFile(path, JSON.stringify(createdData), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    return newItem;
}

async function update(req){
    const {data} = await getAll();
    const editDataIndex = data.findIndex((item) => item.id === req.params.id);
    const editData = {
        id: req.params.id,
        name: req.body?.name || data[editDataIndex].name,
        carats: req.body?.carats || data[editDataIndex].carats,
        price: req.body?.price || data[editDataIndex].price
    }

    const dataWithoutEditable = data.filter((item) => {
        return item.id !== req.params.id
    })
    const editedData = {
        data: [editData, ...dataWithoutEditable]
    }

    fs.writeFile(path, JSON.stringify(editedData), function(err) {
        if(err) {
            return console.log(err);
        }
    });

    return editData;
}

async function remove(req){
    const {data} = await getAll();
    const deleted = data.filter(function (item) {
        return item.id !== req.params.id;
    })

    const deletedData = {
        data: deleted
    }

    fs.writeFile(path, JSON.stringify(deletedData), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

module.exports = {
    getAll,
    create,
    update,
    remove
}

