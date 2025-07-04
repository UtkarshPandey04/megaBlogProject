import React from 'react';
import { Login as LoginComponent } from '../components';

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;