"use strict";

const input = `You duck under the thorns of a lavender-colored bramble and step into the meadow, a bed of downy green grass at your feet. A small trodden path leads up to a weathered stone-brick pedestal, atop which floats a brilliantly white butterfly, hovering above the pedestal's surface by a handspan.
The rest of the forest was vibrant with new life and romping baby animals, but you don't see any signs of them here. Only the shadows of the slatewood trees sway over you, and the whispering of willow branches fill the air.
You follow the small path up to the pedestal, which is surrounded by a rustic ring of young lilac flowers. The butterfly doesn't seem to react at all to your approach...

+ Leave the butterfly alone -+> leave_butterfly
+ Crush the butterfly -+> crush_butterfly

= leave_butterfly
You profer an index finger to the butterfly - after a bit more of flitting about, it seems to recognize the new perch and lands on your finger.
As it flexes and closes its wings, motes of light billow from the butterfly's tiny body, enveloping your hand in a soft, warm light. A soft breeze jets out from the pedestal in a circle, making the grass billow outwards in a ring that keeps growing until it hits the edges of the meadow. A smell of greenery fills the air. With the butterfly still alight on your finger, you turn to leave the meadow, feeling a new sense of confidence.

+ The end -+> END

= crush_butterfly
You stretch out your hand over the butterfly, and with a quick grip, crush its delicate wings and body between your fingers. Unexpectedly, a deep green blood spills out from the crushed insect's body, more than seems possible from such a small form. The shadows of the slatewood trees seem to close in on you, the shadows of their branches like claws.
Hurriedly, you shake off the remnants of the butterfly. They fade away before they even touch the grass. You turn to hasten away from the meadow, feeling deeply cursed.

+ The end -+> END`;
const output = parse(input);

function parse_all(files) {
	
}

function pre_parse(file) {
	const story = {
		passages: {},
		variables: {},
	};
}

function parse(text) {
	const lines = text.split('\n');
	const parsed_objects = {};
	let default_object = undefined;

	let now_parsing = undefined;
	for(let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if(line[0] == '' && now_parsing === undefined) continue;
		if(line.startsWith("=")) {
			now_parsing = "passage";
			
			const passage_name = get_passage(line, "name");
			const passage_height = get_passage(line, "height");
			const passage_chunk = find_passage_chunk(lines.slice(i), passage_height);
			const passage = parse_passage_chunk(passage_chunk, passage_name, passage_height);
			parsed_objects[passage.name] = passage;

			i += passage_chunk.length - 1;
		}

		else {
			now_parsing = "text";

			const text_chunk = find_text_chunk(lines.slice(i));
			if(default_object === undefined) {
				default_object = parse_text_chunk(text_chunk);
			}
		}
	}

	return [parsed_objects, default_object];
}

function parse_passage_chunk(chunk, passage_name = "", passage_height = -1, depth = 0) {
	if(passage_name === "") passage_name = get_passage(chunk[0], "name");
	if(passage_height === -1) passage_height = get_passage(chunk[0], "height");

	let passage = {
		"name": passage_name,
		"subpassages": {},
		"text": "",
	};

	let lines_to_skip = 0;
	for(let i = 1; i < chunk.length; i++) {
		let line = chunk[i];
		if(line.startsWith("=")) {
			let height = get_passage(line, "height");
			if(passage_height > height) { // subpassage
				let [subpassage, to_skip] = parse_passage_chunk(chunk.slice(i), "", height, depth + 1);
				passage.subpassages[subpassage.name] = subpassage;
				i += to_skip;
				continue;
			} else { // sibling passage
				break;
			}
		}
		passage.text += line + "\n";
		lines_to_skip++;
	}

	passage.text = passage.text.trim();
	if(passage.text.startsWith('"') & passage.text.endsWith('"')) passage.text = passage.text.slice(1, passage.text.length - 1);
	if(depth > 0) return [passage, lines_to_skip];
	else return passage;
}

function find_passage_chunk(lines, height) { // lines is an array (already split by \n)
	let ending_line_index = 1;
	for(let i = 1; i < lines.length; i++) {
		let line = lines[i];
		if(line.startsWith("=")) { // subpassage or a different passage :P
			let passage_height = get_passage(line, "height");
			if(passage_height >= height) break;
		}
		ending_line_index++;
	}

	return lines.slice(0, ending_line_index);
}

function get_passage(string, property = "name") {
	let [num_leading_equals, num_trailing_equals] = ( function (s) {
		let [le, ee] = [0, 0];
		for(let i = 0; i < s.length; i++) {
			if(s[i] === "=") le++;
			else break;
		}
		for(let i = s.length-1; i >= 0; i--) {
			if(s[i] === "=") ee++;
			else break;
		}
		return [le, ee];
	})(string);
	if(num_trailing_equals != 0 && num_leading_equals != num_trailing_equals) {} // warn

	if(property === "name") {
		let passage_name = string.slice(num_leading_equals, string.length - num_trailing_equals).trim();
		return passage_name;
	} else if(property === "height") {
		return num_leading_equals;
	} else {
		console.log(`get_passage: couldn't get passage property ${property}`);
	}
}

function parse_text_chunk(chunk) {
	let text = "";
	
	for(let i = 0; i < chunk.length; i++) {
		let line = chunk[i].trim();
		if(line.endsWith("<>")) text += line;
		else text += line + "\n";
	}
	return text;
}

function find_text_chunk(lines) {
	let ending_line_index = 1;
	for(let i = 1; i < lines.length; i++) {
		let line = lines[i];
		if(is_start_of_a_new_feature(line)) {
			break;
		}
		ending_line_index++;
	}

	return lines.slice(0, ending_line_index);
}

function is_start_of_a_new_feature(string) {
	if(string.length == 0) return false;

	const parse_recognize = [
		"=", 
		"+", 
		"*", 
	];
	if(parse_recognize.find((item) => item.startsWith(string[0])) !== undefined) return true;
	return false;
}