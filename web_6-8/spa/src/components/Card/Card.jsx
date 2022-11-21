import './styles.scss'

export const Card = (props) => {
    return (
        <div className="card" style={{height: '100%'}}>
            <img src={props.image} className="card-img-top" alt="Card" />
                <div className="card-body">
                    <h3>{props.title}</h3>
                    <p className="card-text">{props.desc}</p>
                </div>
        </div>
    )
};