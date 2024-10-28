import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './component/About';
import Navbar from './component/Navbar'; 
import Mainbody from './component/Mainbody';
import VersionHistory from './component/VersionHistory';

function App() {
  return (
    <Router basename="/textmuster.github.io">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainbody />} />
          <Route path="/about" element={<About />} />
          <Route path="/version-history" element={<VersionHistory />} /> {/* Fixed here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
