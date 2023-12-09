import NNetChatView from '../../components/NNetChatView/NNetChatView.jsx';
import '../../components/NNetChatView/NNetChatView.css'

function MiddleDashboard() {
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
