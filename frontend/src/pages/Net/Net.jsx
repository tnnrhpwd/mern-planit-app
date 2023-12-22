import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, resetDataSlice } from '../../features/data/dataSlice.js';
import { toast } from 'react-toastify';
import NNetChatView from '../../components/NNetChatView/NNetChatView.jsx';
import '../../components/NNetChatView/NNetChatView.css'

function Net() {
  return (
    <div className='planit-dashboard-popular-mid'>
        <NNetChatView />
    </div>
  );
}

export default Net;
