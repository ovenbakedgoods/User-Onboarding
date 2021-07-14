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
    passwordConfirmation: yup.string().required("Please Enter a password").min(8, "Enter at least 8 Characters")//.oneOf([yup.ref('password')], 'Passwords must match'),
    ,TermsOfService: yup.bool().oneOf([true], 'Must Agree to terms of service'),

})

export default function Form()
{
    const [users, setUsers] = useState([]);

    const initialFormValues = 
    {
        user: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        TermsOfService: false
    }

    const [form, setForm] = useState(initialFormValues);

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

        const realValue = type === "checkbox" ? checked : value;

        setFormErrors(name, realValue);
        setForm({...form, [name]: realValue });
        console.log(`${name} of type ${type} has changed to ${realValue}`)
    };
    const submit = (e) => {
        e.preventDefault();
        
        const newUser = {
            user: form.user.trim(),
            email: form.email.trim(),
            password: form.password.trim(),
            passwordConfirmation: form.passwordConfirmation.trim(),
            TermsOfService: true
        };
        
        axios
            .post("https://reqres.in/api/users", newUser)
            .then((res) => {
                setForm(initialFormValues);
                console.log(res.data)
                setUsers([...users, res.data]);
            })
            .catch((err) => {
                debugger;
            });
    };

    useEffect(() => {
        schema.isValid(form).then((valid) => setDisabled(!valid));
    }, [form]);
        //console.log("this part is working")
    return(
        <div>
        <form className="form container" onSubmit={submit}>
    <div className = "form box">

    <label>
        User:
        <input type = "text" name = "user" value = {form.user} onChange={onChange}/>
    </label>

    <div style={{ color: "red" }}>
          <div>{errors.user}</div>
        </div>
        
    <label>
        Email:
        <input type="text" name="email" value = {form.email} onChange={onChange}/>
    </label>

    <div style={{ color: "red" }}>
          <div>{errors.email}</div>
        </div>

    <label> 
        Password:
            <input type="text" name="password" value = {form.password} onChange={onChange}/>
    </label>

<div style={{ color: "red" }}>
          <div>{errors.password}</div>
        </div>

    <label>
        Password Confirmation:
        <input type = "text" name = "passwordConfirmation" value = {form.passwordConfirmation} onChange={onChange}/>
    </label>

    <div style={{ color: "red" }}>
          <div>{errors.passwordConfirmation}</div>
        </div>

    <label>
        Terms of Service
        <input type = "checkbox" name = "TermsOfService" value = {form.TermsOfService} onChange={onChange}/>
    </label>

<div style={{ color: "red" }}>
          <div>{errors.TermsOfService}</div>
        </div>
    </div>
    <div className="submitButton">
        <button disabled={disabled}>Submit</button>
    </div>
            </form>
            {users.map(user => {
                return (
                    
                    <div key={user.id}>
                   
                        <p> User Name :{user.user}</p>
                        <p>User Email :{user.email}</p>
                    </div>
                )
            })}
        </div>
    )
}