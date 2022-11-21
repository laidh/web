import {Header} from "./Header";
import {Main} from "./Main";
import {Footer} from "./Footer";

export const Layout = (props) => {
    return (
        <div className="container">
          <Header />
          <Main>
              {props.children}
          </Main>
          <Footer />
        </div>
    );
};