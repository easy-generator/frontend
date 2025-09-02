import { useEffect, useState } from "react";
import { getMe } from "../services/me.api";
import "../styles/home.css"; 

const HomeComponent = () => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login';
  };

  return (
    <div className="home-container">
      <div className="welcome-card">
        <div className="logo-container">
          <img src="images/logo.png" alt="logo" />
        </div>
        
        <h1 className="welcome-title">Easy Generator</h1>
        
        {isLoading ? (
          <p className="welcome-message loading-text">Loading your profile...</p>
        ) : (
          <p className="welcome-message">
            Welcome back, <span className="user-name">{user?.name || 'Guest'}</span>!
            <br />
            Ready to create something amazing today?
          </p>
        )}
        
        <div className="logout-section">
          <button className="logout-button" onClick={handleLogout}>
            👋 Logout & Goodbye
          </button>
          <p className="goodbye-text">
            Thanks for using Easy Generator. See you soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;