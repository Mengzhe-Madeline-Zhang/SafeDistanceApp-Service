import axios from 'axios'

export const register = newAdmin => {
  return axios
    .post('/admins', {
      first_name: newAdmin.first_name,
      last_name: newAdmin.last_name,
      email: newAdmin.email,
      password: newAdmin.password
    })
    .then(response => {
      console.log(response.data.message)
      return response.data
    })
    .catch(err => {
      console.log(err+" \n admin already exist")
    })
}

export const login = admin => {
  return axios
    .post('/login', {
      email: admin.email,
      password: admin.password
    })
    .then(response => {
      localStorage.setItem('admintoken', response.data)
      if(localStorage.admintoken){
        console.log("111!!!!")
      }
      return response.data
    })
    .catch(err => {
      console.log(err+" \n email or password don't match \n or your account is not activated")
    })
}

export const getProfile = admin => {
  return axios
    .get('admins/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const ValidateEmail = inputText =>
  {
    var mailformat = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if(inputText.value.match(mailformat))
    {
      return true;
    }
    else
    {
      alert("You have entered an invalid email address!");    //The pop up alert for an invalid email address
      return false;
    }
  }

  export const ValidateNotNull = inputText =>
  {
   
    if(inputText.value==='')
    {
      alert("First Name and Last Name can't be null");    //The pop up alert for an invalid first name and last name
      return false;
      
    }
    else
    {
      return true;
    }
  }

  export const ValidatePassword = inputText =>
  {
   
    if(inputText.value.length<6)
    {
      alert("password has at least 6 character or number");    //The pop up alert for an invalid password
      return false;
      
    }
    else
    {
      return true;
    }
  }