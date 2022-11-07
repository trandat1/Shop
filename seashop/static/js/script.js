var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 8000); // Change image every 2 seconds
}

jQuery("#carousel").owlCarousel({
  rewind: true /* use rewind if you don't want loop */,
  margin: 20,
  /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  nav: true,
  responsive: {
    0: {
      items: 2,
    },

    600: {
      items: 3,
    },

    1024: {
      items: 4,
    },

    1366: {
      items: 4,
    },
  },
});

//back to top button

if ($("#back-to-top").length) {
  var scrollTrigger = 1, // px
    backToTop = function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $("#back-to-top").addClass("show");
      } else {
        $("#back-to-top").removeClass("show");
      }
    };
  backToTop();
  $(window).on("scroll", function () {
    backToTop();
  });
  $("#back-to-top").on("click", function (e) {
    e.preventDefault();
    $("html,body").stop().animate(
      {
        scrollTop: 0,
      },
      700
    );
  });
}

/*cart*/
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.0;
var fadeTime = 300;

/* Assign actions */
$(".product-quantity input").change(function () {
  updateQuantity(this);
});

$(".product-removal button").click(function () {
  removeItem(this);
});

/* Recalculate cart */
function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $(".product").each(function () {
    subtotal += parseFloat($(this).children(".product-line-price").text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = subtotal > 0 ? shippingRate : 0;
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $(".totals-value").fadeOut(fadeTime, function () {
    $("#cart-subtotal").html(subtotal.toFixed(2));
    $("#cart-tax").html(tax.toFixed(2));
    $("#cart-shipping").html(shipping.toFixed(2));
    $("#cart-total").html(total.toFixed(2));
    if (total == 0) {
      $(".checkout").fadeOut(fadeTime);
    } else {
      $(".checkout").fadeIn(fadeTime);
    }
    $(".totals-value").fadeIn(fadeTime);
  });
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children(".product-price").text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children(".product-line-price").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}

// open close sub menu of side menu start
var sideMenuList = $(".side-menu-wrap nav > ul > li > i");
$(sideMenuList).on("click", function () {
  if (!$(this).siblings(".sub-menu").hasClass("d-block")) {
    $(this).siblings(".sub-menu").addClass("d-block");
  } else {
    $(this).siblings(".sub-menu").removeClass("d-block");
  }
});
// open close sub menu of side menu end

// side menu close start
$(".side-menu-close").on("click", function () {
  if (!$(".side-menu-close").hasClass("closed")) {
    $(".side-menu-close").addClass("closed");
  } else {
    $(".side-menu-close").removeClass("closed");
  }
});
// side menu close end

// auto append overlay to body start
$(".wrapper").append('<div class="custom-overlay h-100 w-100"></div>');
// auto append overlay to body end

// open side menu when clicked on menu button start
$(".side-menu-close").on("click", function () {
  if (
    !$(".side-menu-wrap").hasClass("opened") &&
    !$(".custom-overlay").hasClass("show")
  ) {
    $(".side-menu-wrap").addClass("opened");
    $(".custom-overlay").addClass("show");
  } else {
    $(".side-menu-wrap").removeClass("opened");
    $(".custom-overlay").removeClass("show");
  }
});
// open side menu when clicked on menu button end

// close side menu when clicked on overlay start
$(".custom-overlay").on("click", function () {
  sideMenuCloseAction();
});
// close side menu when clicked on overlay end

// close side menu when swiped start
var isDragging = false,
  initialOffset = 0,
  finalOffset = 0;
$(".side-menu-wrap")
  .mousedown(function (e) {
    isDragging = false;
    initialOffset = e.offsetX;
  })
  .mousemove(function () {
    isDragging = true;
  })
  .mouseup(function (e) {
    var wasDragging = isDragging;
    isDragging = false;
    finalOffset = e.offsetX;
    if (wasDragging) {
      if (initialOffset > finalOffset) {
        sideMenuCloseAction();
      }
    }
  });
// close side menu when swiped end

function sideMenuCloseAction() {
  $(".side-menu-wrap").addClass("open");
  $(".wrapper").addClass("freeze");
  $(".custom-overlay").removeClass("show");
  $(".side-menu-wrap").removeClass("opened");
  $(".side-menu-close").removeClass("closed");
  $(sideMenuList).siblings(".sub-menu").removeClass("d-block");
}
// close side menu when clicked on overlay end

// close side menu over 992px start
$(window).on("resize", function () {
  if ($(window).width() >= 992) {
    sideMenuCloseAction();
  }
});
// close side menu over 992px end

//side menu drop down

$(document).ready(function () {
  //jquery for toggle sub menus
  $(".sub-btn").click(function () {
    $(this).next(".sub-menu").slideToggle();
    $(this).find(".dropdown").toggleClass("rotate");
  });

  //jquery for expand and collapse the sidebar
  $(".menu-btn").click(function () {
    $(".side-bar").addClass("active");
    $(".menu-btn").css("visibility", "hidden");
  });

  $(".close-btn").click(function () {
    $(".side-bar").removeClass("active");
    $(".menu-btn").css("visibility", "visible");
  });
});


