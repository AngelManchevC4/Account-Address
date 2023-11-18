$(document).ready(function (e) {

    var $privateCheckbox = $('#flexRadioDefault1');
    var $businessCheckbox = $('#flexRadioDefault2');

    $privateCheckbox.on("input", function (e) {
        if ($privateCheckbox[0].checked) {
            $("body").trigger('address:private')
            console.log("address:private");
        }
    })

    $businessCheckbox.on("input", function (e) {
        if ($businessCheckbox[0].checked) {
            $("body").trigger('address:business')
            console.log("address:business");
        }
    })

    $("body").on('address:private', function (e, response) {
        $(".business-address").addClass("d-none");
        $("#addressForm").removeClass("d-none");
    })


    $("body").on('address:business', function (e, response) {
        $(".business-address").removeClass("d-none");
        $("#addressForm").removeClass("d-none");
    })

})


