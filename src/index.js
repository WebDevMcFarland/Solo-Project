import { createRoot } from 'react-dom/client';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AddRecipe from './AddRecipe.jsx';
import UserPage from './UserPage.jsx'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addrecipes" element={<AddRecipe />} />
                <Route path="/recipes" element={<UserPage />} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;