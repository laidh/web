export const Select = (props) => {
    return (
        <select className="form-select" onChange={props.handleChange}>
            {props.options.map((item) => {
                return (<option key={item.id} value={item.name}>{item.name}</option>)
            })}
        </select>
    )
}