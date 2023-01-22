import { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux'      // useSelector-brings in user,iserror,isloading from state | useDispatch-brings in reset,register,login from state
import { useNavigate } from 'react-router-dom'              // page redirects
import { toast } from 'react-toastify'                        // visible error notifications
import { login, resetAuthSlice } from '../../features/auth/authSlice'     // import functions from authslice
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Login.css';

function Login() {
    // useState variables of input fields
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // the state values of the input fields
    const { email, password } = formData

    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization

    // select values from state
    const { user, authIsLoading, authIsError, authIsSuccess, authMessage } = useSelector(
        (state) => state.data
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
        const userData = {     // get data from input form
        email,
        password,
        }
        dispatch(login(userData))   // dispatch connects to the store, then calls the async register function passing userdata as input.
        toast.success("Successfully logged in!", { autoClose: 2000 }) // print error to toast errors
    }

    // called on each guest login form submit
    const handleGuestLogin = (e) => {
        e.preventDefault()

        const userData = {
          // set input data to guest user
          email: "Guest@gmail.com",
          password: "Guest",
        };
        dispatch(login(userData))   // dispatch connects to the store, then calls the async register function passing userdata as input. 
        toast.success("Logged in as Guest", { autoClose: 2000 }) // print error to toast errors
    }

    // if loading, show spinner. authIsLoading resets on state change.
    if (authIsLoading) {
        return <Spinner />
    }

  return (
    <div className='planit-login'>
        <section className="planit-login-heading">
            <div className="planit-login-heading-title">
                Log in!
            </div>
            <div className="planit-login-heading-description">
                Log in to save, create, and share goals and plans!
            </div>
        </section>
        <section className="planit-login-form">
            <form onSubmit={onSubmit}>
                <div className="planit-login-form-group">
                    <input
                        type='email'
                        className='planit-login-form-control'
                        id='planit-email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                    />
                </div>
                <div className="planit-login-form-group">
                    <input
                        type='password'
                        className='planit-login-form-control'
                        id='planit-password'
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={onChange}
                    />
                </div>
                <div className='planit-login-form-group'>
                    <button type='submit' className='planit-login-form-submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
        <a href='/register'>
            <button className='planit-login-register'>
                Register
            </button>
        </a>
        <button onClick={handleGuestLogin} className='planit-login-guest'>
            Login as Guest
        </button>
        
    </div>
  )
}

export default Login