import { useCallback, useEffect, useState } from "react";
import doLogin from '../api/user.service';
import './styles.css';


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

  useEffect(() => {
    setErrors({ username: !username, password: !password });
  }, [username, password]); // useEffect para validar los campos username y password, se dispara cada vez que cambian

  const onSubmit = useCallback(async (event) => {
    try {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario, que es recargar la pagina
      setLoading(true);

      if (!username || !password) {
        setErrors({ username: !username, password: !password });
        setLoading(false);
        return;
      }

      await doLogin(username, password);
      setLoading(false);

      alert('Login successful'); // Aca se puede manejar el redireccionamiento a otra pagina, o cualquier otra accion que se quiera realizar luego de un login exitoso
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error);
    }

  }, [username, password]); // se agrega username y password en las dependencias

  return (
    <form className="login_form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        className={errors.username ? 'error' : ''}
      />
      <input
        type="password" // Cambio de 'text' a 'password', para ocultar la contraseña, buena practica de seguridad
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className={errors.password ? 'error' : ''}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
