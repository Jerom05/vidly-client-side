import React from 'react'
import {Route, Link} from 'react-router-dom'

const Home = ()=>{
    return(
        <div>
            Home
        </div>
    )
}

const About = ()=>{
    return(
        <div>
            Hello Jerom
        </div>
    )
}

const History = ()=>{
    return(
        <div>
            History
        </div>
    )
}

const Routes = ()=>{
    return(
        <div>
            <div>
                <Link to='/Home'>Home </Link>
                <Link to='/About'>About </Link>
                <Link to='/History'>History </Link>
            </div>
            <Route path='/Home' component= {Home}/>
            <Route path='/About' component= {About}/>
            <Route path='/History' component= {History}/>
        </div>
    )
}

export default Routes