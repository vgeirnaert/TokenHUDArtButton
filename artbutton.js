Hooks.on("renderTokenHUD", (hud, html, token) => {
	let actor = game.actors.get(token.actorId); 
	let synthActor = token.actorData;

	let artButton = document.createElement("div");
	
	artButton.classList.add("control-icon");
	artButton.classList.add("artwork-open");
	artButton.innerHTML = `<i class="fas fa-image fa-fw"></i>`
	artButton.title = game.i18n.localize("TKNHAB.TooltipText");
	
	let showName = 	token.displayname == CONST.TOKEN_DISPLAY_MODES.ALWAYS ||
					token.displayname == CONST.TOKEN_DISPLAY_MODES.HOVER
	let hiddenName = game.i18n.localize("DND5E.Name");

	let actorImg = synthActor.img || actor.data.img;
	let tokenImg = token.img;

	let am = actorImg === "icons/svg/mystery-man.svg";
	let tm = tokenImg === "icons/svg/mystery-man.svg";
	
	if (!(am && tm)) {
		actorImg = am ? tokenImg : actorImg;
		tokenImg = tm ? actorImg : tokenImg;
	}

	$(artButton).click((event) => {
		new ImagePopout(actorImg , {
			title: showName ? synthActor.name || actor.name : hiddenName,
			shareable: true,
			uuid: actor.uuid
		}).render(true);
	});
	$(artButton).contextmenu((event) => {
		new ImagePopout(tokenImg, {
			title: showName ? token.name : hiddenName,
			shareable: true,
		}).render(true);
	});

	html.find("div.left").append(artButton);
});