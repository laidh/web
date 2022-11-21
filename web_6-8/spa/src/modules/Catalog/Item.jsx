import { useParams, useNavigate } from 'react-router-dom';
import {useContext, useState, useEffect} from 'react'

import {ProductsContext} from '../../context/ProductsContext'
import {Button} from "../../components";

const Item = () => {
    const [item, setItem] = useState({})
    const { id } = useParams();
    const {products} = useContext(ProductsContext);
    const navigate = useNavigate();

    const goBack = () => {
        return navigate('/catalog')
    }

    useEffect(() => {
        if (products.length) {
            const result = products.filter((item) => {
                return item.id === id
            });
            setItem(result[0])
        }
    }, [products])
    return(
        <div className="row" style={{marginBottom:"50px"}}>
            <img src={item.img} className="col" style={{maxWidth:"600px", borderRadius:"7%"}} />
            <div className="col">
                <div className="row d-flex flex-column">
                    <h3 className="col" style={{marginBottom:'20px'}}>{item.name}</h3>
                    <div className="col" style={{marginBottom:'20px'}}>{item.desc}</div>
                    <h5 className="col" style={{marginBottom:'20px'}}>{item.price}грн</h5>
                </div>
                <div className="row" style={{gap:"15px"}}>
                    <div className="col" style={{maxWidth:"160px"}}>
                        <Button text="Go Back" handleClick={goBack} />
                    </div>
                    <div className="col">
                        <Button text="Add To Cart" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Item;