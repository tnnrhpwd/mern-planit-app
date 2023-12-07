import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateData, resetDataSlice } from './../../features/data/dataSlice';
import { toast } from 'react-toastify';
import NNetChatView from '../../components/NNetChatView/NNetChatView.jsx';
import '../../components/NNetChatView/NNetChatView.css'

function MiddleDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sentData, setSentData] = useState('');

  async function callData() {
    try {
      if (sentData.trim() === '') {
        toast.error('Please enter data to send to OpenAI.');
        return;
      }

      dispatch(
        updateData({
          id: 'u',
          data: sentData,
        })
      );
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data from OpenAI.');
    }
  }

  return (
    <div className='planit-dashboard-popular-mid'>
      <h2>ChatGPT Text Prediction</h2>
      <div >
        <NNetChatView />
      </div>
    </div>
  );
}

export default MiddleDashboard;
