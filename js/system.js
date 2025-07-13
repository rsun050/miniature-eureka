function on_load() {
	for(let i = 1; i <= 15; i++) { // 1 indexing lmao
		const option_name = "option_" + i;
		const option_text_name = "option_" + i + "_text";

		options.push(document.getElementById(option_name));
		option_texts.push(document.getElementById(option_text_name));		
	}
}

function new_game() {
	passage = main;
}

function process() {
	const data = passage();
	write_passage(data["paragraphs"], data["clear"]);
	write_choices(data["choices"]);
	update_vars(data["declarations"], data["updates"]);
}

function make_choice() {
	console.log(this);
	passage = this.$destination_passage;
	process();
}

function write_passage(paragraphs, clear) {
	if(clear) text_content.innerText = "";
	else text_content.innerText += "\n* * *\n";

	for(paragraph of paragraphs) {
		text_content.innerText += paragraph + "\n";
	}
}

function write_choices(choices) {
	let no_choices = false;
	if(choices === undefined) no_choices = true;
	for (let i = 1; i <= 15; i++) {
		if(no_choices || choices[i] === undefined) {
			// default choice :P
			option_texts[i].innerText = " ";
			options[i].disabled = true;
			options[i].onclick = null;
			options[i].$destination_passage = null;
		} else {
			option_texts[i].innerText = choices[i][0];
			options[i].disabled = false;
			options[i].onclick = make_choice;
			options[i].$destination_passage = choices[i][1];
		}
	}
}

function update_vars(declarations, updates) {
	if(declarations !== undefined) for(declaration in declarations) { assign_variable(declaration, declarations[declaration]); }
	if(updates !== undefined) for(update in updates) { update_variable(update, updates[update]); }
}

function assign_variable(name, value) {
	game_variables[name] = value;
}

function update_variable(name, value) {
	let vari = game_variables[name];
	let vartype = typeof vari;

	if(vartype === "number" || vartype === "string") game_variables[name] += value;
	else if(vartype === "boolean") { game_variables[name] = value; }
	else if(Array.isArray(vari)) {
		if(value[0] === "+") game_variables[name].push(value);
		else game_variables[name].remove(value);
	} else if (vartype === "object") {
		if(value[0] === "+") delete game_variables[name][value];
		else game_variables[name][value][1] = game_variables[name][value][2];
	} 
}

function value(name) {
	if(Array.isArray(name)) {
		return game_variables[name[0]][name[1]];
	} else {
		return ( name in game_variables ) ? game_variables[name] : null ;
	}
}