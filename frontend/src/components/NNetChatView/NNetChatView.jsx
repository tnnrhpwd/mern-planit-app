import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, resetDataSlice } from '../../features/data/dataSlice.js';
import { toast } from 'react-toastify';
import Spinner from '../Spinner/Spinner.jsx';
const NNetChatView = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  // Get the relevant data from the state
  const { data, dataIsSuccess, dataIsLoading, dataIsError, dataMessage } = useSelector(
    (state) => state.data
  );
  // Handle data updates
  useEffect(() => {
    // If there is a new successful response, update the chat history
    if (dataIsSuccess) {
      setChatHistory([...chatHistory, { type: 'user-message', content: inputText }, { type: 'openai-message', content: data }]);
      setInputText('');
    }
    // Handle errors
    if (dataIsError) {
      toast.error(dataMessage);
    }
    // Reset the data slice when unmounting or when there's an error
    return () => {
      dispatch(resetDataSlice());
    };
  }, [dispatch, dataIsSuccess, dataIsError, dataMessage, data, inputText, chatHistory]);
  const handleSend = async () => {
    try {
      // Check if inputText is not empty
      if (inputText.trim() === '') {
        toast.error('Please enter data to send to OpenAI.');
        return;
      }
      // Concatenate prior messages with the current inputText
      const combinedData = chatHistory.map(item => item.content).concat(inputText).join('\n');
      console.log(combinedData)
      // Dispatch the updateData action with the inputText
      dispatch(updateData({ id: "u", data: combinedData }));
    } catch (error) {
      // Handle any errors here
      console.error(error);
      toast.error('An error occurred while fetching data from OpenAI.');
    }
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setInputText(chatHistory[index].content);
  };
  const handleSaveEdit = (index) => {
    // Update the chatHistory with the edited content
    const updatedHistory = [...chatHistory];
    updatedHistory[index].content = inputText;
    setChatHistory(updatedHistory);
    setEditingIndex(null);
  };
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setInputText('');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line from being added
      handleSend();
    }
  };
  return (
    <div className='planit-dashboard-popular-mid-chat'>
      <div className='planit-nnet-chat-history'>
        {chatHistory.map((item, index) => (
          <div key={index} className={`planit-nnet-chat-history-${item.type}`}>
            {editingIndex === index ? (
              <>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className='planit-nnet-chat-history-edit'
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <div>{item.content}</div>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className='planit-nnet-input'>
        <textarea
          value={inputText}
          placeholder='Please enter your message...'
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown} // Add the keydown event handler
          className='planit-dashboard-popular-mid-chat-area'
        />
        <button
          onClick={handleSend}
          disabled={dataIsLoading}
          id='planit-dashboard-popular-mid-chat-button'
        >
          Send ⚡
        </button>
      </div>
      {dataIsLoading && <Spinner />}
    </div>
  );
};
export default NNetChatView;