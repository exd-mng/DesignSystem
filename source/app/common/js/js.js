




$('.ds-mainHeader__btn').click(function(e){
	e.stopPropagation();
	$('.container').toggleClass("ds-container--open")
});


$(".ds-tabs").on("click", ".ds-tabs__link", sistemaTabs);
var $todosLosSection = $(".ds-tabs__panel");
function sistemaTabs(e) {
	e.preventDefault();
	var $parentThis = $(this).parent(),
	sectionaMostrar = $todosLosSection.eq($parentThis.index());
	$parentThis.children().addClass("is-active").parent().siblings().children().removeClass("is-active");
	sectionaMostrar.removeClass("u-hidden").siblings().addClass("u-hidden");
}

// Accordion
$('.c-mngAccordion__btn').on('click', function(e) {
	e.preventDefault();
	var $this = $(this);
	$this.parents(".c-mngAccordion__tab").toggleClass("is-open");
});

//switch
$('.c-mngSwitch__btn').on('click', function(e) {
	e.preventDefault();
	$(this).addClass('is-active').siblings().removeClass('is-active');
});

//tabs
$('.c-mngTabs__link').on('click', function(e) {
	e.preventDefault();
	$(this).addClass('is-active').parent().siblings().find(".c-mngTabs__link").removeClass('is-active');
});

//dropdown
$('.c-mngDrop__btn').on('click', function(e) {
	e.preventDefault();
	$(this).parent().toggleClass('is-open');
});




