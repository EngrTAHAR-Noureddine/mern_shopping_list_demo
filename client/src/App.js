import React,{Component} from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemModel from './components/itemModel';
import {Container} from 'reactstrap'; 
import {Provider} from 'react-redux';
import store from './store';

class App extends Component{
  render(){
            return (
              <Provider store = {store}>
                  <div className="App">
                      <AppNavbar/>
                      <Container>
                        <ItemModel/>
                        <ShoppingList/>
                      </Container>
                  </div>
              </Provider>
            );
          }
}

export default App;
