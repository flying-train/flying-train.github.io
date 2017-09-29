$(".game-description, .game-description img").addClass("normal-shadow")
$(".normal-shadow").hover(
	function() {
		$(this).addClass("closer-shadow")
	}, function() {
		$(this).removeClass("closer-shadow")
	}
)
$(".game-description").click(function() {
	window.open($("a", this)[0].href)
})
