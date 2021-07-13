import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
/* Name
 Email
 Password
 Terms of Service (checkbox)
 A Submit button to send our form data to the server.*/
let schema = yup.object().shape({
    user: yup.string().required("Please Enter Name"),
    email: yup.string().required("Please Enter an email Address").email(),
    password: yup.string().required("Please Enter a password").min(8, "Enter at least 8 Characters"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    TermsOfService: yup.boolean().required("Please Agree to the Terms of Service"),

})

export default function Form()
{
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        user: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        TermsOfService: false
    });

    const [errors, setErrors] = useState({
        user: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        TermsOfService: false
    });

    const [disabled, setDisabled] = useState(true);
    
    const setFormErrors = (name, value) => {
        //console.log(name)
        yup
        .reach(schema, name)
        .validate(value)
        .then(() => setErrors({...errors, [name]: ""}))
        .catch((err) => setErrors({...errors, [name]: err.errors[0]}))
    }

    const onChange = (e) => 
    {
        const { name, type, value, checked } = e.target;

        /*console.log(name);
        console.log(type);
        console.log(value);
        console.log(checked);*/

        const realValue = type === "checkbox" ? checked : value;

        setFormErrors(name, realValue);
        setForm({...form, [name]: realValue });
        console.log(`${name} of type ${type} has changed to ${realValue}`)
    };
    const submit = (e) => {
        e.preventDefault()
    }

    return(
        
<div className = "form container">
    <form onSubmit={submit}>
    <div className = "form box">
    <label>
        User:
        <input type = "text" name = "user" onChange={onChange}/>
    </label>
    <label>
        Email:
        <input type="text" name="email" onChange={onChange}/>
    </label>
    <label> 
        Password:
            <input type="text" name="password" onChange={onChange}/>
    </label>
    <label>
        Password Confirmation:
        <input type = "text" name = "passwordConfirmation" onChange={onChange}/>
    </label>
    <label>
        Terms of Service
        <input type = "checkbox" name = "TermsOfService" onChange={onChange}/>
    </label>
    </div>
    <div className="submitButton">
        <button>Submit</button>
    </div>
            </form>
</div>

    )
}