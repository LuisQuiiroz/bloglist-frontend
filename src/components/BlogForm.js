import React from 'react'

const BlogForm = ({ newBlog, handleCreateBlog, changeValuesofNewBlog }) => {
  const { title, author, url } = newBlog
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
        <input
          type='submit'

        />
      </div>
    </form>
  )
}

export default BlogForm