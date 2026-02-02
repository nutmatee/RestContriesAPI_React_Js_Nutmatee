import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <ThemeToggle/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;