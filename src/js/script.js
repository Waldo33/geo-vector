// Nav-menu

document.querySelector('.nav_burger').addEventListener('click', () => {
    document.querySelector('html').classList.toggle('overflow-hidden')
    document.querySelector('body').classList.toggle('overflow-hidden')
    document.querySelector('.nav_mobile').classList.toggle('show')
    document.querySelector('.nav_burger').classList.toggle('active')
})

// Modal

document.querySelector('.callback-button').addEventListener('click', (e) => {
    e.stopPropagation()
    document.querySelector('html').classList.add('overflow-hidden')
    document.querySelector('.fade').style.display = 'flex';
    document.querySelector('input:first-child').focus()
})

document.querySelector('.callback-button-2').addEventListener('click', (e) => {
    e.stopPropagation()
    document.querySelector('html').classList.add('overflow-hidden')
    document.querySelector('.fade').style.display = 'flex';
    document.querySelector('input:first-child').focus()
})

document.querySelector('.fade').addEventListener('click', (e) => {
    if(e.target.classList[0] == 'fade') {
        document.querySelector('html').classList.remove('overflow-hidden')
        document.querySelector('.fade').style.display = 'none';
    }
})

// InputMask

const form = document.querySelector('#form');
const tel = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(tel);

// JustValidate

new window.JustValidate('#form', {
    rules: {
        tel: {
            required: true,
            function: () => {
                const phone = tel.inputmask.unmaskedvalue();
                return Number(phone) && phone.length === 10;
            }
        }
    },
    messages: {
      name: {
          required: 'Не указано имя!',
          minLength: 'Необходимо ввести более 3 символов!',
          maxLength: 'Необходимо ввести менее 15 символов!'
      },
      tel: {
          required: 'Не указан номер телефона!',
          function: 'Номер телефона указан некорректно!'
      }
    },
    colorWrong: '#E7A018',
    submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    document.querySelector('.modal').insertAdjacentHTML('beforeend', '<div style="margin-top:5px; color: #FFF;">Сообщение успешно отправлено!</div>')
                    console.log('Отправлено')
                }
            }
        }

        xhr.open('POST', 'php/mail.php', true);
        xhr.send(formData);

        thisForm.reset();
    }
})