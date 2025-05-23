import { rimraf } from "rimraf";
export const reset = () => {
	return rimraf(app.path.clean);
}