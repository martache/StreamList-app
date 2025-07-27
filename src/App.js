import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import TMDBPage from './components/TMDBPage';
import './App.css'; // For general app styles
import './styles/Navbar.css'; // For navigation bar styles

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/tmdb">TMDB</Link></li>
            className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">StreamList</Link>
            </li>
            <li className="nav-item">
              <Link to="/movies" className="nav-link">Movies</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
                  <Route path="/tmdb" element={<TMDBPage />} />
      </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;