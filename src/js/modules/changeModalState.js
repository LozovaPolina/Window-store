
import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');


    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(eventType, elem, prop, button) {
        elem.forEach((item, i) => {
            item.addEventListener(eventType, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Cold' : state[prop] = 'Warm';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                cheakToSubmit(button);

            });

        });
    }


    function cheakToSubmit(button) {
        if ((state.form !== undefined && state.width !== undefined && state.height !== undefined) ||
            (state.type !== undefined && state.profile)) {
            buttonToggleDisable(button, false);
        }
    }

    function buttonToggleDisable(button, boolean) {
        const btn = document.querySelector(button);
        if (boolean) {
            btn.setAttribute('disabled', boolean);
        } else {
            btn.removeAttribute('disabled');
        }
    }
    

    buttonToggleDisable('.popup_calc_button', true);
    buttonToggleDisable('.popup_calc_profile_button', true);
    bindActionToElems('click', windowForm, 'form', '.popup_calc_button');
    bindActionToElems('input', windowWidth, 'width', '.popup_calc_button');
    bindActionToElems('input', windowHeight, 'height', '.popup_calc_button');
    bindActionToElems('change', windowType, 'type', '.popup_calc_profile_button');
    bindActionToElems('change', windowProfile, 'profile', '.popup_calc_profile_button');

};



export default changeModalState;