$(document).ready(function(){
    var loginPanel = $('section.login');
    if(loginPanel.length > 0){
        Mousetrap.bind('a d m i n', function(e) {
            if(!loginPanel.hasClass('active')){
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                loginPanel.addClass('active');
                loginPanel.find('input.username').focus().val("");
            }
        });
        loginPanel.find('input[type="reset"]').on('click',function(){
            loginPanel.removeClass('active');
        });
        Mousetrap.bind('escape', function() {
            if(loginPanel.hasClass('active')){
                loginPanel.find('input[type="reset"]').trigger('click');
            }
        })
    }
});