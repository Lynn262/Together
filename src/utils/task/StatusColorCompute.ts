//使用 | 可以让一个变量的值变为指定的固定值
export type stateType = "ready" | "now" | "expire";

interface StatusColorComputer {
	(state: stateType): string;
}

export const statusColorComputer: StatusColorComputer = (state: stateType) => {
	if (state === "ready") return "#f6c659";
	else if (state === "now") return "#73d897";
	else if (state === "expire") return "#95a6bf";
	return "#fa8888";
};
