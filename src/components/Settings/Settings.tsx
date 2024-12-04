import { Component } from 'solid-js';
import { useTheme } from '../../store/theme';
import './Settings.css';

const Settings: Component = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div class="settings-container">
      <div class="settings-content">
        <div class="settings-group">
          <h3>Theme</h3>
          <div class="setting-item">
            <label>
              Color Theme
              <select
                value={theme()}
                onChange={(e) => setTheme(e.target.value as any)}
                class="theme-select"
              >
                {themes.map((t) => (
                  <option value={t}>
                    {t.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <h3>Editor</h3>
          <div class="setting-item">
            <label class="checkbox-label">
              <input type="checkbox" checked={true} />
              Word Wrap
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;