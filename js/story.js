// const main = () => {
// 	const paragraphs = [];
// 	paragraphs.push("Hello World!");
// 	paragraphs.push("Goodbye World");
// 	paragraphs.push("");
// 	paragraphs.push("There's a newline above me >:)");

// 	const variable_declarations = {
// 		"apples":5,
// 		"bananas":0,
// 	};
// 	const variable_updates = {
// 		"bananas":+1,
// 	};

// 	const choices = {
// 		"1": ["ya!", main],
// 		"15": ["nah.", main],
// 	};

// 	return {
// 		"clear": true,
// 		"paragraphs": paragraphs,

// 		"choices": choices,

// 		"declarations": variable_declarations,
// 		"updates": variable_updates,
// 	};
// };

const main = () => {
	return {
		"clear": true,
		"paragraphs": [
			"You duck under the thorns of a lavender-colored bramble and step into the meadow, a bed of downy green grass at your feet. A small trodden path leads up to a weathered stone-brick pedestal, atop which floats a brilliantly white butterfly, hovering above the pedestal's surface by a handspan.\n",
			"The rest of the forest was vibrant with new life and romping baby animals, but you don't see any signs of them here. Only the shadows of the slatewood trees sway over you, and the whispering of willow branches fill the air.\n",
			"You follow the small path up to the pedestal, which is surrounded by a rustic ring of young lilac flowers. The butterfly doesn't seem to react at all to your approach...",
		],
		"choices":{
			"1": ["Leave the butterfly alone",leaveButterfly],
			"2": ["Crush the butterfly",crushButterfly]
		},
	};
};

const leaveButterfly = () => {
	return {
		"clear": false,
		"paragraphs": [
			"You profer an index finger to the butterfly - after a bit more of flitting about, it seems to recognize the new perch and lands on your finger.\n",
			"As it flexes and closes its wings, motes of light billow from the butterfly's tiny body, enveloping your hand in a soft, warm light. A soft breeze jets out from the pedestal in a circle, making the grass billow outwards in a ring that keeps growing until it hits the edges of the meadow. A smell of greenery fills the air. With the butterfly still alight on your finger, you turn to leave the meadow, feeling a new sense of confidence."
		],
		"choices": {
			"1": ["The end", end],
		}

	};
};

const crushButterfly = () => {
	return {
		"clear": false,
		"paragraphs": [
			"You stretch out your hand over the butterfly, and with a quick grip, crush its delicate wings and body between your fingers. Unexpectedly, a deep green blood spills out from the crushed insect's body, more than seems possible from such a small form. The shadows of the slatewood trees seem to close in on you, the shadows of their branches like claws.\n",
			"Hurriedly, you shake off the remnants of the butterfly. They fade away before they even touch the grass. You turn to hasten away from the meadow, feeling deeply cursed."
		],
		"choices": {
			"1": ["The end", end],
		}
	};
};

const end = () => {
	return {
		"clear": false,
		"paragraphs": [
			"THE END",
		],

	}
}