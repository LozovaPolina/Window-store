import checkNumInputs from "./checkNumInputs";

const forms = (state) => {

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        buttons = document.querySelectorAll('[type="submit"]');



    checkNumInputs('input[name="user_phone"]');


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
        // item.addEventListener('change', (e) => {
        //     inputs.forEach(input => {
        //         input.addEventListener('input', (e) => {
        //             if (!input.value) {
        //                 buttons.forEach(button => {
        //                     button.setAttribute('disabled', true );
        //                 });
        //             } else {
        //                 buttons.forEach(button => {
        //                     button.removeAttribute('disabled')
        //                 });
        //             }
        //         })
        //     })
        // })

        item.addEventListener('submit', (e) => {
            e.preventDefault();


            let statuMessege = document.createElement('div');
            statuMessege.classList.add('status');
            item.appendChild(statuMessege)


            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }
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