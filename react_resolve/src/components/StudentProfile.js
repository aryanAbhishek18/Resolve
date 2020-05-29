import React from 'react';
import '../css/Profile.css';
import ChangePassword from './ChangePassword';
import UpdateStudentProfile from './UpdateStudentProfile';


function StudentProfile(props){
    return (
        <div className="container profile-main-div">
            <h3 className="profile-greeting-msg">
                You can view and edit your profile details here.
            </h3>
            <div className="container profile-edit-div">
                <div className="row">
                    <div className="col-md-8">
                        <UpdateStudentProfile /> 
                    </div>
                    <div className="col-md-4">
                        <ChangePassword category='student'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;