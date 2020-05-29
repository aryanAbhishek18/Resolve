import React from 'react';
import '../css/ChangePassword.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://resolve.aryanabhi.in';
}

class UpdateStaffProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            staffId: '',
            department: '',
            college: '',
            address: '',
            phone: ''
        };
        this.staffIdChangeHandler = this.staffIdChangeHandler.bind(this);
        this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
        this.collegeChangeHandler = this.collegeChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);

        this.updateProfileHandler = this.updateProfileHandler.bind(this);
    }

    staffIdChangeHandler(event) {
        this.setState({
            staffId: event.target.value
        });
    }

    departmentChangeHandler(event) {
        this.setState({
            department: event.target.value
        });
    }

    collegeChangeHandler(event) {
        this.setState({
            college: event.target.value
        });
    }

    addressChangeHandler(event) {
        this.setState({
            address: event.target.value
        });
    }

    phoneChangeHandler(event) {
        this.setState({
            phone: event.target.value
        });
    }


    async componentDidMount() {
        try{
            const token = sessionStorage.getItem('assistToken');
            if(!token){
                return alert('Token missing! Please sign out and sign in again!');
            }
            else{
                const url = URL + '/api/profile/getProfile'
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        category: 'administration',
                        token: sessionStorage.getItem('assistToken')
                    }),
                });

                const data = await res.json();
                if(data.status !== 200) {
                    alert(data.message);
                    alert('There was some error! Please sign out and sign in again.');
                }
                else{
                    const name = data.user.name;
                    const email = data.user.email;
                    const staffId = data.user.staffId;
                    const department = data.user.department;
                    const college = data.user.college;
                    const address = data.user.address;
                    const phone = data.user.phone;
                    

                    this.setState({
                        name: name,
                        email: email,
                        staffId: staffId,
                        department: department,
                        college: college,
                        address: address,
                        phone: phone
                    });
                }
            }
        }catch(e){
            alert('There was some error! Please sign out and sign in again.');
        }
    }

    async updateProfileHandler(event) {
        //check sign in details and verify with database, then call doSignIn
        event.preventDefault();
        let staffId = this.state.staffId.trim();
        let department = this.state.department.trim();
        let college = this.state.college.trim();
        let address = this.state.address.trim();
        let phone = this.state.phone.trim();

        if(!staffId) {
            alert('Staff Id empty!')
        }
        else if(!department) {
            alert('Department empty!');
        }
        else if(!college) {
            alert('College empty!');
        }
        else if(!address) {
            alert('Address empty!');
        }
        else if(!phone) {
            alert('Phone empty!');
        }
        else{
            try {
                const url = URL + '/api/profile/updateProfile';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        staffId: staffId,
                        department: department,
                        college: college,
                        address: address,
                        phone: phone,
                        category: 'administration',
                        token: sessionStorage.getItem('assistToken') 
                    }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                alert('Profile updated successfully!!');

            } catch (e) {
                alert(e.message);
            }

        }
        
    }

    render(){
        return (
            <div className="container change-pass-div">
                <form noValidate>
                    <div className="form-group">
                        <label className="col-form-label">Name:</label>
                        <input type="text" className="form-control" value={this.state.name} disabled={true} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Email:</label>
                        <input type="text" className="form-control" value={this.state.email} disabled={true} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Staff Id:</label>
                        <input type="text" className="form-control" value={this.state.staffId} onChange={this.staffIdChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Department:</label>
                        <input type="text" className="form-control" value={this.state.department} onChange={this.departmentChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">College:</label>
                        <input type="text" className="form-control" value={this.state.college} onChange={this.collegeChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Address:</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.addressChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Phone Number:</label>
                        <input type="text" className="form-control" value={this.state.phone} onChange={this.phoneChangeHandler} required="required"></input>
                    </div>
                    
                    <span><button type="submit" className="btn btn-outline-info" onClick={this.updateProfileHandler}>Update</button></span>
                </form>
            </div>
        );
    }
}

export default UpdateStaffProfile;