import React from 'react'

class Loguot extends React.Component{
    componentDidMount(){
        localStorage.removeItem('token')
        window.location = " / "
    }
    render(){
        return null
    }
}

export default Loguot