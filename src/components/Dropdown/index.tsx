/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useHandleClickOutside } from "../utils/handleClickOutside";
import { useEventTrigger } from "../utils/useEventTrigger";

export const BaseDropdown: React.FC<{ Overlay: React.ComponentType<any> }> = (props) => {
	const { Overlay } = props;
	const [visible, setVisible] = React.useState(false);
	const _ref = useHandleClickOutside(() => setVisible(false));
	const _childRef = useEventTrigger("mousedown", () => setVisible(!visible));

	return (
		<div ref={_ref}>
			<div ref={_childRef}>{props.children}</div>

			{visible && <Overlay />}
		</div>
	);
};
