import React from 'react';

const AuthForm = ({ title, actionText, onSubmit }) => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className='text-center text-4xl font-bold text-white'>Cod<span className=' text-cyan-300 '>inate</span></h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            {title}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Common form fields */}
            {/* ... */}
            {(actionText==="Create" || actionText==="Join") && <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div> 





            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Roomname
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="roomname"
                  name="roomname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>





            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>




            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-bold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
            </>}






            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-bold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {actionText}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not having an account?{' '}
            <a href="#" className="font-semibold text-slate-300 hover:text-gray-400">
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
