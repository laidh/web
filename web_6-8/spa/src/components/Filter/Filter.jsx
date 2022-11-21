import {Select} from "../Select";
import {Button} from "../Button";

export const Filter = (props) => {
    return (
        <div className="row">
            <div className="col">
                <Select options={
                    [
                        { id:1, name:'всі', },
                        { id:2, name:'оброблені камені', },
                        { id:3, name:'біжутерія', },
                    ]
                } handleChange={(e) => props.handleSelectFilter(e, "type")}/>
                <label>тип</label>
            </div>
            <div className="col">
                <Select options={
                    [
                        { id:1, name:'всі', },
                        { id:2, name:'4.6', },
                        { id:3, name:'16', },
                        { id:4, name:'30', },
                    ]
                } handleChange={(e) => props.handleSelectFilter(e, "weight")}/>
                <label>вага</label>
            </div>
            <div className="col">
                <Button text="apply" type="apply-button" handleClick={props.handleFilter} />
            </div>
        </div>
    )
}