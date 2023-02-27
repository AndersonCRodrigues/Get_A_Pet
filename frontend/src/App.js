import { Switch, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext';

import Navbar from './components/layouts/Navbar';
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Message from './components/layouts/Message';

import Home from './components/pages/Home';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pets/MyPets';
import AddPet from './components/pages/Pets/AddPet';
import EditPet from './components/pages/Pets/EditPet';
import PetDetails from './components/pages/Pets/PetDetails';
import MyAdoptions from './components/pages/Pets/MyAdoptions';


function App() {
  return (
    <UserProvider>
    <Navbar/>
    <Message />
    <Container>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/user/profile' component={Profile} />
        <Route exact path='/pet/mypets' component={MyPets} />
        <Route exact path='/pet/add' component={AddPet} />
        <Route exact path='/pet/edit/:id' component={EditPet} />
        <Route exact path='/pet/myadoptions' component={MyAdoptions} />
        <Route exact path='/pet/:id' component={PetDetails} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Container>
    <Footer/>
    </UserProvider>
  );
}

export default App;
