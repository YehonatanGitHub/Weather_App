import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Favorites from '../pages/favorits';
import Home from '../pages/home';

function Navbar(props) {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <Link to="/Weather_App" className="nav-link">
            <h2>My Weather App123</h2>
          </Link>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites/" className="nav-link">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/favorites/" exact component={Favorites} />
      </div>
    </Router>
  );
}

export default Navbar;
