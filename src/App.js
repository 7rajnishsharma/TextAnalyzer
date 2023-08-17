import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';



function App() {

  const [mode, setMode] = useState('light')  //dark mode 
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#101c33'
      showAlert("Dark Mode has been enabled.", "success")
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white'
      showAlert("light Mode has been enabled.", "success")
    }
  }

  // Alert 
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>


      <Navbar title="Text Analyzer" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert}/>

      <div className="container my-1" >
        <TextForm showAlert={showAlert} heading="Enter a text to analyse." mode={mode} />
      </div>


    </>
  );
}

export default App;
