// chatgpt function :^)
Array.prototype.remove = function (item) {
	const index = this.indexOf(item); // 'this' refers to the array instance
	if (index !== -1) {
		this.splice(index, 1); // Remove the item
	}
	return this; // Optional: allows chaining
};