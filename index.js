$(".game-description, .game-description img").addClass("normal-shadow")
$(".game-description").click(function() {
	window.open($("a", this)[0].href)
})