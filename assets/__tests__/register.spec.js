const { renderDOM } = require('./helpers')

let dom;
let document;

describe('register.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./register.html')
    document = await dom.window.document
  })

  it('input are empty when the page loads', () => {
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const emailAddress = document.querySelector('#emailAddress')
    expect(username.innerHTML).toContain('')
    expect(password.innerHTML).toContain('')
    expect(emailAddress.innerHTML).toContain('')
  })

  it('user is redirected when home button is clicked', () => {
    const btn = document.querySelector('#homeBtn')
    btn.click()
    expect(window.location.href).toEqual('/index.html')
  })
})