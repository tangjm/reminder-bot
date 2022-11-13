class Reminder {
	#name;
	#msg;
	#scheduleExpression;
	#isActive;
	#mentions;

	constructor(name, msg, scheduleExpression, isActive, mentions) {
		this.#name = name;
		this.#msg = msg;
		this.#scheduleExpression = scheduleExpression;
		this.#isActive = isActive;
		this.#mentions = mentions;
	}

	getName() {
		return this.#name;
	}

	getMsg() {
		return this.#msg;
	}

	setMsg(msg) {
		this.#msg = msg;
	}

	getScheduleExpression() {
		return this.#scheduleExpression;
	}

	setScheduleExpression(scheduleExpression) {
		this.#scheduleExpression = scheduleExpression;
	}

	isActive() {
		return this.#isActive;
	}

	setIsActive(isActive) {
		this.#isActive = isActive;
	}

	getMentions() {
		return this.#mentions;
	}
}

module.exports.Reminder = Reminder;