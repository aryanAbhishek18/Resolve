import React from 'react';

class ResolveIndividualComplaint extends React.Component {
    //props.resolveHandler()
    constructor(props) {
        super(props);
        this.state={
            message: ''
        }

        this.clearButtonHandler = this.clearButtonHandler.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.resolveButtonHandler = this.resolveButtonHandler.bind(this);
    }

    messageChangeHandler(event){
        this.setState({
            message: event.target.value
        });
    }

    clearButtonHandler(event) {
        this.setState({
            message: ''
        });
    }

    resolveButtonHandler() {
        const message = this.state.message.trim();
        if(!message) {
            return alert('Resolve message cant be empty!');
        }
        this.props.resolveHandler(this.props.id, message);
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="indiv-complaint-wrapper">
                    <div className="indiv-complaint">
                        <p><strong>Created: </strong>{this.props.dateCreated}</p>
                        <p><strong>Department: </strong>{this.props.department}</p>
                        <p><strong>Sub Category: </strong>{this.props.subCategory}</p>
                        <p><strong>College: </strong>{this.props.college}</p>
                        <p><strong>Message: </strong>{this.props.message}</p>
                        <div className="form-group indiv-complaint-textarea">
                            <label className="col-form-label"><strong>Resolve message:</strong></label>
                            <textarea className="form-control" value={this.state.message} onChange={this.messageChangeHandler}></textarea>
                        </div>
                        <div className="resolve-complaints-buttons">
                            <span><button className="btn btn-warning" onClick={this.clearButtonHandler}>Clear</button></span>
                            <span><button className="btn btn-success" onClick={this.resolveButtonHandler}>Resolve</button></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ResolveIndividualComplaint;