import React from 'react';
import astronaut_running from '../../../assets/astronaut_running.mp4';
import AuthenticationPage from '../../components/authentication/authentication_page';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSignIn from '../../../services/hooks/useSignIn';

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 charachters." }),
  password: z.string().min(6, { message: "Password must be at least 6 charachters." })
});

const SignIn = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: zodResolver(schema) });
  const { user, isLoading, isSuccess, error, signIn } = useSignIn();

  const handleSignin = (data) => {
    signIn(data);
  }

  if (isSuccess) {
    // route to the main page
  }

  return <AuthenticationPage illustration={astronaut_running} pageTitle={'signin'}>
    <>
        <h1 className="text-3xl font-semibold mb-10 text-violet-600">Sign in to LimitlessAi.</h1>
        <form className="w-full max-w-md flex flex-col gap-4 mb-10" onSubmit={handleSubmit(handleSignin)}>
          <div className="flex flex-col gap-2">
            <label className="block text-md font-semibold text-violet-500" htmlFor="username">
              Username
            </label>
            <input
              { ...register('username') }
              className="w-full px-5 py-4 text-gray-800 border rounded-xl bg-none focus:bg-none focus:outline-none focus:ring focus:ring-violet-400"
              type="text"
              id="username"
              placeholder="e.g. starlord"
              disabled={isLoading}
            />
            { errors.username && <p className="text-red-400">{ errors.username.message }</p> }
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-md font-semibold text-violet-500" htmlFor="password">
              Password
            </label>
            <input
              { ...register('password') }
              className="w-full px-3 py-4 text-gray-800 border rounded-xl bg-none focus:bg-none focus:outline-none focus:ring focus:ring-violet-400"
              type="password"
              id="password"
              placeholder="Enter your password"
              disabled={isLoading}
            />
            { errors.password && <p className="text-red-400">{ errors.password.message }</p>}
          </div>
          <div className="mb-8">
        {error && <p className='text-red-400'>{error}</p>}
      </div>
          <div>
            <button type='submit' disabled={isLoading} class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-6 py-3 rounded-full w-full text-white cursor-pointer"> 
              <p className="font-bold">{ isLoading ? "Signing In..." : "Sign In" }</p>
            </button>
          </div>
        </form>
        <div>
          <p className="text-md text-violet-600">
            Don't have an account? <a href='#' className='font-bold hover:underline'>Sign Up!</a>
          </p>
        </div>
        </>
    </AuthenticationPage>  
};

export default SignIn;