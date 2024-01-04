
function windowClose() {
    const windows = document.querySelectorAll('[data-modal]');
    windows.forEach(item => {
        item.style.display = 'none';
        document.body.style.overflow = '';
    })
}

const modals = () => {

    function bindModal(triggerSelectors, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelectors),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
           

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                windowClose();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                // document.body.classList.add('modal-open')
            });
        })
        close.addEventListener('click', () => {
            windowClose();
            // modal.style.display = 'none';
            // document.body.style.overflow = '';
            // document.body.classList.remove('modal-open')
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windowClose();
                // modal.style.display = 'none';
                // document.body.style.overflow = '';
                // document.body.classList.remove('modal-open')
            }
        })

    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
    // showModalByTime('.popup', 3000);
};
export { windowClose };
export default modals;