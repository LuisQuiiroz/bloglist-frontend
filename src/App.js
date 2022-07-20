import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const initialNewBlog = {
    title: '',
    author: '',
    url: ''
  }
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState('root');
  const [password, setPassword] = useState('salainen');

  const [user, setUser] = useState(null);

  const [newBlog, setNewBlog] = useState(initialNewBlog);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch (error) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreateBlog = async e => {
    e.preventDefault()
    try {
      const blogAdded = await blogService.create(newBlog)
      setBlogs(blogs.concat(blogAdded))
      setNewBlog(initialNewBlog)
      setMessage('new blog added')
      setTimeout(() => {
        setMessage(null)
      }, 3000);
    } catch (error) {
      setMessage('missing content')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

  }
  const changeValuesofNewBlog = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Notification message={message} />
      {
        user === null
          ? <>
            <h2>Log in to application</h2>
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />

          </>
          : <>
            <h2>blogs</h2>
            <p>Hello {user.username} </p>
            <input
              type='button'
              value='Log out'
              onClick={() => handleLogout()}
            />
            <BlogForm
              newBlog={newBlog}
              handleCreateBlog={handleCreateBlog}
              changeValuesofNewBlog={changeValuesofNewBlog}
            />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
      }
    </div>
  )
}

export default App
