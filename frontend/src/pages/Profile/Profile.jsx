import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'      // useSelector-brings in user,iserror,isloading from state | useDispatch-brings in reset,register,login from state
import { useNavigate } from 'react-router-dom'              // page redirects
import { toast } from 'react-toastify'    
import { resetAuthSlice } from '../../features/auth/authSlice'     // import functions from authslice
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Profile.css';

function Profile() {
  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  // const { isLoading, isError, message } = useSelector(     // select goal values from goal state
  //   (state) => state.goals
  // )

  // called on state changes
  useEffect(() => {
    // if (isError) {
    //   toast.log(message)
    // }

    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    // dispatch(getGoals()) // dispatch connects to the store, then retreives the goals that match the logged in user.

    return () => {    // reset the goals when state changes
      dispatch(resetAuthSlice()) // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
    }
  }, [user, navigate, dispatch])

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <div>Profile</div>
  )
}

export default Profile