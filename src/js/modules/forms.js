import checkNumInputs from "./checkNumInputs";
import { windowClose } from "./modals";
const forms = (state) => {

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');



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
                for (let key in state) {
                    delete state[key];
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
                        windowClose();
                    }, 1000);
                    
                });
        });
    });
};

export default forms;