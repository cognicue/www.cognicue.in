(function ($) {
  "use strict";
  $(window).on("load", function () {
    $("#preloader-active").delay(100).fadeOut("slow");
    $("body").delay(100).css({
      overflow: "visible",
    });
    $("#back-top").fadeOut();
  });
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".header-sticky").removeClass("sticky-bar");
      $("#back-top").fadeOut(500);
    } else {
      $(".header-sticky").addClass("sticky-bar");
      $("#back-top").fadeIn(500);
    }
  });
  $("#back-top a").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });
  var menu = $("ul#navigation");
  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: "+",
      openedSymbol: "-",
    });
  }

  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      fade: true,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();
  var testimonial = $(".h1-testimonial-active");
  if (testimonial.length) {
    testimonial.slick({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrow: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
            arrow: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrow: false,
          },
        },
      ],
    });
  }
  var nice_Select = $("select");
  if (nice_Select.length) {
    nice_Select.niceSelect();
  }
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });
  new WOW().init();

  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }
  mailChimp();
  var popUp = $(".single_gallery_part, .img-pop-up");
  if (popUp.length) {
    popUp.magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
      callbacks: {
        elementParse: function (item) {
          item.type = $(item.el).attr("type") || "image";
        },
      },
    });
  }
  $(document).ready(function () {
    if (!window.location.hash) {
      return;
    }
    let $tooltip = $(".tooltiptext", window.location.hash);
    $tooltip.css("visibility", "visible");
    setTimeout(() => {
      $tooltip.hide(500);
    }, 2000);
  });
  $("#recognitionSlide").slick({
    lazyLoad: "ondemand",
    prevArrow:
      '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    speed: 800,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrow: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
        },
      },
    ],
  });
  var protocol = "https";
  var baseAPI = "script.google.com";
  var macros = "/macros/s/";
  var baseID =
    "AKfycbxHFZew6iti_FyKLZ8NUhyZCLPUBFc5UnTGy_D3M-gyJLa2cb9q2L_BALskFiIlXCy1UA";
  var scriptURL = protocol + "://" + baseAPI + macros + baseID + "/exec";
  var contactGSForm = $("#contactGSForm");
  var describe = $("#describe");
  var userName = $("#userName");
  var companyName = $("#companyName");
  var companySize = $("#companySize");
  var userEmail = $("#userEmail");
  var userPhone = $("#userPhone");
  var likeDemo = $("#like-demo");
  var likeDiscuss = $("#like-discuss");
  var needSupport = $("#need-support");
  var userMessage = $("#userMessage");
  var policyAccepted = $("#policy-accepted");

  function validEmail(value) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return true;
    }

    return false;
  }

  function validPhone(value) {
    if (/^\d+$/.test(value)) return true;

    return false;
  }

  userName.on("keyup", function () {
    var feedback = $(this).closest("div").find(".invalid-feedback");
    if ($.trim($(this).val()) != "") {
      feedback.hide();
      $(this).removeClass("invalid-input");
    } else {
      feedback.show();
      $(this).addClass("invalid-input");
    }
  });

  companyName.on("keyup", function () {
    var feedback = $(this).closest("div").find(".invalid-feedback");
    if ($.trim($(this).val()) != "") {
      feedback.hide();
      $(this).removeClass("invalid-input");
    } else {
      feedback.show();
      $(this).addClass("invalid-input");
    }
  });

  userEmail.on("keyup", function () {
    var feedback = $(this).closest("div").find(".invalid-feedback");
    if (validEmail($(this).val())) {
      feedback.hide();
      $(this).removeClass("invalid-input");
    } else {
      feedback.show();
      $(this).addClass("invalid-input");
    }
  });

  userPhone.on("keyup", function () {
    var feedback = $(this).closest("div").find(".invalid-feedback");
    if (validPhone($(this).val())) {
      feedback.hide();
      $(this).removeClass("invalid-input");
    } else {
      feedback.show();
      $(this).addClass("invalid-input");
    }
  });

  userMessage.on("keyup", function () {
    var feedback = $(this).closest("div").find(".invalid-feedback");
    if ($.trim($(this).val()) != "") {
      feedback.hide();
      $(this).removeClass("invalid-input");
    } else {
      feedback.show();
      $(this).addClass("invalid-input");
    }
  });

  policyAccepted.on("change", function () {
    var feedback = $(this).closest("div").find(".invalid-feedback");
    if ($(this).is(":checked")) {
      feedback.hide();
    } else {
      feedback.show();
    }
  });

  contactGSForm.on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData();

    if (describe.val() != "") {
      formData.append("describe", describe.val());
    } else {
      describe.closest("div").find(".invalid-feedback").show();
      return false;
    }

    if ($.trim(userName.val()) != "") {
      formData.append("userName", userName.val());
    } else {
      userName.closest("div").find(".invalid-feedback").show();
      userName.addClass("invalid-input");
      return false;
    }

    if ($.trim(companyName.val()) != "") {
      formData.append("companyName", companyName.val());
    } else {
      companyName.closest("div").find(".invalid-feedback").show();
      companyName.addClass("invalid-input");
      return false;
    }

    if (companySize.val() != "") {
      formData.append("companySize", companySize.val());
    } else {
      companySize.closest("div").find(".invalid-feedback").show();
      return false;
    }

    if (validEmail(userEmail.val())) {
      formData.append("userEmail", userEmail.val());
    } else {
      userEmail.closest("div").find(".invalid-feedback").show();
      return false;
    }

    if (validPhone(userPhone.val())) {
      formData.append("userPhone", userPhone.val());
    } else {
      userPhone.closest("div").find(".invalid-feedback").show();
      return false;
    }

    if (likeDemo.is(":checked")) {
      formData.append("like-demo", "Yes");
    } else {
      formData.append("like-demo", "No");
    }

    if (likeDiscuss.is(":checked")) {
      formData.append("like-discuss", "Yes");
    } else {
      formData.append("like-discuss", "No");
    }

    if (needSupport.is(":checked")) {
      formData.append("need-support", "Yes");
    } else {
      formData.append("need-support", "No");
    }

    if ($.trim(userMessage.val()) != "") {
      formData.append("userMessage", userMessage.val());
    } else {
      userMessage.closest("div").find(".invalid-feedback").show();
      userMessage.addClass("invalid-input");
      return false;
    }

    if (!policyAccepted.is(":checked")) {
      policyAccepted.closest("div").find(".invalid-feedback").show();
      return false;
    }

    fetch(scriptURL, { method: "POST", body: formData })
      .then(function () {
        swal({
          title: "Good job!",
          text: "Thanks for Contacting us..! We Will Contact You Soon...",
          icon: "success",
        });
        contactGSForm[0].reset();
      })
      .catch(function (error) {
        swal({
          title: "Oops Something wrong!",
          text: error.message,
          icon: "error",
        });
      });
  });
})(jQuery);
