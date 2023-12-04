
const reCaptcha = function (token) {

    let $url = $("#reCaptchaButton").attr("data-verify-url").valueOf();
    const $form = $('#registrationForm');

    $.spinner().start();

    $.ajax({
        type: "POST",
        url: $url,
        data: { token },
        dataType: "json",
        success: function () {
            $form.trigger('submit')
            $.spinner().stop()
        },
        error: function () {
            $.spinner().stop()
        }
    })

}

window.reCaptcha = reCaptcha;