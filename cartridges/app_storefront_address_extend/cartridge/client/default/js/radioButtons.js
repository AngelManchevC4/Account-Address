$(document).ready(function(){

    const $radioButtonBusiness = $(".js-form-radio-button-business") ;
    const $radioButtonPrivate = $('.js-form-radio-button-private') ; 

    var $companyName = $('input[name$=_companyName]').val();
    var $vat = $('input[name$=_vat]').val();

    if($companyName && $vat){
        $radioButtonPrivate.removeAttr('checked')
        $('.businessAddress').removeClass('d-none');
        $radioButtonBusiness.attr('checked', 'checked');
    }else{
        $radioButtonBusiness.removeAttr('checked')
        $('.businessAddress').addClass('d-none');
        $radioButtonPrivate.attr('checked', 'checked');
    }
})