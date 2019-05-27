 $( document ).on( 'focus', ':input', function(){
        $( this ).attr( 'autocomplete', 'off' );
    });
 
$(document).ready(function () {
    $('#sessionModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    })

    $('#sessionModal').on('show.bs.modal', function (event) {

        var $modalDiv = $(event.delegateTarget);
        $('.sessionmodal_body').html("");
        $.ajax({
            type: "POST",
            url: baseurl + "admin/admin/getSession",
            dataType: 'text',
            data: {},
            beforeSend: function () {

                $modalDiv.addClass('modal_loading');
            },
            success: function (data) {
                $('.sessionmodal_body').html(data);
            },
            error: function (xhr) { // if error occured
                $modalDiv.removeClass('modal_loading');
            },
            complete: function () {
                $modalDiv.removeClass('modal_loading');
            },
        });
    })
    $(document).on('click', '.submit_session', function () {
        var $this = $(this);
        var datastring = $("form#form_modal_session").serialize();

        $.ajax({
            type: "POST",
            url: baseurl + "admin/admin/updateSession",
            dataType: "json",
            data: datastring,
            beforeSend: function () {

                $this.button('loading');
            },
            success: function (data) {
                if (data.status == 1) {
                    $('#sessionModal').modal('hide');
                    window.location.href = baseurl + "admin/admin/dashboard";
                    successMsg("Session change successful");
                }
            },
            error: function (xhr) {
                $this.button('reset');
            },
            complete: function () {
                $this.button('reset');
            },
        });
    });
    toastr.options = {
        "closeButton": true, // true/false
        "debug": false, // true/false
        "newestOnTop": false, // true/false
        "progressBar": false, // true/false
        "positionClass": "toast-top-right", // toast-top-right / toast-top-left / 
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300", // in milliseconds
        "hideDuration": "1000", // in milliseconds
        "timeOut": "5000", // in milliseconds
        "extendedTimeOut": "1000", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
//=============Sticky header==============
    $('#alert').affix({
        offset: {
            top: 10
            , bottom: function () {

            }
        }
    })

    $('#alert2').affix({
        offset: {
            top: 20
            , bottom: function () {

            }
        }
    })


//========================================


//==============User Quick session============
 $('#user_sessionModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    })
          $('#user_sessionModal').on('show.bs.modal', function (event) {

        var $modalDiv = $(event.delegateTarget);
        $('.user_sessionmodal_body').html("");
        $.ajax({
            type: "POST",
            url: baseurl + "common/getSudentSessions",
            dataType: 'text',
            data: {},
            beforeSend: function () {

                $modalDiv.addClass('modal_loading');
            },
            success: function (data) {
                $('.user_sessionmodal_body').html(data);
            },
            error: function (xhr) { // if error occured
                $modalDiv.removeClass('modal_loading');
            },
            complete: function () {
                $modalDiv.removeClass('modal_loading');
            },
        });
    });

       $(document).on('click', '.submit_usersession', function () {
        var $this = $(this);
        var datastring = $("form#form_modal_usersession").serialize();

        $.ajax({
            type: "POST",
            url: baseurl + "common/updateSession",
            dataType: "json",
            data: datastring,
            beforeSend: function () {

                $this.button('loading');
            },
            success: function (data) {
                if (data.status == 1) {
                    $('#sessionModal').modal('hide');
                    window.location.href = baseurl + "user/user/dashboard";
                    successMsg("Session change successful");
                }
            },
            error: function (xhr) {
                $this.button('reset');
            },
            complete: function () {
                $this.button('reset');
            },
        });
    });
       //====================

         $('#commanSessionModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    });
              $('#commanSessionModal').on('show.bs.modal', function (event) {

        var $modalDiv = $(event.delegateTarget);
        $('.commonsessionmodal_body').html("");
        $.ajax({
            type: "POST",
            url: baseurl + "common/getAllSession",
            dataType: 'text',
            data: {},
            beforeSend: function () {

                $modalDiv.addClass('modal_loading');
            },
            success: function (data) {
                $('.commonsessionmodal_body').html(data);
            },
            error: function (xhr) { // if error occured
                $modalDiv.removeClass('modal_loading');
            },
            complete: function () {
                $modalDiv.removeClass('modal_loading');
            },
        });
    });

       $(document).on('click', '.submit_common_session', function () {
        var $this = $(this);
        var datastring = $("form#form_modal_commonsession").serialize();

        $.ajax({
            type: "POST",
            url: baseurl + "common/updateSession",
            dataType: "json",
            data: datastring,
            beforeSend: function () {

                $this.button('loading');
            },
            success: function (data) {
                if (data.status == 1) {
                    $('#sessionModal').modal('hide');
                    window.location.href = data.redirect_url;
                    successMsg("Session change successful");
                }
            },
            error: function (xhr) {
                $this.button('reset');
            },
            complete: function () {
                $this.button('reset');
            },
        });
    });


});

function successMsg(msg) {
    toastr.success(msg);
}
function errorMsg(msg) {
    toastr.error(msg);
}
function infoMsg(msg) {
    toastr.info(msg);
}
function warningMsg(msg) {
    toastr.warning(msg);
}

// header afix//

