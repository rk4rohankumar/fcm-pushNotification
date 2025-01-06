import './App.css';
import ServerSideTable from './components/DataTable';
import DashboardTable from './components/SocketDashboard';
import NotificationButton from './components/NotificationButton'
import STOREITEMS from './components/DexieComponen';
import { requestPermission,messaging } from './notification/firebase';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import LocationTracker from './components/PuserjsComponent';
import RTK,{Pokemon} from './components/RTKCompnent'


function App() {
  useEffect(() => {
    requestPermission();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }
  , []);
  return (
    <div className="App">
      <ServerSideTable />
      <DashboardTable />
      {/* <NotificationButton /> */}
      <STOREITEMS />
      {/* <LocationTracker /> */}
      <RTK />
      <Pokemon />
    </div>
  );
}

export default App;
