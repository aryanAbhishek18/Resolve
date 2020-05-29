import React from 'react';
import logo from '../logo.svg';
import '../css/Portal.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


import StaffHome from '../components/StaffHome';
import StaffProfile from '../components/StaffProfile';
import ResolveComplaints from '../components/ResolveComplaints';


let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://connect.aryanabhi.in';
}

class StaffPortal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: ''
      };
    }

    async componentDidMount() {
      try{
        const token = sessionStorage.getItem('assistToken');
        if(!token) {
          return alert('Token missing! Please sign out and sign in again!!');
          //do sign out
        }

        const url = URL + '/api/profile/getProfile';
        const res = await fetch(url, {  
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            category: 'administration',
            token: sessionStorage.getItem('assistToken')
          })
        });

        const data = await res.json();
        if(data.status !== 200) {
          return alert(data.message);
          //do sign out
        }

        else {
          this.setState({
            name: data.user.name,
            email: data.user.email
          });
        }

      }catch(e){
        return alert('There was some error! Please sign out and sign in again!!');
      }
    }

    render() {
        return (
          
          <Router>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light">
                <span className="navbar-brand nav-logo">
                  <img src={logo} className="Portal-logo" alt="logo" />
                  <h2>RESOLVE</h2>
                </span>
                <button className="navbar-toggler portal-navbar-toggle-btn" type="button" data-toggle="collapse" data-target="#navbarTogglerPortal" aria-controls="navbarTogglerPortal" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerPortal">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/complaints">Complaints</Link>
                    </li>
                  </ul>
                  <span className="form-inline my-2 my-lg-0">
                    <button className="btn btn-warning" onClick={this.props.signOutHandler}>Sign Out</button>
                  </span>
                </div>
              </nav>
        
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/complaints">
                <ResolveComplaints name={this.state.name} email={this.state.email}  category='administration'/>
              </Route>
              <Route path="/profile">
                <StaffProfile name={this.state.name} email={this.state.email}  category='administration'/>
              </Route>
              <Route path="/">
                <StaffHome name={this.state.name} category='administration'/>
              </Route>
            </Switch>
          </div>
        </Router>

        );
    }
}

export default StaffPortal;





