import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Button, Input, Logo } from './index';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-base text-gray-600 mb-6">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline transition duration-200"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Please enter a valid email address',
                },
              })}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;