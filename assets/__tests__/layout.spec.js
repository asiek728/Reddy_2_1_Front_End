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

  describe('register.html', () => {
    beforeEach(async () => {
      dom = await renderDOM('./register.html')
      document = await dom.window.document
    })

    it('link displays Log in here', () => {
      const link = document.querySelector('#redirectRegister')
      expect(link.innerHTML).toContain('Log in here')
    })

    it('has a footer', () => {
      const footer = document.querySelector('footer')
      expect(footer).toBeTruthy()
    })

    it('h1 displays Register an account', () => {
      const h1 = document.querySelector('h1')
      expect(h1.innerHTML).toContain('Register an account')
    })

    it('user is redirected to login page when log in link is clicked', () => {
      const btn = document.querySelector('#redirectRegister')
      btn.click()
      expect(dom.window).toContain('/login.html')
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
    const btn = document.getElementById('usersBtn');
    expect(btn).toBeTruthy()
  })

  it('has check task button', () => {
    const btn1 = document.getElementById('tasksBtn');
    expect(btn1).toBeTruthy()
  
  })

})
})
