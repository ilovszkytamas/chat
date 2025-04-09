import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login-page/LoginPage";
import RegisterPage from "./components/register-page/RegisterPage";
import HomePage from "./components/home-page/HomePage";
import ProfilePage from "./components/profile-page/ProfilePage";
import { GlobalContextProvider } from "./store/context/GlobalContext";
import MessagesPage from "./components/messages/MessagesPage";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="home" element={<> <Header /> <HomePage /> </>}></Route>
            <Route path="profile" element={<> <Header /> <ProfilePage /></>}></Route>
            <Route path="messages" element={<> <Header /> <MessagesPage /></>}></Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
