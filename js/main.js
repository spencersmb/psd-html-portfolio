/**
 * Created by spencerbigum on 12/22/14.
 */

jQuery(document).ready(function($){


////////////////////////////
//Window Resize script
////////////////////////////


    var desktopLarge = 993,
        resizedWidth;

    moveNavigation();

    $(window).on('resize', function(){
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    function checkwindowWidth(){

        var windowWidth = $(window).width();

        $(window).resize(function() {
            resizedWidth = $(window).width();
        });

        if( resizedWidth >= desktopLarge || windowWidth >= desktopLarge ){
            return true;
        } else {
            return false;
        }
    };

    function moveNavigation(){

        var desktop = checkwindowWidth();

        if ( desktop ) {
            console.log('desktop');
            // navigation.detach();
            // navigation.insertBefore('.cd-header-buttons');
        } else {
            console.log('mobile');
            // navigation.detach();
            // navigation.insertAfter('.cd-main-content');
        }
    }

////////////////////////////
//Navigation Controls
////////////////////////////



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

        //hide faq items if user clicks nav




    });

    //Open submenu
    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();

        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);

    });


//////////////////////////////////////
//FAQ
//////////////////////////////////////

    var faqPath = '/faq.html',
        cssPath = '/css3.html',
        currentPath = window.location.pathname;



    var MqM = 992,
        MqL = 1200;

    var faqsSections = $('.sb-faq-group'),
        faqTrigger = $('.sb-faq-trigger'),
        faqsContainer = $('.sb-faq-items'),
        faqsCategoriesContainer = $('.sb-faq-categories'),
        faqsCategories = faqsCategoriesContainer.find('a'),
        closeFaqsContainer = $('.sb-close-panel');

    //update category sidebar while scrolling
    $(window).on('scroll', function(){

        if ( $(window).width() > MqM && currentPath == faqPath ) {
            (!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
        }
    });

    //resize for mobile
    $(window).on('resize', function(){

        var left = $('.sb-faq').offset().left;

        if($(window).width() <= MqM){


        } else if (faqsCategoriesContainer.hasClass('is-fixed') ){
                faqsCategoriesContainer.css({
                    'left': left,
                });
        }
    });


    //console.log('length = ' + length);



    //toggle category on click
    faqsCategoriesContainer.on('click', 'li', function(event){
        event.preventDefault();
        //var activeCategory = $('.sb-faq-categories a[href="#'+actual.attr('id')+'"]');
            $(this).siblings('li').find('a').removeClass('selected');
            $(this).find('a').toggleClass('selected');


    });

    //on category click
    faqsCategories.on('click', function(event){

        event.preventDefault();

        var selectedHref = $(this).attr('href'),
            target = $(selectedHref);

        //scroll to the link clicked
        $('body,html').animate({ 'scrollTop': target.offset().top - 125}, 200);

    //mobile only
        if( $(window).width() < MqM) {

            //todo - remove class selected on all tags

            //slide in animation
            //scroll to top of faq-items div and remove selected then add selected to the clicked ul
            faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');



            //add left to the X button
            closeFaqsContainer.addClass('move-left');

            //add overlay
            $('#overlay').addClass('sb-overlay');

            $('body').css({
               'overflow':'hidden'
            });
        } else {
            //add bounce for some reason to the scroll
           // $('body,html').animate({ 'scrollTop': target.offset().top - 19}, 200);
        }

    });

    //close faq lateral panel - mobile only
    //Originally used bind but that is outdated now - us .on() if possible
    $('body').on('click touchstart', function(event){

        //event.target allows a js to listen for multiple elements to be clicked
        // VS. $this which watches just the entire object.
        if( $(event.target).is('.sb-overlay') || $(event.target).is('.sb-close-panel')) {
            closePanel(event);
        }
    });

    //jquery mobile
    faqsContainer.on('swiperight', function(event){
        closePanel(event);
    });

    //open faq item on click
    faqTrigger.on('click', function(event){
        event.preventDefault();

        //go up to the parent and toggle the arrow flip
        $(this).next('.sb-faq-contact').slideToggle(200).end().parent('li').toggleClass('content-visible');
    });


    function closePanel(e) {
        e.preventDefault();

        faqsContainer.removeClass('slide-in').find('li').show();

        closeFaqsContainer.removeClass('move-left');

        $('#overlay').removeClass('sb-overlay');

        $('body').css({
            'overflow':'auto'
        });

    }


    function updateCategory(){
        updateCategoryPosition();
        updateSelectedCategory();
    }

    function updateCategoryPosition() {

        //cal distance from top of the window to the top of the container
        var top = $('.sb-faq').offset().top,
            //calc total distance track the side bar can travel before it stops
            height = $('.sb-faq').height() - $('.sb-faq-categories').height() - 90,
            //height from top of window + nav
            margin = 90;

        //console.log('sb-faq distance from top ' + top);
        //console.log('height ' + height);
       // console.log('window top ' + $(window).scrollTop());

        //if window position is lower than the categories & total height is larger then window position do X
        if( top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop() ) {

            //calc left value to keep it in the same place when position fixed is added
            var leftValue = faqsCategoriesContainer.offset().left,
                widthValue = faqsCategoriesContainer.width(); //not used

            faqsCategoriesContainer.addClass('is-fixed').css({
                'left': leftValue,
                'top': margin,
                '-moz-transform': 'translateZ(0)',
                '-webkit-transform': 'translateZ(0)',
                '-ms-transform': 'translateZ(0)',
                '-o-transform': 'translateZ(0)',
                'transform': 'translateZ(0)',
            });
          //make the side bar stop scrolling - ie ran out of track
        } else if( top - margin + height <= $(window).scrollTop()) {

            //subtrack window sroll position to keep track of how far past our track is built
            //stops scrolling and translateY keeps track of where it is.
            var delta = top - margin + height - $(window).scrollTop();


            faqsCategoriesContainer.css({
                '-moz-transform': 'translateZ(0) translateY('+delta+'px)',
                '-webkit-transform': 'translateZ(0) translateY('+delta+'px)',
                '-ms-transform': 'translateZ(0) translateY('+delta+'px)',
                '-o-transform': 'translateZ(0) translateY('+delta+'px)',
                'transform': 'translateZ(0) translateY('+delta+'px)',
            });
        } else {
            //winow is at top
            faqsCategoriesContainer.removeClass('is-fixed').css({
                'left': 0,
                'top': 0,
            });
        }
    }

    //var margin = $('.sd-faq-title').eq(1).css('marginTop').replace('px', '');
    //console.log('margin = '+ margin);



        function updateSelectedCategory() {

        //loop through
        faqsSections.each(function(){

            //target item inside the loop?
            var actual = $(this),

                //turn 28px into 28 number
                margin = parseInt($('.sb-faq-title').eq(1).css('marginTop').replace('px', '')),

                 //look for a tag in each and us $this.attr('id') to get each id
                activeCategory = $('.sb-faq-categories a[href="#'+actual.attr('id')+'"]'),

                //activeCategory = the a tag with id
                //if the first tag parent li is active - 0 - if not round $this from the top
                topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);

            //console.log('margin = '+ margin); //28
            //console.log('activeCat '+ activeCategory[0]); //link of the a tag
            //console.log('topSection '+ topSection); // top of each li
            //console.log('actual offset '+ actual.offset().top);
            //console.log('actual height '+ actual.height());

            //basics starts at 0 - 150 &&
            //mobile starts at 629 - 150 && 629 + 257 + 28 -150
            //479 & 764
            if ( ( topSection - 150 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 150 > $(window).scrollTop() ) ) {
                activeCategory.addClass('selected');
            }else {
                activeCategory.removeClass('selected');
            }
        });
    }

//////////////////////////////////////
//Css3 Animations
//////////////////////////////////////

    //console.log(currentPath);

    if( currentPath == cssPath ){

    }

});




