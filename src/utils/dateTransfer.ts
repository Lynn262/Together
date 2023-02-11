export interface dateTransferInterface {
	(dateString: string): Date;
}

export const dateTransferFunc: dateTransferInterface = (dateString: string) => {
	let date = new Date(Date.parse(dateString.replace(/-/g, "/")));
	return date;
};
