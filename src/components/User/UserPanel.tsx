import { Component } from 'solid-js';
import { useUser } from '../../store/user';
import './UserPanel.css';

const UserPanel: Component = () => {
  const { toggleUserPanel } = useUser();

  return (
    <div class="user-panel-overlay" onClick={toggleUserPanel}>
      <div class="user-panel" onClick={(e) => e.stopPropagation()}>
        <div class="user-panel-header">
          <h2>User Profile</h2>
          <button class="close-user-panel" onClick={toggleUserPanel}>×</button>
        </div>
        <div class="user-panel-content">
          <div class="user-info">
            <div class="avatar">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path 
                  fill="currentColor" 
                  d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 12c5.523 0 10 2.238 10 5v3H2v-3c0-2.762 4.477-5 10-5z"
                />
              </svg>
            </div>
            <div class="user-details">
              <h3>Guest User</h3>
              <p>Sign in to sync your settings and songs</p>
            </div>
          </div>
          <div class="user-actions">
            <button class="sign-in-button">Sign In</button>
            <button class="create-account-button">Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;