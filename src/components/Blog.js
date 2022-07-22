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
    <div className='blog'>
      <div style={hidenWhenVisible} >
        <span>{title}</span>
        <button
          onClick={toggleVisibility}
        >
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        <label>{title}</label>
        <button
          onClick={toggleVisibility}
        >
          hide
        </button>
        <span>{url}</span>
        <span>{author}</span>
        <span>Likes {like}</span>
        <button onClick={updateLikes}>Like</button>
        {
          userId.username === userLogged &&
          <button
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
  updateBloglikes: PropTypes.func.isRequired,
  userLogged: PropTypes.string.isRequired,
  removeBLogByUser: PropTypes.func.isRequired,
}
export default Blog