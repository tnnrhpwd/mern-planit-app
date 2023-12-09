import NNetChatView from '../../components/NNetChatView/NNetChatView.jsx';
import '../../components/NNetChatView/NNetChatView.css'

function MiddleDashboard() {
  return (
    <div className='planit-dashboard-popular-mid'>
      <h2>Text Prediction</h2>
        <NNetChatView />
    </div>
  );
}

export default MiddleDashboard;
