import React from 'react';
import logo from './logo.svg';
import './App.css';
import StudentPortal from './components/StudentPortal';
import StaffPortal from './components/StaffPortal';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      category: ''
    };
    this.signOutHandler = this.signOutHandler.bind(this);
    this.doSignIn = this.doSignIn.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
  }

  signOutHandler(e) {
    sessionStorage.removeItem('assistToken');
    this.setState({
      isLoggedIn: false,
      category: ''
    });
  }

  doSignIn(category) {
    this.setState({
      isLoggedIn: true,
      category: category
    });
  }

  doSignUp(category) {
    this.setState({
      isLoggedIn: true,
      category: category
    });
  }

  render() {
    const studentPortal = <StudentPortal signOutHandler={this.signOutHandler}/>;
    const staffPortal = <StaffPortal signOutHandler={this.signOutHandler}/>

    const home = (
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container home-desc">
          <h2><strong>Resolve</strong></h2>
          <h4><em>Students Grievance Support System</em></h4>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4 signInUpContainer">
              <SignInForm doSignIn={this.doSignIn}></SignInForm>
            </div>
            <div className="col-md-2">

            </div>
            <div className="col-md-4 signInUpContainer">
              <SignUpForm doSignUp={this.doSignUp}></SignUpForm>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <hr></hr>
        <div className="footer">
          <p>Designed as part of our lab assignment of Software Engineering Lab.</p>
          <p>Designed by: <strong>Team Dextro</strong></p>
          <p>1. Abhishek Aryan BE/10130/17</p>
          <p>2. Rohit Hembrom BE/10131/17</p>
          <p>3. Gaurav Singh BE/10137/17</p>
        </div>
      </div>
    );

    return (
      <div className="container-fluid home">
        {!this.state.isLoggedIn ? home : (this.state.category === 'student' ? studentPortal : staffPortal)}
      </div>
    );
  }
}

export default App;