function FastMaxCollatz(start, end) {
	function collatzLength(n) {
		let length = 1;
		while (n !== 1) {
			if (!(n & 1)) {
				n >>= 1;
			} else {
				n = 3 * n + 1;
			}
			length++;
		}
		return length;
	}

	let maxNum = start;
	let maxLength = collatzLength(start);

	for (let i = start + 1; i <= end; i++) {
		const length = collatzLength(i);
		if (length > maxLength) {
			maxLength = length;
			maxNum = i;
		}
	}

	return [maxNum, maxLength];
}
