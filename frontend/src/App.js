import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import Navbar from './components/Navbar'
import ItemsMenu from './components/ItemsMenu'

function App() {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body>
        <Navbar />
        <ItemsMenu />
      </body>
      
    </>
  );
}

export default App;
