import React from 'react';
import '../css/ComplaintStatus.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://connect.aryanabhi.in';
}


function PendingComplaint(props) {
    return (
        <div className="indiv-complaint-wrapper">
            <div className="indiv-complaint">
                <p><strong>Created: </strong>{props.dateCreated}</p>
                <p><strong>Department: </strong>{props.department}</p>
                <p><strong>Sub Category: </strong>{props.subCategory}</p>
                <p><strong>College: </strong>{props.college}</p>
                <p><strong>Message: </strong>{props.message}</p>
            </div>
        </div>
    );
}

function ResolvedComplaint(props) {
    return (
        <div className="indiv-complaint-wrapper">
            <div className="indiv-complaint">
                <p><strong>Created: </strong>{props.dateCreated}</p>
                <p><strong>Department: </strong>{props.department}</p>
                <p><strong>Sub Category: </strong>{props.subCategory}</p>
                <p><strong>College: </strong>{props.college}</p>
                <p><strong>Message: </strong>{props.message}</p>
                <p><strong>Resolved: </strong>{props.dateResolved}</p>
                <p><strong>Feedback: </strong>{props.feedback}</p>
            </div>
        </div>
    );
}


class PostComplaint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            complaints: []
        }
    }

    async componentDidMount() {
        const token = sessionStorage.getItem('assistToken');
        if(!token) {
            return alert('Token missing! Please sign out and sign in again.');
        }
        else{
            try {
                const url = URL + '/api/complaint/getComplaints';
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
                    complaints: data.complaints
                });

            } catch (e) {
                alert(e.message);
            }
        }
    }


    render() {

        let pending = [];
        let resolved = [];

        this.state.complaints.forEach((complaint)=>{
            if(complaint.resolved){
                resolved.push(<ResolvedComplaint 
                    key={complaint._id} 
                    department={complaint.department}
                    subCategory={complaint.subCategory}
                    college={complaint.college}
                    message={complaint.message}
                    feedback={complaint.resolveMessage}
                    dateCreated={complaint.dateCreated}
                    dateResolved={complaint.dateResolved}
                />);
            }
            else{
                pending.push(<PendingComplaint 
                    key={complaint._id} 
                    department={complaint.department}
                    subCategory={complaint.subCategory}
                    college={complaint.college}
                    message={complaint.message}
                    feedback={complaint.resolveMessage}
                    dateCreated={complaint.dateCreated}
                    dateResolved={complaint.dateResolved}
                />);
            }
        });

        return (
            <div className="container complaints-div">
                <h3>You can see the status of all your complaints here.</h3>
                <div className="row">
                    <div className="col-md-6">
                        <h5>Pending complaints: </h5>
                        <div className="pending-complaints-div">
                            {pending}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5>Resolved complaints: </h5>
                        <div className="resolved-complaints-div">
                            {resolved}
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}


export default PostComplaint;