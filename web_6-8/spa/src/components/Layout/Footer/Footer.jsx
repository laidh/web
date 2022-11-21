import './styles.scss'
import youtube from '../../../assets/icons/youtube.svg'
import facebook from '../../../assets/icons/facebook.svg'
import phone from '../../../assets/icons/phone.svg'

export const Footer = () => {
    return (
            <footer>
                <div className="row justify-content-between">
                    <div className="col">
                        <div className="subtext">
                            <p>two thousand of clients
                                were ordering only
                                for last month</p>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img className="logo"src="https://fortay.co/assets/images/partners/Gem.svg" alt="gems-logo" />
                    </div>
                    <div className="col d-flex justify-content-end">
                        <a href="/"><img src={youtube} className="icon"/></a>
                        <a href="/"><img src={facebook} className="icon"/></a>
                        <a href="/"><img src={phone} className="icon"/></a>
                    </div>
                </div>
            </footer>
    );
};