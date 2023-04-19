import './App.css';
import Login from './Pages/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>
      
    </div>
    </>
  );
}

export default App;
