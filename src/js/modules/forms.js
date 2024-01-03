const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]')

    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = input.value
            input.value = input.value.replace(/\D/, '');
            
            if ((value.length > 11) || (value.length < 9)) {
                input.style.border = '1px solid red';
                return false
            } else {
                input.style.border = '1px solid green';
            }
        });
    });

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    };

    const crearInput = () => {
        inputs.forEach(input => {
            input.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();


            let statuMessege = document.createElement('div');
            statuMessege.classList.add('status');
            item.appendChild(statuMessege)


            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    statuMessege.textContent = message.success;
                })
                .catch(() => statuMessege.textContent = message.failure)
                .finally(() => {
                    crearInput();
                    setTimeout(() => {
                        statuMessege.remove();
                    }, 3000);
                });
        });

    });
};
export default forms;