$(".ds-mainHeader__btn").on("click",function(n){$("body").toggleClass("nav-open")}),$(".ds-overlay").on("click",function(n){$("body").removeClass("nav-open")}),$(".ds-mainNav").on("click",function(n){n.stopPropagation()}),$(".ds-tabs").on("click",".ds-tabs__link",sistemaTabs);var $todosLosSection=$(".ds-tabs__panel");function sistemaTabs(n){n.preventDefault();var s=$(this).parent(),e=$todosLosSection.eq(s.index());s.children().addClass("is-active").parent().siblings().children().removeClass("is-active"),e.removeClass("u-hidden").siblings().addClass("u-hidden")}function showTable(n,s){for(var e=0;e<n;e++)$("#tabla"+e).hide();var i=s;$("[data-value='"+i+"']").show(),$(".c-mngDrop__btn").text(i)}$(".c-mngAccordion__btn").on("click",function(n){n.preventDefault(),$(this).parents(".c-mngAccordion__tab").toggleClass("is-open")}),$(".c-mngSwitch__btn").on("click",function(n){n.preventDefault(),$(this).addClass("is-active").siblings().removeClass("is-active")}),$(".c-mngTabs__link").on("click",function(n){n.preventDefault(),$(this).addClass("is-active").parent().siblings().find(".c-mngTabs__link").removeClass("is-active"),$(this).parentsUntil(".c-mngTabs").siblings().find(".c-mngTabs__panel").addClass("u-hidden"),$(this).parentsUntil(".c-mngTabs").siblings().find($(this).attr("href")).removeClass("u-hidden")}),$(".c-mngDrop__btn").on("click",function(n){n.preventDefault(),$(this).parent().toggleClass("is-open")}),$(".c-mngDrop--in-voiceTone .c-mngDrop__item").on("click",function(n){n.preventDefault(),showTable(this.parentElement.children.length,n.target.text),$(this).parent().parent().parent().removeClass("is-open")}),showTable(12,"Dos puntos");