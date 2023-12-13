import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, resetDataSlice } from '../../features/data/dataSlice.js';
import { toast } from 'react-toastify';
import NNetChatView from '../../components/NNetChatView/NNetChatView.jsx';
import '../../components/NNetChatView/NNetChatView.css'

function Net() {
  const [bookIsOpen, setBookIsOpen] = useState(false);

    // Get the relevant data from the state
    const { data, dataIsSuccess, dataIsLoading, dataIsError, dataMessage } = useSelector(
      (state) => state.data
    );
  const handleBook = async () => {
    try {
      if(bookIsOpen){setBookIsOpen(false)}else{setBookIsOpen(true)}
    } catch (error) {
      // Handle any errors here

    }
  };
  return (
    <div className='planit-dashboard-popular-mid'>
            <button          
          onClick={handleBook}
          disabled={dataIsLoading}
          id='planit-dashboard-popular-mid-chat-bookbutton'
        >
          📕{bookIsOpen}
        </button>
        <NNetChatView />
    </div>
  );
}

export default Net;
