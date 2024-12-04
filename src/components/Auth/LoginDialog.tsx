import { Component, createSignal, Show } from 'solid-js';
import { useAuth } from './AuthProvider';
import './LoginDialog.css';

interface LoginDialogProps {
  onClose: () => void;
}

const LoginDialog: Component<LoginDialogProps> = (props) => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      await signIn(username(), password());
      props.onClose();
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div class="login-dialog-overlay" onClick={props.onClose}>
      <div class="login-dialog" onClick={(e) => e.stopPropagation()}>
        <div class="login-dialog-header">
          <h2>Sign In</h2>
          <button class="close-button" onClick={props.onClose}>×</button>
        </div>
        <form class="login-form" onSubmit={handleSubmit}>
          <Show when={error()}>
            <div class="error-message">{error()}</div>
          </Show>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              value={username()}
              onInput={(e) => setUsername(e.currentTarget.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              required
            />
          </div>
          <button type="submit" class="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;