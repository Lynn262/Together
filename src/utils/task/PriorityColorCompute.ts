export type priorityType = "important" | "normal" | "ignore";

interface PriorityColorComputer {
	(priority: priorityType): string;
}

export const priorityColorComputer: PriorityColorComputer = (priority: priorityType) => {
	if (priority === "important") return "#f6c659";
	else if (priority === "normal") return "#73d897";
	else if (priority === "ignore") return "#95a6bf";
	return "#fa8888";
};
