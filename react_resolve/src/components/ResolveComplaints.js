import React from 'react';

import '../css/ResolveComplaints.css';
import ResolveIndividualComplaint from './ResolveIndividualComplaint';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://connect.aryanabhi.in';
}


class ResolveComplaints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allComplaints: [],
            sortedComplaints: [],
            department: 'All departments',
            subCategory: 'All sub categories',
            college: 'All colleges' 
        }

        this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
        this.subCategoryChangeHandler = this.subCategoryChangeHandler.bind(this);
        this.collegeChangeHandler = this.collegeChangeHandler.bind(this);

        this.searchButtonClickHandler = this.searchButtonClickHandler.bind(this);
        this.showAllHandler = this.showAllHandler.bind(this);

        this.ResolveComplaintsHandler = this.ResolveComplaintsHandler.bind(this);
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
    
    searchButtonClickHandler() {
        const sortedComplaints = this.state.allComplaints.filter((complaint)=>{
            if(this.state.department === 'All departments' || this.state.department === complaint.department){
                if(this.state.subCategory === 'All sub categories' || this.state.subCategory === complaint.subCategory) {
                    if(this.state.college === 'All colleges' || this.state.college === complaint.college) {
                        return true;
                    }
                }
            }
            return false;
        });
        this.setState({
            sortedComplaints: sortedComplaints
        });
    }

    showAllHandler() {
        this.setState({
            department: 'All departments',
            subCategory: 'All sub categories',
            college: 'All colleges',
            sortedComplaints: this.state.allComplaints
        }); 
    }


    async ResolveComplaintsHandler(id, message){
        if(!id){
            return alert('Complaint id missing!');
        }
        const token = sessionStorage.getItem('assistToken');
        if(!token) {
            return alert('Token missing! Please sign out and sign in again.');
        }
        else{
            try {
                const url1 = URL + '/api/complaint/resolveComplaint';
                const res1 = await fetch(url1, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: id, 
                        resolveMessage: message,
                        token: sessionStorage.getItem('assistToken')
                    })
                });
                const data1 = await res1.json();
                if (data1.status !== 200) {
                    return alert(data1.message);
                }
                
                alert(data1.message);


                //complaint already resolved..now fetch fresh pending ones

                const url2 = URL + '/api/complaint/getPendingComplaints';
                const res2 = await fetch(url2, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        token: sessionStorage.getItem('assistToken')
                    })
                });
                const data2 = await res2.json();
                if (data2.status !== 200) {
                    return alert(data2.message);
                }
                
                this.setState({
                    allComplaints: data2.pendingComplaints,
                    sortedComplaints: data2.pendingComplaints
                });


            } catch (e) {
                alert(e.message);
            }
        }
    }


    async componentDidMount() {
        const token = sessionStorage.getItem('assistToken');
        if(!token) {
            return alert('Token missing! Please sign out and sign in again.');
        }
        else{
            try {
                const url = URL + '/api/complaint/getPendingComplaints';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        token: sessionStorage.getItem('assistToken')
                    })
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                this.setState({
                    allComplaints: data.pendingComplaints,
                    sortedComplaints: data.pendingComplaints
                });

            } catch (e) {
                alert(e.message);
            }
        }
    }


    render() {
        
        const pending = this.state.sortedComplaints.map((complaint, key)=>{
            return (<ResolveIndividualComplaint 
                key={key} 
                id={complaint._id}
                department={complaint.department}
                subCategory={complaint.subCategory}
                college={complaint.college}
                message={complaint.message}
                feedback={complaint.resolveMessage}
                dateCreated={complaint.dateCreated}
                dateResolved={complaint.dateResolved}
                resolveHandler={this.ResolveComplaintsHandler}
            />);
        })

        return (
            <div className="container resolve-complaints-div">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="col-form-label">Department:</label>
                            <select className="form-control" value={this.state.department} onChange={this.departmentChangeHandler}>
                                <option value="All departments">All departments</option>
                                <option value="CSE">CSE</option>
                                <option value="MECH">MECH</option>
                                <option value="ECE">ECE</option>
                                <option value="IT">IT</option>
                                <option value="CIVIL">CIVIL</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="col-form-label">Sub Category:</label>
                            <select className="form-control" value={this.state.subCategory} onChange={this.subCategoryChangeHandler}>
                                <option value="All sub categories">All sub categories</option>
                                <option value="Admission">Admission</option>
                                <option value="Finance">Finance</option>
                                <option value="Examination">Examination</option>
                                <option value="Timetable">Timetable</option>
                                <option value="Paper Re-evaluation">Paper Re-evaluation</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="col-form-label">College:</label>
                            <select className="form-control" value={this.state.college} onChange={this.collegeChangeHandler}>
                                <option value="All colleges">All colleges</option>
                                <option value="BIT Mesra">BIT Mesra</option>
                                <option value="BIT Patna">BIT Patna</option>
                                <option value="BIT Lalpur">BIT Lalpur</option>
                                <option value="BIT Sindri">BIT Sindri</option>
                                <option value="BIT Deoghar">BIT Deoghar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 resolve-complaints-buttons">
                        <span className="search-buttons-span">
                            <button className="btn btn-primary" onClick={this.searchButtonClickHandler}>Search</button>
                        </span>
                        <span className="search-buttons-span">
                            <button className="btn btn-success" onClick={this.showAllHandler}>Show All</button>
                        </span>
                    </div>
                </div>
                <div className="all-complaints-div">
                    <h3 className="resolve-complaints-msg">You can see and resolve all the pending complaints here.</h3>
                    <div className="row">
                        {pending}
                    </div>
                </div>
            </div>
        );
    }
}


export default ResolveComplaints;