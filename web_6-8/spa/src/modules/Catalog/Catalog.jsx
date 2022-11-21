import {useContext, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import {ProductsContext} from '../../context/ProductsContext'
import { ProductCard, Filter, Button, Search } from '../../components'

const Catalog = () => {
    const [searchValue, setSearchValue] = useState('')
    const {products} = useContext(ProductsContext);
    const [localProducts, setLocalProducts] = useState([]);
    const [filters, setFilters] = useState({
        type:'всі',
        weight:'всі'
    });
    const navigate = useNavigate();
    const openItem = (id) => {
        navigate(`/catalog/item/${id}`)
    }

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        if(!event.target.value){
            setLocalProducts(products);
        }
    }

    const handleSearch = () => {
        if (!searchValue.length) return;
        console.log(searchValue);
        const results = products.filter((item) => {
            const itemName = item.name.toLowerCase();
            return itemName.includes(searchValue.toLowerCase());
        });
        setLocalProducts(results);
    }

    const handleSelectFilter = (event, filterType) => {
        const newFilters = {
            ...filters,
            [filterType]: event.target.value
        }
        setFilters(newFilters);
    }

    const handleFilter = () => {

            const results = products.filter((item) => {
                console.log(item.weight, filters.weight);
                if(filters.type === 'всі' && filters.weight === 'всі'){
                    return true;
                }
                else if(filters.type === 'всі'){
                    return String(item.weight) === filters.weight;
                }
                else if(filters.weight === 'всі'){
                    return item.type === filters.type
                }
                return item.type === filters.type && String(item.weight) === filters.weight;
            });
            console.log(results);
            setLocalProducts(results);
    }

    useEffect(()=>{
        setLocalProducts(products);
    }, [products])

    return (
        <div>
            <div className="row justify-content-between">
                <div className="row">
                    <div className="col">
                        <Search handleSearch={handleSearch} handleInputChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col">
                    <Filter handleFilter={handleFilter} handleSelectFilter={handleSelectFilter}/>
                </div>
            </div>

            <div className="row justify-content-between">
                {
                    localProducts.map((item)=>{
                        return (
                            <div className="col m-4" key={item.id}>
                                <ProductCard {...item} handleClick={() => openItem(item.id)}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Catalog