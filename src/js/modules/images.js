const images = (gallerySelector) => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector(gallerySelector),
        bigImage = document.createElement('img');
    imgPopup.classList.add('popup');
    workSection.append(imgPopup);

    imgPopup.style.cssText = `
        justify-content: center;
        align-items: center;
        display: none;
        object-fit: cover;
    `
    bigImage.style.cssText = `
        width: 50%;
        height: 50%;
        object-fit: cover;
    `
    imgPopup.append(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target && target.matches('.preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path)
        }
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    })
};

export default images;