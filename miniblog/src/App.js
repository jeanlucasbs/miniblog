import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';

import Headers from './components/Headers';
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
