import './styles.scss'

export const Button= (props) => {
    return (
        <button onClick={props.handleClick} type="button" className="btn btn-primary blue">{props.text}</button>
    );
};