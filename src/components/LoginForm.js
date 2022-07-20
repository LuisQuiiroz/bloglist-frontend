import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <>
      <form onSubmit={handleLogin} autoComplete='off'>
        <div>
          <p>username</p>
          <input
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <p>password</p>
          <input
            type='text'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm