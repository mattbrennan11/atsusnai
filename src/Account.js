import React, { Component} from 'react';
import { Auth } from 'aws-amplify'; 
import NavExample from './components/Navbar'
import {Amplify} from 'aws-amplify';
import 'semantic-ui-css/semantic.min.css'
import { Form, Segment} from 'semantic-ui-react';
import aws_exports from './aws-exports';
import {withAuthenticator} from "@aws-amplify/ui-react";
import Button from 'react-bootstrap/Button';
import FooterExample from './components/Footer';
Amplify.configure(aws_exports);

  const isDOB =(dob)=>
  /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(dob);

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
 
class Account extends Component{

  //Uses the auth.deleteuser to delete user's user pool account

  async deleteUser() {
      try {
      const result = await Auth.deleteUser();
      console.log(result);
    } catch (error) {
      console.log('Error deleting user', error);
    }
  }
    
  constructor(props){
    super(props);
    this.state = {
        authState: this.props.authState,
        nickname:'',
        email:'',
        given_name:'',
        middle_name:'',
        family_name:'',
        birthdate:'',
        gender:'',
        phone_number:'',
        address:'',
        picture:'',
    }
}

    componentDidMount() {
      this.findUser();
    }

    findUser(){
      Auth.currentAuthenticatedUser({bypassCache: true})
      .then(user => {
        this.setState({
            authData: user,
            authState: 'signedIn',
            
            nickname: user.attributes.nickname ? user.attributes.nickname : '',
            email:user.attributes.email ? user.attributes.email : '',
            given_name: user.attributes.given_name ? user.attributes.given_name : '',
            middle_name: user.attributes.middle_name ? user.attributes.middle_name : '',
            family_name: user.attributes.family_name ? user.attributes.family_name : '',
            birthdate: user.attributes.birthdate ? user.attributes.birthdate : '',
            gender: user.attributes.gender ? user.attributes.gender : '',
            phone_number: user.attributes.phone_number ? user.attributes.phone_number : '',
            address: user.attributes.address ? user.attributes.address : '',
            picture: user.attributes.picture ? user.attributes.picture : '',

            stateFromStorage: true
        });

          console.log(this.state.authData.nickname);
         
      }).catch(e => {
        this.setState({authState: 'signIn'});
      });
    }    
    
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    handleSubmit = () => {

      if(this.state.nickname.trim() === ""){
        return(
        alert("Nickname cannot be empty"))
      }
     
      if(this.state.given_name.trim()=== ""){
        return(
        alert("First name cannot be empty"))
      }

      //no middle name validation as some people don't have middle names

      if(this.state.family_name.trim()=== ""){
        return(
        alert("Last name cannot be empty"))
      }

      if(this.state.birthdate.trim()=== ""){
        return(
        alert("DOB cannot be empty"))
      }

      if(!isDOB(this.state.birthdate)){
        return(
          alert("DOB not valid.\nPossible Issues:\nDOB must be in the format YYYY-MM-DD\nMonth must be between 1-12\nDay must be between 1-31")
        )
      }

      if(this.state.gender.trim()=== ""){
        return(
        alert("Gender cannot be empty"))
      }


      if(this.state.phone_number.trim()=== ""){
        return(
        alert("Mobile number cannot be empty"))
      }

      if(!this.state.phone_number.match('[0-9]{11}')){
        return(
        alert('Phone number not valid.')
        )
      }
      
      if(!this.state.phone_number.startsWith('+')){
        return(
        alert('Phone number must include the international dialing tone starting with "+44" for UK numbers')
        )
      }

      if(this.state.address.trim()=== ""){
        return(
        alert("Address cannot be empty"))
      }

        Auth.updateUserAttributes(this.state.authData,{
            'nickname': this.state.nickname,
            'email':this.state.email,
            'given_name':this.state.given_name,
            'middle_name':this.state.middle_name,
            'family_name':this.state.family_name,
            'birthdate':this.state.birthdate,
            'gender':this.state.gender,
            'phone_number':this.state.phone_number,
            'address':this.state.address,
        }).catch(e => { 
            console.log('Error updating user: '); 
           
            console.log(e); 
        });
    }
       
    render(){
        
        if(this.state.authData) {} 
        
        const {nickname,email,given_name,middle_name,family_name,birthdate,gender,phone_number,address} = this.state;
        
        return(
          <>
<div className="Faq">
<NavExample />
<div>
<h1>User Profile</h1> 
</div>

<div className="Quiz3"> 

<Segment inverted>
 
<Form onSubmit={this.handleSubmit} inverted size='large'>
    <Form.Group>
      <Form.Input font = "Helvetica Neue" name='nickname' value={nickname} label='Nickname' placeholder='Display name' width={5} onChange={this.handleChange} error={false} />
      <Form.Input font = "Helvetica Neue" name='email' label='Email' value={email} width={5} />
    </Form.Group>
    <Form.Group>
      <Form.Input font = "Helvetica Neue" name='given_name' value={given_name} label='First Name' placeholder='First Name' width={5} onChange={this.handleChange} error={false} />
      <Form.Input font = "Helvetica Neue" name='middle_name' value={middle_name} label='Middle Name' placeholder='Middle Name' width={5} onChange={this.handleChange} error={false} />
      <Form.Input font = "Helvetica Neue" name='family_name' value={family_name} label='Last Name' placeholder='Last Name' width={5} onChange={this.handleChange} error={false} />
    </Form.Group>
    <Form.Group>
      <Form.Input font = "Helvetica Neue" name='birthdate' value={birthdate} label='DOB' placeholder='2002-02-02' width={5} onChange={this.handleChange} error={false} />
      <Form.Select font = "Helvetica Neue" name='gender' value={gender} label='Gender' placeholder='Gender' options={options} width={5} onChange={this.handleChange} error={false} />
    </Form.Group>
    <Form.Group>
      <Form.Input font = "Helvetica Neue" name='phone_number' value={phone_number} label='Mobile Number' placeholder='+447549870334' width={5} onChange={this.handleChange} error={false} />
      <Form.Input font = "Helvetica Neue" name='address' value={address} label='Address' placeholder='2/77 New Street, Newport 3015 Melbourne, Victoria, Australia ' width={10} onChange={this.handleChange} error={false} />
    </Form.Group>
    <br></br>
    <Button font = "Helvetica Neue" onClick={() => window.location.reload(false)} type='submit'>Update Details</Button>
    <Form.Input hidden/>
    <Button font = "Helvetica Neue" onClick={() => {if(window.confirm('Are you sure you want to delete your account?'))
    {Auth.deleteUser()}}} type='submit'>Delete Profile</Button>
  </Form>

</Segment>
</div>
</div>

<footer className="footer--pin">
          <FooterExample />
          </footer>
          </> 
            
);
}}

export default withAuthenticator(Account);