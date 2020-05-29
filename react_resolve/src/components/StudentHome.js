import React from 'react';
import '../css/Home.css';

function StudentHome(props){
    return (
        <div className="container home-div">
            <h2 className="home-greeting-msg">
                Hello {props.name}!
            </h2>
            <h4>Welcome to student's portal of Resolve!</h4>
            <br></br>
            <br></br>
            <h5>Resolve is a prototype of a Student's Grievance Support System.</h5>
            <br></br>
            <br></br>
            <div className="resolve-features-div">
                <h5>It supports following features: </h5>
                <p>* Sign Up</p>
                <p>* Sign In</p>
                <p>* Own profile viewing and updating</p>
                <p>* Posting complaints while choosing between several departments and sub categories <em>[<strong>Only for students</strong>]</em></p>
                <p>* Viewing pending and resloved complaints <em>[<strong>Only for students</strong>]</em></p>
                <p>* Viewing pending complaints <em>[<strong>Only for Administration staffs</strong>]</em></p>
                <p>* Resolving pending complaints <em>[<strong>Only for Administration staffs</strong>]</em></p>
            </div>
            
        </div>
    );
}

export default StudentHome;