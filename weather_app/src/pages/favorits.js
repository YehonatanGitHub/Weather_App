import React from "react";
import { Redirect } from "react-router-dom";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      favorites: [],
      message: "",
      localStorageEmpty: true
    };
  }
  setRedirect = (e, data) => {
    this.setState({
      redirect: true
    });
    // set fromFavorits to 1
    console.log(data);

    var arr = this.state.favorites;
    var indexlocation = arr.findIndex(x => x.cityId === data);
    arr[indexlocation].fromFavorits = 1;
    console.log("this is the new arr", arr);
    console.log("arr location", indexlocation);
    localStorage.setItem("listOfFollowers", JSON.stringify(arr));
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  componentDidMount() {
    var getLocalStorage = JSON.parse(localStorage.getItem("listOfFollowers"));
    console.log("getLocalStorage", getLocalStorage);
    this.setState({ favorites: getLocalStorage });
    if (
      getLocalStorage === undefined ||
      getLocalStorage === null ||
      getLocalStorage.length === 0
    ) {
      this.setState({ localStorageEmpty: false });
      this.setState({
        message:
          "No cities have been selected as favorite. please go to the Home page to add some"
      });
    } else {
      this.setState({ message: "" });
    }
  }

  render() {
    const localStorageEmpty = this.state.localStorageEmpty;
    let incenrtToHtml;

    if (localStorageEmpty) {
      incenrtToHtml = (
        <div className="card-deck" style={{ maxWidth: "100%" }}>
          {this.state.favorites.map((city, i) => {
            console.log("map favorites ", this.state.favorites);
            return (
              <div key={city.cityId}>
                {this.renderRedirect()}
                <button
                  className="card text-white bg-info"
                  onClick={e => this.setRedirect(e, city.cityId)}
                  id={city.cityId}
                >
                  <div className="card-body text-center">
                    <p className="card-text">{city.defaultCity}</p>
                    <p className="card-text">{city.cityMaxTemp + "° c"}</p>
                    <p className="card-text">{city.cityPhrase}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    const divStyle = {
      marginTop: "50px",
      maxWidth: "100%"
    };
    const divMessage = {
      color: "red"
    };
    // const card = {
    //   maxWidth: "100%"
    // };
    // const cardText = {
    //   wordWrap: "break-word"
    // };

    return (
      <div>
        <div className="row justify-content-center" style={divStyle}>
          <h3 style={divMessage}>{this.state.message}</h3>
          {incenrtToHtml}
        </div>
      </div>
    );
  }
}

export default Favorites;
