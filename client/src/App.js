import { useState, useEffect } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(new URLSearchParams(window.location.search).get('access_token'));
    // window.history.pushState({}, document.title, "/");
  }, [])

  return (
    <div>
      {accessToken ? <Profile accessToken={accessToken} /> : <Login />}
    </div>
  );
}

export default App;
