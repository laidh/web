import './styles.scss'

export const Build_upCard = (props) => {
    return (
        <div className="build_up">
            <img src={props.image} className="build_upCard" alt="Build_upCard" />
            <div className="texts">
                <h1>Підберемо саме те що потрібно для вас!</h1>
                <p>Допоможемо підібрати ювелірні вироби саме для вас всього за пів години! Проте якщо у нас не вийде МЕГА знижка для вас.</p>
            </div>
        </div>
    );
};