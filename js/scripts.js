// optimization todo: 1) memoization, 2) option to store length of sequence instead of sequence itself, 3) batch html rendering, 4) reduce inline css
// options todo: 1) option to show associated number with min and max

// const max = 300;

window.onload = () => {
	u('#submit').on('click', () => {
		u('#loading').css('display', 'none');
		u('#error').css('display', 'none');

		try {
			const start = parseInt(u('#start').val()) || 1;
			const end = parseInt(u('#end').val()) || 1;

			const showSeq = u('#show-seq').first().checked;
			const showSeqLen = u('#show-seq-len').first().checked;
			const showSeqBar = u('#show-seq-bar').first().checked;
			const fastMode = u('#fast-mode').first().checked;

			if (fastMode) {
				console.time('fast');
				const [number, length] = FastMaxCollatz(start, end);
				u('#out').html(
					`<p>Max Collatz sequence length between ${start} and ${end}: ${number}, Length: ${length}</p>`
				);
				console.timeEnd('fast');
				return;
			} else {
				const addHTML = showSeq || showSeqLen || showSeqBar;

				let html = '';
				let lens = [];
				console.time('loop');
				for (let i = start; i <= end; i++) {
					const arr = threeNPlusOne(i);

					if (addHTML) {
						html += `<b>${i}</b>: 
			${showSeqLen ? 'Length: ' + arr.length + '<br>' : ''} 
			${showSeq ? 'Sequence: ' + arr.join(', ') + '<br>' : ''}
			${
				showSeqBar
					? `<div class="bar" style="width:${
							arr.length * 8
					  }px"></div>`
					: ''
			} `;
					}

					// if (arr.length > max) console.log(i, arr.length);
					lens.push(arr.length);
				}
				console.timeEnd('loop');
				console.time('html');

				html =
					`Min Length: ${Math.min(...lens)}.
		Max Length: ${Math.max(...lens)}.
		Average Length: ${average(lens)}<br><br>` + html;

				u('#out').html(html);

				console.timeEnd('html');
			}
		} catch (err) {
			console.log(err);
			u('#error').css('display', 'block');
		}

		u('#loading').css('display', 'none');
	});

	u('input').on('keydown', (e) => {
		if (e.key == 'Enter') u('#submit').trigger('click');
	});

	u('#submit').trigger('click');

	u('#end').first().select();
};

function threeNPlusOne(x) {
	let n = x;
	let seq = [];
	while (n != 1) {
		// n % 2 === 0 (for positive integers)
		if (!(n & 1)) {
			n >>= 1; // n /= 2 (for integers)
		} else {
			n = 3 * n + 1;
		}
		seq.push(n);

		// if (seq.length > max) return x + ' is over ' + max + ' in length';
	}
	return seq;
}

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
