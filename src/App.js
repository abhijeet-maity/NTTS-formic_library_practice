import SampleForm from './components/SampleForm';
import ValidateWithYupForm from './components/ValidatedWithYupForm';
import FormikComponentForm from './components/FormikComponentForm';
import './App.css';


function App() {
  return (
    <div className="App">
      
      <SampleForm/>
      
      <ValidateWithYupForm/>
    
      <FormikComponentForm/>
    </div>
  );
}

export default App;
