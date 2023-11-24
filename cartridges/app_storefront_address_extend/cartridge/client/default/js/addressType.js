
const radioButtons = document.querySelectorAll('.form-radio-button');
const businessAddress = document.querySelector('.businessAddress')

radioButtons.forEach(radioButton => {
    radioButton.onchange = () => {
        
        const addressType = radioButton.value;

        switch (addressType) {
            case "Private Address":
                businessAddress.classList.add('d-none');
                break;
            case "Business Address":
                businessAddress.classList.remove('d-none');
                break;
        }
    }
});
