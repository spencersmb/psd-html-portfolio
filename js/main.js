/**
 * Created by spencerbigum on 12/22/14.
 */

jQuery(document).ready(function($){

var $lateral_menu_trigger = $('#sb-menu-trigger'),
    $content_wrapper = $('.sb-main-content'),
    $navigation = $('header');



    //Open Close Menu
    $lateral_menu_trigger.on('click', function(event){

        event.preventDefault();

        //Add class to transform hamburger to X
        $lateral_menu_trigger.toggleClass('is-clicked');

        $navigation.toggleClass('lateral-menu-is-open');
        $content_wrapper.toggleClass('lateral-menu-is-open');

        $('#sb-lateral-nav').toggleClass('lateral-menu-is-open');

    });

    //Open submenu
    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();

        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);

    });
});

