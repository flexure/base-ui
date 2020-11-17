/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import _ from "lodash";
import { fnDecorator } from "../utils/fnDecorator";

export interface IStyleButton {
	_button: (theme: any, args?: any) => any;
}

interface Props {
	_style?: IStyleButton;
	kind?: typeof BaseButton.kind;
	outline?: boolean;
	shape?: typeof BaseButton.shape;
	scale?: typeof BaseButton.scale;
}

export type BaseButtonProps = Props & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>;

export class BaseButton extends React.PureComponent<BaseButtonProps> {
	static decorate = fnDecorator<typeof BaseButton, IStyleButton>(BaseButton);

	static scale: "small" | "normal" | "big";
	static kind: "primary" | "success" | "alert" | "warning" | "secondary";
	static shape: "default" | "circle" | "round";

	static defaultProps = {
		type: "primary",
		outline: "false",
		shape: "default",
		scale: "normal",
	};

	render() {
		var iProps = _.omit(this.props, ["outline"]);
		return (
			<button type="button" css={(theme: any) => this.props._style?._button(theme)} {...iProps}>
				{this.props.children}
			</button>
		);
	}
}
