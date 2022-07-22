import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable '
import toast, { Toaster } from 'react-hot-toast'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // top likes
  blogs.sort((a, b) => b.likes - a.likes)
  const blogsfromDB = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  useEffect(() => {
    blogsfromDB()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginUser = async (dataUser) => {
    try {
      const user = await loginService.login(dataUser)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      toast.success('Logged in')
    } catch (error) {
      toast.error('Wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blogAdded = await blogService.create(newBlog)
      const blogfromDB = await blogService.getOneBlog(blogAdded.id)
      setBlogs(blogs.concat(blogfromDB))
      toast.success('new blog added')
    } catch (error) {
      toast.error('missing content')
    }
  }
  const updateBloglikes = async (id) => {
    try {
      const blogToUpdate = await blogService.getOneBlog(id)
      let { likes } = blogToUpdate
      await blogService.updateLikes(id, { likes: likes + 1 })
      toast('Like!', {
        icon: '👍',
      })
    } catch (error) {
      toast.error('error to add like')
    }
  }
  const removeBLogByUser = async (id, title) => {
    try {
      if (window.confirm(`Are you sure to delete '${title}'`)) {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        toast.success('Deleted blog')
      }
    } catch (error) {
      toast.error('error to delete your blog')
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {user === null ? (
        <>
          <h2>Log in to application</h2>
          <LoginForm loginUser={loginUser} />
        </>
      ) : (
        <>
          <div>
            <h2>blogs</h2>
            <p>Hello {user.username} </p>
            <input
              type="button"
              value="Log out"
              onClick={() => handleLogout()}
            />
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBloglikes={updateBloglikes}
              userLogged={user.username}
              removeBLogByUser={removeBLogByUser}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
