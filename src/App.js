import React,{useEffect,useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
//import jwtDecode from 'jwt-decode'
import auth from './services/authService'
import Customers from './components/customers';
import LoginForm from './components/loginForm';
import MovieForm from './components/movieForm';
import Movies from './components/movies'
import NavBar from './components/navBar';
import NotFound from './components/notFound';
import Register from './components/register';
import Rentals from './components/rentals';
import Logout from './components/logout';
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const [state,setState] = useState({})
  //const user = state.user
  
  useEffect(()=>{
    try{
      // const jwt = localStorage.getItem("token")
      // const user = jwtDecode(jwt)
      const user = auth.getCurrentUser()
      if(user){
        setState({user})
      }
      else{
        setState({})
      }
      //console.log('state',state)
    
    }catch(ex){}
  },[])

  console.log('Render app.js')


  return (
    <React.Fragment>
      <NavBar user ={state.user}/>
      <main className="container">
      <Switch>
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={Register} />

        <ProtectedRoute path='/movies/:id' component={MovieForm}/>
        {/* <Route 
            path='/movies/:id' render={props =>{
              if(!user) return <Redirect to='/login'/>
              return <MovieForm {...props}/>
            }}/>
        */}
        <Route path='/movies' render={props => <Movies {...props} user ={state.user}/>} />
        <Route path='/customers' component={Customers} />
        <Route path='/rentals' component={Rentals} />
        <Route path='/logout' component={Logout} />
        <Route path='/not-found' component={NotFound} />
        <Redirect exact from='/' to='/movies' />
        <Redirect to='/not-found' />
      </Switch>
    </main>
    </React.Fragment>
  );
}

export default App;
