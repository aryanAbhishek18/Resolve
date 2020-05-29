import React from 'react';
import '../css/PostComplaint.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://connect.aryanabhi.in';
}

class PostComplaint extends React.Component {
    //props.name
    //props.email
    //props.roll
    constructor(props) {
        super(props);
        this.state = {
            department: 'CSE',
            subCategory: 'Admission',
            college: 'BIT Mesra',
            message: ''
        }

        this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
        this.subCategoryChangeHandler = this.subCategoryChangeHandler.bind(this);
        this.collegeChangeHandler = this.collegeChangeHandler.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.messageClearHandler = this.messageClearHandler.bind(this);

        this.postComplaintHandler = this.postComplaintHandler.bind(this);

    }

    departmentChangeHandler(event) {
        this.setState({
            department: event.target.value
        });
    }

    subCategoryChangeHandler(event) {
        this.setState({
            subCategory: event.target.value
        });
    }

    collegeChangeHandler(event) {
        this.setState({
            college: event.target.value
        });
    }

    messageChangeHandler(event) {
        this.setState({
            message: event.target.value
        });
    }

    messageClearHandler() {
        this.setState({
            message: ''
        });
    }

    async postComplaintHandler() {
        const message = this.state.message.trim();
        if(!message) {
            return alert('Complaint message cant be empty!!');
        }
        else{
            try {
                const url = URL + '/api/complaint/postComplaint';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        name: this.props.name,
                        email: this.props.email,
                        roll: this.props.roll,
                        department: this.state.department,
                        subCategory: this.state.subCategory,
                        college: this.state.college,
                        message: message,
                        token: sessionStorage.getItem('assistToken')
                    })
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                alert(data.message);
                this.setState({
                    department: 'ECE',
                    subCategory: 'Admission',
                    college: 'BIT Mesra',
                    message: ''
                });

            } catch (e) {
                alert(e.message);
            }
        }
    }

    render() {
        return (
            <div className="container post-complaint-div">

                    <h3>You can post complaints here.</h3>
                    <div className="form-group">
                        <label className="col-form-label">Department:</label>
                        <select className="form-control" value={this.state.department} onChange={this.departmentChangeHandler}>
                            <option value="CSE">CSE</option>
                            <option value="MECH">MECH</option>
                            <option value="ECE">ECE</option>
                            <option value="IT">IT</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Sub Category:</label>
                        <select className="form-control" value={this.state.subCategory} onChange={this.subCategoryChangeHandler}>
                            <option value="Admission">Admission</option>
                            <option value="Finance">Finance</option>
                            <option value="Examination">Examination</option>
                            <option value="Timetable">Timetable</option>
                            <option value="Paper Re-evaluation">Paper Re-evaluation</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">College:</label>
                        <select className="form-control" value={this.state.college} onChange={this.collegeChangeHandler}>
                            <option value="BIT Mesra">BIT Mesra</option>
                            <option value="BIT Patna">BIT Patna</option>
                            <option value="BIT Lalpur">BIT Lalpur</option>
                            <option value="BIT Sindri">BIT Sindri</option>
                            <option value="BIT Deoghar">BIT Deoghar</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Complaint Message:</label>
                        <textarea className="form-control" value={this.state.message} onChange={this.messageChangeHandler}></textarea>
                    </div>
                    <div className="form-group post-complaints-buttons">
                        <span><button className="btn btn-warning" onClick={this.messageClearHandler}>Clear</button></span>
                        <span><button className="btn btn-success" onClick={this.postComplaintHandler}>Send</button></span>
                    </div>
            </div>
        );
    }
}


export default PostComplaint;