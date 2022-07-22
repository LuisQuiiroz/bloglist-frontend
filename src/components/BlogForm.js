import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const initialNewBlog = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(initialNewBlog)
  const { title, author, url } = newBlog

  const changeValuesofNewBlog = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateBlog = e => {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog(initialNewBlog)
  }

  return (
    <form autoComplete='off' onSubmit={handleCreateBlog}>
      <div>
        <div>
          <label>title</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={changeValuesofNewBlog}
          />
        </div>
        <div>
          <label>author</label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={changeValuesofNewBlog}
          />
        </div>
        <div>
          <label>url</label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={changeValuesofNewBlog}
          />
        </div>
        <button type='submit'>
          create
        </button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm