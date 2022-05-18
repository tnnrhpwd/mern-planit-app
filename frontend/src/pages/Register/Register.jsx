import { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux'      // useSelector-brings in user,iserror,isloading from state | useDispatch-brings in reset,register,login from state
import { useNavigate } from 'react-router-dom'              // page redirects
import { toast } from 'react-toastify'                        // visible error notifications
import { register, resetAuthSlice } from '../../features/auth/authSlice'     // import functions from authslice
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Register.css';

function Register() {
    // useState variables of input fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    // the state values of the input fields
    const { username, email, password, password2 } = formData

    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization

    // select values from state
    const { user, authIsLoading, authIsError, authIsSuccess, authMessage } = useSelector(
        (state) => state.auth
    )

    // called on state changes
    useEffect(() => {
        if (authIsError) {
        toast.error(authMessage) // print error to toast errors
        }

        if (authIsSuccess || user) {  // if registered or logged in, 
        navigate('/')           // send user to dashboard
        }

        dispatch(resetAuthSlice())   // reset state values( authMessage, isloading, iserror, and issuccess ) on each state change
    }, [user, authIsError, authIsSuccess, authMessage, navigate, dispatch])

    // called on each letter typed into input field
    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

      // called on each login form submit
    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) { // if passwords dont match, error. Else, 
            toast.error('Passwords do not match')
          } else {
            const userData = {  // get data from input form
              username,
              email,
              password,
            }
      
            dispatch(register(userData))  // dispatch connects to the store, then calls the async register function passing userdata as input.
          }
    }

      // if loading, show spinner. authIsLoading resets on state change.
    if (authIsLoading) {
        return <Spinner />
    }

  return (
    <div className='planit-register'>
        <section className="planit-register-heading">
            <div className="planit-register-heading-title">
                Register Now!
            </div>
            <div className="planit-register-heading-description">
                Register to save, create, and share goals and plans!
            </div>
        </section>
        <section className="planit-register-form">
            <form onSubmit={onSubmit}>
                <div className='planit-register-form-group'>
                    <input
                    type='text'
                    className='planit-register-form-control'
                    id='username'
                    name='username'
                    value={username}
                    placeholder='Enter your username'
                    onChange={onChange}
                    />
                </div>
                <div className="planit-register-form-group">
                    <input
                        type='email'
                        className='planit-register-form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                    />
                </div>
                <div className="planit-register-form-group">
                    <input
                        type='password'
                        className='planit-register-form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={onChange}
                    />
                </div>
                <div className="planit-register-form-group">
                    <input
                        type='password'
                        className='planit-register-form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm password'
                        onChange={onChange}
                    />
                </div>
                <div className='planit-register-form-group'>
                    <button type='submit' className='planit-register-form-submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
        <a href='/login'>
            <button className='planit-register-login'>
                Log In Instead
            </button>
        </a>
    </div>
  )
}

export default Register