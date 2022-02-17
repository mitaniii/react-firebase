import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Home from "/components/Home";
import SignUp from './components/SignUp';
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
  <AuthProvider>
    <div style={{ margin: '2em' }}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<signUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
      <SignUp />
    </div>
  </AuthProvider>
  );
}

export default App;
