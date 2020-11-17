/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import _ from "lodash";

interface IDisplay extends React.HTMLAttributes<HTMLDivElement> {
	none: boolean | any;
}

export const Display: React.FC<IDisplay> = (props) => {
	const iProps = _.omit(props, "none");
	return (
		<div
			css={css`
				${props.none ? { display: "none" } : {}};
			`}
			{...iProps}
		>
			{props.children}
		</div>
	);
};
