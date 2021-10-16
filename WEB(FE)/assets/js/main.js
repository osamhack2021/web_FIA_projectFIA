
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 16;
  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset += 16;
  }
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }

    // 로그인 세션이 존재할 경우
    if (sessionStorage.getItem("userToken")) {
      document.getElementById('hdrBtn').innerText = '로그아웃';
      document.getElementById('sttBtn').innerText = '마이페이지';
    } else {
      document.getElementById('hdrBtn').innerText = '로그인';
      document.getElementById('sttBtn').innerText = '로그인';
    }

  });


  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

function fnClearTextField() {
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password1').value = '';
  document.getElementById('password2').value = '';
  document.getElementById('army_num').value = '';
  document.getElementById('army_rank').value = '';
  document.getElementById('name').value = '';
}

/**
 * 로그인, 회원가입 modal 실행
 * 
 * @param {string} type modal type
 */
function fnLORModal(type) {
  fnClearTextField();

  if (type === 'hdr') {
    if (sessionStorage.getItem('userToken')) {
      fnLogout();
    } else {
      $('#loginModal').modal('show'); 
    }
  } else if (type === 'stt') {
    if (sessionStorage.getItem('userToken')) {
      console.log('마이페이지');
    } else {
      $('#loginModal').modal('show'); 
    }

  } else if (type === 'register') {
    $('#loginModal').modal('hide'); 
    $('#registerModal').modal('show'); 
  }
}

function fnRegister() {

  let email = document.getElementById('email').value;
  let password1 = document.getElementById('password1').value;
  let password2 = document.getElementById('password2').value;
  let army_num = document.getElementById('army_num').value;
  let army_rank = document.getElementById('army_rank').value;
  let name = document.getElementById('name').value;

  switch(army_rank) {
    case '이병':
      army_rank = 'private';
      break;
    case '일병':
      army_rank = 'first_class private';
      break;
    case '상병':
      army_rank = 'corporal';
      break;
    case '병장':
      army_rank = 'sergeant';
      break;
    default :
      army_rank = 'executive';
      break;
  } 

  // 조건
  let regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
  let regExpPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;
  let regExpArmyNum = /^[0-9]{2}(-)[0-9]{5,8}$/;

  if (password1 != password2) {
    alert('동일한 패스워드를 입력해 주십시오.');
    return false;
  } else if (email.match(regExpEmail) == null) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  } else if (email.length > 50) {
    alert('이메일은 최대 50글자까지 입력 가능합니다.');
    return false;
  } else if(name.length > 20) {
    alert('이름의 길이는 최대 20글자까지 입력 가능합니다.');
    return false;
  } else if (password1.match(regExpPassword) == null) {
    alert('패스워드는 숫자, 영어, 특수문자를 포함한 8~50 글자까지 입력 가능합니다.');
    return false;
  } else if (army_num.match(regExpArmyNum) == null) {
    alert('군번 형식이 올바르지 않습니다.');
    return false;
  }

  $.ajax({
    // url 변경 예정
    url: "https://moonjewoong.pythonanywhere.com/accounts/",
    dataType: "json", 
    type: "POST", 
    data: {
      "username": "",
      "email": email,
      "password1": password1,
      "password2": password2,
      "army_num": army_num,
      "army_rank": army_rank,
      "name": name
    }, 
    success: function(data) { 
      alert('회원가입에 성공했습니다.');  
      fnClearTextField();
      $('#registerModal').modal('hide'); 
      $('#loginModal').modal('show'); 
    }, 
    error: function(request, status, error) {
      alert('이미 가입된 이메일 또는 군번입니다.');

      // console.log(request.responseText);

      // console.log(request);
      // console.log(status);
      // console.log(error);
    }
  });

  return false; 
}

function fnLogin() {
  let regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
  let regExpPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;

  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;

  if (email.match(regExpEmail) == null) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  } else if (email.length > 50) {
    alert('이메일은 최대 50글자까지 입력 가능합니다.');
    return false;
  } else if (password.match(regExpPassword) == null) {
    alert('패스워드는 숫자, 영어, 특수문자를 포함한 8~50 글자까지 입력 가능합니다.');
    return false;
  }

  $.ajax({
    // url 변경 필요 
    url: "https://moonjewoong.pythonanywhere.com/accounts/login/",
    dataType: "json", 
    type: "POST", 
    data: {
      "username" : "",
      "email": email,
      "password": password
    }, 
    success: function(data) { 
      alert(`반갑습니다 ${data.user.name}님!`);
      sessionStorage.setItem('userToken', data.access_token);
      sessionStorage.setItem('userToken_R', data.refresh_token);
      
      location.href = 'index.html';
    }, 
    error: function(request, status, error) {
      alert('로그인에 실패했습니다.');

      // console.log(request.responseText);
      // console.log(status);
      // console.log(error);
    }
  });

  return false;
}

function fnLogout() {
  $.ajax({
    // url 변경 필요 
    url: "https://moonjewoong.pythonanywhere.com/accounts/logout/",
    dataType: "json", 
    type: "POST", 
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userToken')}`);
    },
    data: {
      refresh: sessionStorage.getItem('userToken_R')
    }, 
    success: function(data) { 
      alert('로그아웃 되었습니다.');
      sessionStorage.clear();
      location.href = 'index.html';
    }, 
    error: function(request, status, error) {
      alert('로그아웃이 실패했습니다.');

      // console.log(request.responseText);
      // console.log(status);
      // console.log(error);
    }
  });
}