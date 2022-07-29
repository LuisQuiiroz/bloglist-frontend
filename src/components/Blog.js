import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBloglikes, userLogged, removeBLogByUser }) => {
  const { title, url, author, likes, id, userId } = blog

  const [visible, setVisible] = useState(false)
  const [like, setLike] = useState(likes)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = () => {
    setLike(like + 1)
    updateBloglikes(id)
  }

  const removeBLog = () => {
    removeBLogByUser(id, title)
  }

  return (
    <div className='blog' data-cy="blog">
      <span> {title} </span>
      <span> {author} </span>
      <div style={hidenWhenVisible} >
        <button
          onClick={toggleVisibility}
        >
          view
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <button
          onClick={toggleVisibility}
        >
          hide
        </button>
        <span> {url} </span>
        <span>Likes {like} </span>
        <button
          data-cy="like"
          onClick={updateLikes}>
          Like
        </button>
        {
          userId.username === userLogged &&
          <button
            data-cy="remove"
            onClick={removeBLog}>
            remove
          </button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBloglikes: PropTypes.func,
  userLogged: PropTypes.string,
  removeBLogByUser: PropTypes.func,
}
export default Blog