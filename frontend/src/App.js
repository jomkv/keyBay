import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <Navbar />
    </>
  );
}

export default App;
