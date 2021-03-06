import React,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
class ItemModel extends Component{
    state={
        model:false,
        name:''
    }
    toggle = ()=>{
        this.setState({
            model : !this.state.model
        });
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onSubmit = e =>{
        e.preventDefault();
        const newItem={
            name : this.state.name
        }
        //add item via addItem action
        this.props.addItem(newItem);
        this.toggle();
    }
    render(){
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom:'2rem'}}
                     onClick = {this.toggle}
                    >Add Item</Button>
                    <Modal
                    isOpen={this.state.model}
                    toggle = {this.toggle}
                    >
                        <ModalHeader toggle= {this.toggle}>
                            Add To Shopping List
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="Item">Item</Label>
                                    <Input 
                                        type="text"
                                        name="name"
                                        id="item"
                                        placeholder="Add shopping item"
                                        onChange={this.onChange}
                                        />
                                    <Button color="dark" style={{margin:'2rem'}} block>
                                        Add Item
                                    </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>

                    </Modal>
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    item: state.item
});
export default connect(
    mapStateToProps,
    {addItem}
)(ItemModel);