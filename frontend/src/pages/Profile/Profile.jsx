import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'      // useSelector-brings in user,iserror,isloading from state | useDispatch-brings in reset,register,login from state
import { useNavigate } from 'react-router-dom'              // page redirects
import { toast } from 'react-toastify'    
import { logout, resetDataSlice } from './../../features/data/dataSlice.js'      // import functions from authslice
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Profile.css';

function Profile() {
  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user, dataIsLoading } = useSelector((state) => state.data)      // select user values from user state
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
      dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
    }
  }, [user, navigate, dispatch])

  if (dataIsLoading) {
    return <Spinner />
  }

    // declare method to remove user item from local storage)
  const onLogout = () => {
    dispatch(logout())  // dispatch connects to the store, then remove user item from local storage
    dispatch(resetDataSlice())  // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
    navigate('/')       // send user to dashboard, which will redirect to login page
  }

  if(user){
    return (
      <div className='planit-profile'>
      <div className='planit-profile-title'>
        Your Profile
      </div>
      <div className='planit-profile-welcome'>
        Welcome home {user.email}!
      </div>

      <div className="planit-profile-auth">
        <button className="planit-profile-auth-button" onClick={onLogout}>Log out</button>
      </div>
    </div>
    )
  }
}

export default Profile