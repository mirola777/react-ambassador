import axios from "axios";
import { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";
import Header from "./Header";
import Nav from "./Nav";

const Layout = (props: any) => {
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users/user");

        props.setUser(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  let header;

  if (location.pathname === "/" || location.pathname === "/backend") {
    header = <Header />;
  }

  return (
    <div>
      <Nav />

      <main>
        {header}

        <div className="album py-5 bg-light">
          <div className="container">{props.children}</div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
