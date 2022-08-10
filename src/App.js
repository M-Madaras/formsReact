import {BrowserRouter, Route, Routes} from 'react-router-dom'


import './App.css';
import {Home, HomeAlone} from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Contact from './pages/Contact';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<Home /> } />
    <Route path ='about' element={ <About />}/>
    <Route path='contact' element={ <Contact />}/>
    <Route path='*' element={<NotFound />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    
  )
}

const NotFound= () => {
  return (
    <>
    <h3>Page Not Found!!!</h3>
    </>
  )
}

export default App;
