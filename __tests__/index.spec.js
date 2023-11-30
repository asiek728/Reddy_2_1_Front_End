const { renderDOM } = require('./helpers')

let dom;
let document;

describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./index.html')
    document = await dom.window.document
  })

  it('has links on navbar', () => {
    const link = document.querySelectorAll('.navlink')
    expect(link).toBeTruthy()
  })

  it('Home link takes you to home page', () => {
    const link = document.querySelector('#link1')
    link.click()
    expect(dom.window.location.href).toEqual('file:///C:/Users/Jeyag/LFA/lap2/project/Reddy_2_1_Front_End/index.html')
  })

  it('Services link takes you to services page', () => {
    const link = document.querySelector('#link3')
    link.click()
    expect(dom.window.location.href).toEqual('file:///C:/Users/Jeyag/LFA/lap2/project/Reddy_2_1_Front_End/services.html')
  })

  it('Log in link takes you to login page', () => {
    const link = document.querySelector('#link4')
    link.click()
    expect(dom.window.location.href).toEqual('file:///C:/Users/Jeyag/LFA/lap2/project/Reddy_2_1_Front_End/login.html')
  })

  it('Sign in link takes you to register page', () => {
    const link = document.querySelector('#link5')
    link.click()
    expect(dom.window.location.href).toEqual('file:///C:/Users/Jeyag/LFA/lap2/project/Reddy_2_1_Front_End/register.html')
  })

  // it('Admin link takes you to admin page', () => {
  //   const link = document.querySelector('#link6')
  //   link.click()
  //   expect(dom.window.location.href).toEqual('file:///C:/Users/Jeyag/LFA/lap2/project/Reddy_2_1_Front_End/admin.html')
  // })

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
