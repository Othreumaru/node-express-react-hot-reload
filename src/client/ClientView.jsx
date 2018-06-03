import React from 'react';

class ClientView extends React.Component {

    constructor() {
        super()
        this.state = {message: ''}
    }


    componentDidMount(){
        setTimeout(this.fetchServerMessage, 1000)
    }

    fetchServerMessage = () => {
        fetch('http://localhost:8080/getMessage').then((resp) =>{
            return resp.text();
        }).then((message) =>{
            this.setState({...this.state, message})
            setTimeout(this.fetchServerMessage, 1000)
        })
    }

    render(){
        return (
            <div>Server says: {this.state.message}</div>
        )
    }
}

export default ClientView