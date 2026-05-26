import { Fragment } from "react";
import type { ReactNode } from "react";

type SwitchStepProps = {
	/** 1-based index of the component to render */
	step: number;
	/** Ordered list of components corresponding to each step */
	components: Array<ReactNode>;
	/** Optional fallback when the requested step does not exist */
	fallback?: ReactNode;
};

export function SwitchStep({ step, components, fallback = null }: SwitchStepProps) {
	if (!components.length) {
		return null;
	}

	const index = Number.isFinite(step) ? Math.trunc(step) - 1 : -1;

	if (index < 0 || index >= components.length) {
		return <Fragment>{fallback}</Fragment>;
	}

	return <Fragment>{components[index]}</Fragment>;
}
