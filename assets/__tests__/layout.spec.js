const { renderDOM } = require('./helpers')

let dom;
let document;

describe('login.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./login.html')
    document = await dom.window.document
  })

  it('has a button', () => {
    const btn = document.querySelector('button')
    expect(btn).toBeTruthy()
  })

  it('h1 displays Login', () => {
    const h1 = document.querySelector('h1')
    expect(h1.innerHTML).toContain('Login')
  })

  it('has a title', () => {
    const title = document.querySelector('title')
    expect(title.innerHTML).toBe('Log In')
  })


  /*it('displays morning when the button is clicked', () => {
    const btn = document.querySelector('button')
    btn.click()
    const h1 = document.querySelector('h1')
    expect(h1.innerHTML).toContain('morning')
  })

  /*it('displays dark mode', () => {
    const body = document.querySelector('body')
    const darkModeBtn = document.querySelector('#dark-mode')

    darkModeBtn.click()
    expect(body.className).toBe('dark-mode')
  })

  it('adds the input valie to the h1', () => {
    const form = document.querySelector('form')
    const h1 = document.querySelector('h1')

    const input = document.querySelector('#name')
    input.value = 'romeo'
    form.dispatchEvent(new dom.window.Event('submit'))

    expect(h1.innerHTML).toContain('romeo')
  })*/
})


describe('admin.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./admin.html')
    document = await dom.window.document
  })

  it('has a check users button', () => {
    const btn = document.getElementById("usersBtn");
    expect(btn).toBeTruthy()
  })

})
