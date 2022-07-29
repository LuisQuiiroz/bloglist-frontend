describe('Blog app', () => {

  const user = {
    name: 'Luis Quiroz',
    username: 'luis',
    password: 'salainen'
  }
  const newBlog = {
    title: 'test with cypress',
    author: 'Gabriel',
    url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#What-you-ll-learn'
  }

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  it('login faild with wrong password', () => {
    cy.get('[name="username"]').type(user.username)
    cy.get('[name="password"]').type('wrong')
    cy.contains('Login').click()
    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', `Hello ${user.username}`)
  })

  it('user can login', () => {
    cy.get('[name="username"]').type(user.username)
    cy.get('[name="password"]').type(user.password)
    cy.contains('Login').click()
    cy.contains(`Hello ${user.username}`)
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: user.username, password: user.password })
    })

    it('a new blog can be created in the form', () => {
      cy.contains('new blog').click()
      cy.get('[name="title"]').type(newBlog.title)
      cy.get('[name="author"]').type(newBlog.author)
      cy.get('[name="url"]').type(newBlog.url)
      cy.contains('create').click()
    })

    it('a new blog can be created by commands and can be liked', () => {
      cy.createBlog({
        title: 'commands',
        author: 'Luis',
        url: 'nothing'
      })
      cy.contains('commands')
      cy.contains('view').click()
      cy.get('[data-cy="like"]').click()
      cy.contains('Likes 1')
    })
    describe('when have 2 blogs', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'first',
          author: 'Luis',
          url: 'nothing'
        })
        cy.createBlog({
          title: 'second',
          author: 'Luis',
          url: 'nothing'
        })
      })

      it('user can delete a blog', () => {
        cy.contains('second').parent().as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').find('[data-cy="remove"]').click()
      })

      it.only('blog with the most likes in the first place', () => {
        cy.contains('second').parent().as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').find('[data-cy="like"]').click().wait(400)
        cy.get('@blog').find('[data-cy="like"]').click().wait(400)
        cy.visit('http://localhost:3000')
        cy.get('[data-cy="blog"]:first').contains('second')
      })
    })
  })
})