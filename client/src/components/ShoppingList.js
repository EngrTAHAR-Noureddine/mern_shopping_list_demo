import React , { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux';
import {getItem} from '../actions/itemActions';
import PropTypes from 'prop-types';
class ShoppingList extends Component{  
    componentDidMount(){
        // call when mount the page
        this.props.getItem();
    }
    render() {
        const {items} = this.props.item; // to get list from prop that is state 
        return (
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom:'2rem'}}
                    onClick = {()=>{
                        const name = prompt('Enter Item');
                        if(name){
                            this.setState(state=>({
                                items:[...state.items,{id:uuidv4(),name}]
                            }));
                        }
                    }}
                    >Add Item</Button>
                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            {
                                items.map(({id,name})=>(
                                    <CSSTransition key={id} timeout={500} classNames="fade">
                                        <ListGroupItem>
                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={()=>{
                                                    this.setState(state=>({
                                                        items:state.items.filter(item=>item.id!==id)
                                                    }))
                                                }}
                                                >&times;</Button>
                                                
                                                {name}
                                        </ListGroupItem>
                                    </CSSTransition>
                                ))
                            }

                        </TransitionGroup>
                    </ListGroup>
            </Container>
        );
    }

}

ShoppingList.propTypes = { // define types because redux return to prop
    getItem : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    item: state.item
});
//* connect react UI with redux by connect(redux-stuff)(reactComponenet-stuff)
// redux-stuff such as : func to return state to props for connecting with react
// second pram is actions 
export default connect(mapStateToProps,{getItem})(ShoppingList);
