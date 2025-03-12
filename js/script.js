//画面幅360px未満のとき、viewportを360pxに固定
!(function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
        const value =
            window.outerWidth > 360
                ? "width=device-width,initial-scale=1"
                : "width=360";
        if (viewport.getAttribute("content") !== value) {
            viewport.setAttribute("content", value);
        }
    }
    addEventListener("resize", switchViewport, false);
    switchViewport();
})();

$(function () {
    //ハンバーガーメニュー
    $(".humberger").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".menu").fadeOut();
        } else {
            $(this).addClass("active");
            $(".menu").fadeIn();
        }
    });

    //スムーススクロール
    $('a[href^="#"]').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? "html" : href);
        var header = $(".header").height();
        var position = target.offset().top - header;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });

    //MV スライドショー
    var count = $(".slide__item").length;
    var current = 1;
    var next = 2;
    var interval = 4000;
    var duration = 1200;
    var timer;
    $(".slide__item:not(:first-of-type)").hide();
    timer = setInterval(slideTimer, interval);
    function slideTimer() {
        $(".slide__item:nth-of-type(" + current + ")").fadeOut(duration);
        $(".slide__item:nth-of-type(" + next + ")").fadeIn(duration);
        current = next;
        next = ++next;
        if (next > count) {
            next = 1;
        }
    }

    //INTERVIEW スライダー
    $(".slick_interview").slick({
        centerMode: true,
        // autoplay: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        variableWidth: true,
        prevArrow:
            '<button class="interview__arrow interview__arrow--prev"><img src="./img/arrow_slide.svg" alt=""></button>',
        nextArrow:
            '<button class="interview__arrow interview__arrow--next"><img src="./img/arrow_slide.svg" alt=""></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "10px",
                    variableWidth: false,
                },
            },
        ],
    });
    //キャッチコピーの高さを揃える
    function adjustCopyHeight(){
        let wList = new Array();
        $(".interview__text").each(function(index){
        wList[index] = $(this).innerHeight();
        });
        let maxW = Math.max.apply(null, wList);
        $(".interview__text").css({"min-height":maxW+"px"});
    }
    //ウインドウがリサイズする度に実行
    $(window).resize(function () {
        adjustCopyHeight();
    });
    //初回実行
    adjustCopyHeight();

    //フェードインアニメーション
    $(window).on("load scroll", function () {
        const elements = document.querySelectorAll(
            ".left_to_right, .right_to_left, .bottom_to_top"
        );
        $(elements).each(function () {
            var target = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var height = $(window).height();
            if (scroll > target - height) {
                $(this).addClass("active");
            }
        });
    });

    //フェードインアニメーション
    var effect_btm = 0; // 画面下からどの位置でフェードさせるか(px)
    var effect_move = 50; // どのぐらい要素を動かすか(px)
    var effect_time = 1000; // エフェクトの時間(ms) 1秒なら1000

    //親要素と子要素のcssを定義
    $(".scroll-fade-row").css({
        opacity: 0,
    });
    $(".scroll-fade-row")
        .children()
        .each(function () {
            $(this).css({
                opacity: 0,
                transform: "translateY(" + effect_move + "px)",
                transition: effect_time + "ms",
            });
        });

    // スクロールまたはロードするたびに実行
    $(window).on("scroll load", function () {
        var scroll_top = $(this).scrollTop();
        var scroll_btm = scroll_top + $(this).height();
        var effect_pos = scroll_btm - effect_btm;

        //エフェクトが発動したとき、子要素をずらしてフェードさせる
        $(".scroll-fade-row").each(function () {
            var this_pos = $(this).offset().top;
            if (effect_pos > this_pos) {
                $(this).css({
                    opacity: 1,
                    transform: "translateY(0)",
                });
                $(this)
                    .children()
                    .each(function (i) {
                        $(this)
                            .delay(100 + i * 200)
                            .queue(function () {
                                $(this)
                                    .css({
                                        opacity: 1,
                                        transform: "translateY(0)",
                                    })
                                    .dequeue();
                            });
                    });
            }
        });
    });

    //FAQ アコーディオン
    $(".job_faq__question").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".job_faq__answer").slideUp(200);
        } else {
            $(this).addClass("active");
            $(this).siblings(".job_faq__answer").slideDown(200);
        }
    });

    //モーダル
    // $(".modal_trigger").click(function () {
    //     $(".modal").fadeIn();
    // });
    // $(".modal").click(function () {
    //     $(this).fadeOut();
    // });       
});
