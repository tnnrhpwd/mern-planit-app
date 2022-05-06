import { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux'      // useSelector-brings in user,iserror,isloading from state | useDispatch-brings in reset,register,login from state
import { useNavigate } from 'react-router-dom'              // page redirects
import { toast } from 'react-toastify'                        // visible error notifications
import { login, reset } from '../../features/auth/authSlice'     // import functions from authslice
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
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    // called on state changes
    useEffect(() => {
        if (isError) {
        toast.error(message) // print error to toast errors
        }

        if (isSuccess || user) {  // if registered or logged in, 
        navigate('/')           // send user to dashboard
        }

        dispatch(reset())   // reset state values( message, isloading, iserror, and issuccess ) on each state change
    }, [user, isError, isSuccess, message, navigate, dispatch])

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
    }

      // if loading, show spinner. isLoading resets on state change.
    if (isLoading) {
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
                        id='email'
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
                        id='password'
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

    </div>
  )
}

export default Login