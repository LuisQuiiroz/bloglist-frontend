import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('root')
  const [password, setPassword] = useState('salainen')

  const handleLogin = e => {
    e.preventDefault()
    loginUser({ username, password })
    setPassword('')
  }
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
            type='password'
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

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm