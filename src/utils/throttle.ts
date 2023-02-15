/**
 * 节流
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 */
let timer, flag: boolean;
export function throttle(func: () => any, wait = 3000, immediate = true) {
	//  是否立即执行
	if (immediate) {
		//  立即执行
		if (!flag) {
			flag = true;
			typeof func === "function" && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true;
			timer = setTimeout(() => {
				flag = false;
				typeof func === "function" && func();
			}, wait);
		}
	}
}
