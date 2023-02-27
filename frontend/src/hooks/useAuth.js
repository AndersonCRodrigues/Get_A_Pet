import api from '../utils/api';
import { useHistory } from 'react-router-dom'
import useFlashMessage from './useFlashMessage';
import { useEffect, useState } from 'react';

export default function useAuth() {

  const [authenticade, setAuthnticade] = useState(false);
  const history = useHistory();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthnticade(true);
    }

  }, []);


  async function register(user) {

    let msgText = 'Cadastro realizado com sucesso';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user, { withCredentials: true })
      .then((response) => response.data);

      await authUser(data)

    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText = 'Login realizado com sucesso!';
    let msgType = 'success';

    try {

      const data = await api.post('/users/login', user)
        .then((response) => response.data);

      await authUser(data);

    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthnticade(true);
    localStorage.setItem('token', JSON.stringify(data.token));
    history.push('/');
  }

  function logout() {
    const msgText = 'Logout realizado com sucesso!';
    const msgType = 'success';

    setAuthnticade(false);
    localStorage.removeItem('token');
    api.defaults.headers.authorization = undefined;
    history.push('/');

    setFlashMessage(msgText, msgType);
  }

  return { register, authenticade, logout, login };
}