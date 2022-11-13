function createEnum(values) {
	const enumObject = {};
	for (const val of values) {
		enumObject[val] = val;
	}
	return Object.freeze(enumObject);
}

const MentionsEnum = createEnum(['EVERYONE', 'SELF', 'NONE']);

module.exports = MentionsEnum;