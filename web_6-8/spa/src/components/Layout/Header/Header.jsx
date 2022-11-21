import {Nav} from '../Nav'
import './styles.scss'

export const Header = () => {
    return (
            <header className="row ">
                    <div className="col-12 col-md-6 d-flex align-items-center">
                        <img className="logo"src="https://fortay.co/assets/images/partners/Gem.svg" alt="gems-logo"/>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center"><Nav /></div>
            </header>
    );
};