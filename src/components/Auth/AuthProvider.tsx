import { Component, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { makePersisted } from '@solid-primitives/storage';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

interface AuthContextType {
  state: AuthState;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>();

export const AuthProvider: Component = (props) => {
  const [state, setState] = makePersisted(createStore<AuthState>({
    isAuthenticated: false,
    user: null
  }), {
    name: 'auth-state'
  });

  const signIn = async (username: string, password: string) => {
    // Mock authentication for now
    setState({
      isAuthenticated: true,
      user: { username }
    });
  };

  const signOut = async () => {
    setState({
      isAuthenticated: false,
      user: null
    });
  };

  const value = {
    state,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};