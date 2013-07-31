$(document).ready(function(){
    $('.dl-menu').find('ul.dl-submenu').prepend( '<li class="dl-back"><a href="#">Back</a></li>');
    $('.dl-menu').find('ul.dl-submenu').closest('li').addClass('dl-submenu-container');
    $breadcrumb = $('.adminPanel .breadcrumb');
    $breadcrumb.update = function(){
        $(this).find('span.clear').remove();
        $(this).append('<span class="clear"></span>');

        if($(this).find('span.level').length <= 0){
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    };

    $breadcrumb.update();

    $.each($('.dl-menu').find('ul.dl-submenu'),function(v,k){
        $(this).closest('li').find('a').first().on('click',function(e){
            e.preventDefault();

            $('.dl-menu').addClass('dl-subview');
            $('.dl-menu li.dl-subviewopen').removeClass('dl-subviewopen');

            var $subviewopen = $(this).closest('li');
            $subviewopen.removeClass('dl-subview').addClass('dl-subviewopen');
            $subviewopen.find('a').first().addClass('dl-subview-title');
            $subviewopen.parents('li').addClass('dl-subview');

            $breadcrumb.find('span.level').last().html($breadcrumb.find('span.level').last().html() + '&nbsp;&gt;');
            $breadcrumb.append('<span class="level">'+$subviewopen.find('a').html()+'</span>');
            $breadcrumb.update();

        })
    });

    $.each($('.dl-menu').find('.dl-back a'),function(v,k){
        $(this).on('click',function(e){
            var $from = $(this).closest('.dl-subviewopen'),
                $to = $from.closest('li.dl-subview');

            $from.removeClass('dl-subviewopen');
            $from.find('.dl-subview-title').removeClass('dl-subview-title');
            $from.find('.dl-subview').removeClass('dl-subview');

            $breadcrumb.find('span.level').last().remove();
            $breadcrumb.find('span.level').last().html(($breadcrumb.find('span.level').last().html()+'').replace('&nbsp;&gt;',''));
            $breadcrumb.update();

            if($to.length <= 0) {
                $('.dl-menu').removeClass('dl-subview');
            } else {
                $to.removeClass('dl-subview').addClass('dl-subviewopen')
            }
        });
    });

});