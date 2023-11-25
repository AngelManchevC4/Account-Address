$(document).ready(function(){

    var $companyName = $('input[name$=_companyName]').val();
    var $vat = $('input[name$=_vat]').val();

    if($companyName && $vat){
        $("#flexRadioDefault1").removeAttr('checked')
        $('.businessAddress').removeClass('d-none');
        $("#flexRadioDefault2").attr('checked', 'checked');
    }else{
        $("#flexRadioDefault2").removeAttr('checked')
        $('.businessAddress').addClass('d-none');
        $("#flexRadioDefault1").attr('checked', 'checked');
    }
})