import React from 'react';
import '../css/SignInUpForm.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://resolve.aryanabhi.in';
}

class SignInForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            category: 'student',
            errorMsg: ''
        };
        this.signInHandler = this.signInHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    }

    categoryChangeHandler (event) {
        this.setState({
            category: event.target.value
        });
    }

    emailChangeHandler(event) {
        this.setState({
            email: event.target.value
        });
    }

    passwordChangeHandler(event) {
        this.setState({
            password: event.target.value
        });
    }

    async signInHandler(event) {
        //check sign in details and verify with database, then call doSignIn
        event.preventDefault();
        let email = this.state.email.trim();
        let password = this.state.password.trim();
        if(!email) {
            this.setState({
                errorMsg: 'Email empty!'
            });
        }
        else if(!password) {
            this.setState({
                errorMsg: 'Password empty!'
            });
        }
        else{
            this.setState({
                errorMsg: ''
            });
            try {
                const url = URL + '/api/authenticate/signIn';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        email: this.state.email,
                        password: this.state.password,
                        category: this.state.category
                    }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                const token = data.token;
                sessionStorage.setItem('assistToken', token);

                this.props.doSignIn(this.state.category);

            } catch (e) {
                alert(e.message);
            }

        }
        
    }

    render(){
        return (
            <div className="container signInUpDiv">
                <form noValidate>
                    <div className="form-group">
                        <label className="col-form-label">Category:</label>
                        <select className="form-control" value={this.state.category} onChange={this.categoryChangeHandler}>
                            <option value="student">Student</option>
                            <option value="administration">Administration</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Email:</label>
                        <input type="email" className="form-control" onChange={this.emailChangeHandler} id="signIn-email" required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Password:</label>
                        <input type="password" className="form-control" onChange={this.passwordChangeHandler} id="signIn-password" required="required"></input>
                    </div>
                    <p className='errorMsg'>{this.state.errorMsg}</p>
                    <span><button type="submit" className="btn btn-outline-info" onClick={this.signInHandler}>Sign In</button></span>
                </form>
            </div>
        );
    }
}

export default SignInForm;