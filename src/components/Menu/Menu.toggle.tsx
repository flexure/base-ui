/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { FnToggle } from "@flexure/common";

export interface IStyleMenuToggle {
	_container?: any;
	_text?: any;
	_subContainer?: any;
}

export interface IMenuItemToggle {
	text: React.ReactNode;
	enableToggle?: boolean;
	_style?: IStyleMenuToggle;
}

export const MenuItemToggle: React.FC<IMenuItemToggle> = (props) => {
	const { _style, text, enableToggle, children } = props;
	return (
		<FnToggle>
			{(toggle, setToggle) => (
				<div css={_style?._container}>
					<div css={_style?._text} onClick={() => setToggle(!toggle)}>
						{text}
					</div>
					{(!toggle || !enableToggle) && <div css={_style?._subContainer}>{children}</div>}
				</div>
			)}
		</FnToggle>
	);
};

MenuItemToggle.defaultProps = {
	enableToggle: true,
};
