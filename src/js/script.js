document.querySelector('.nav_burger').addEventListener('click', () => {
    document.querySelector('html').classList.toggle('overflow-hidden')
    document.querySelector('body').classList.toggle('overflow-hidden')
    document.querySelector('.nav_mobile').classList.toggle('show')
    document.querySelector('.nav_burger').classList.toggle('active')
})