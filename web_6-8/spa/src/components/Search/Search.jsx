import {Button} from "../Button"

export const Search = (props) => {
    return (
        <div className="row" style={{marginBottom: "20px"}}>
            <div className="col">
                <div className="form-group">
                    <input type="search" className="form-control" placeholder="Search gems" onChange={props.handleInputChange} />
                </div>
            </div>
            <div className="col">
                <Button text="Search" handleClick={props.handleSearch}/>
            </div>
        </div>
    )
}