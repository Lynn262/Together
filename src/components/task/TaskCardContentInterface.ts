import { priorityType } from "../../utils/task/PriorityColorCompute";
import { stateType } from "../../utils/task/StatusColorCompute";
export interface TaskCardContentInterface {
	priority: priorityType;
	id: number;
	taskName: string;
	taskStatus: stateType;
	taskDeadline: string;
	taskStartTime?: string;
}
