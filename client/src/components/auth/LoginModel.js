import React,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    NavLink,
    Alert,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
class LoginModel extends Component{
    state={
        model:false,
        email:'',
        password:'',
        msg:null
    };
    static propTypes = {
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired
    };
    componentDidUpdate(prevProps){
        const isAuthenticated = this.props.isAuthenticated;
        const error = this.props.error;
        
        if(error !== prevProps.error){
            //check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            }else{
                this.setState({msg:null});
            }
        }
      //  console.log(this.props.isAuthenticated);
        //if authenticated , close model
        if(this.state.model){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }
      toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
        model:!this.state.model,
    });
  };
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onSubmit = e => {
        e.preventDefault();
        const {email,password} =this.state;
        const user = {
            email,
            password
        }
       
        //attempt login
        this.props.login(user);
      };
    render(){
        return (
            <div>
                     <NavLink onClick={this.toggle} href='#'>
                        Login
                     </NavLink>
                    <Modal
                    isOpen={this.state.model}
                    toggle = {this.toggle}
                    >
                        <ModalHeader toggle= {this.toggle}>
                        Login
                        </ModalHeader>
                        <ModalBody>
                          {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                            ) : null}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    

                                    <Label for="email">Email</Label>
                                    <Input 
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="mb-3"
                                        placeholder="Email"
                                        onChange={this.onChange}
                                        />

                                    <Label for="password">Password</Label>
                                    <Input 
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="mb-3"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                        />        
                                    <Button color="dark" style={{margin:'2rem'}} block>
                                    Login
                                    </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>

                    </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });

export default connect(
    mapStateToProps,
    { login, clearErrors }
  )(LoginModel);