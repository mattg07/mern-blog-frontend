import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import backendURL from "../../apiConfig";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetch(`${backendURL}/profile`, {
        credentials: 'include',
      }).then(response => {
        if (response.ok) {
          response.json().then(userInfo => {
            setUserInfo(userInfo);
            setLoaded(true);
          });
        }
      });
    }
  }, [loaded, setUserInfo]);

  function logout() {
    fetch(`${backendURL}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    localStorage.removeItem('token'); // Remove token from storage
  }

  const username = userInfo?.username;
  const isAdmin = userInfo?.isAdmin;

  return (
    <header>
      <nav className="flex items-center justify-between p-3">
        <Link to="/">
          <p className="font-['Anton'] text-2xl">Blog</p>
        </Link>
        <div className="flex">
          {username && (
            <>
              {isAdmin && (
                <Link to="/create" className="mr-4 font-['Poppins']">
                  Create new
                </Link>
              )}
              <a onClick={logout} className="mr-4 font-['Poppins']">
                Logout
              </a>
            </>
          )}
          {!username && (
            <>
              <Link to="login" className="mr-4 font-['Poppins']">
                Login
              </Link>
              <Link to="register" className="mr-4 font-['Poppins']">
                Register
              </Link>
            </>
          )}

          <Link to="info" className="mr-4 font-['Poppins']">
            Info
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
