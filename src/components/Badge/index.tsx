/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { fnDecorator } from "../utils/fnDecorator";

export interface IStyleBadge {
	_span: any;
}

type Props = {
	_style?: IStyleBadge;
};

export class BaseBadge extends React.PureComponent<Props> {
	static decorate = fnDecorator<typeof BaseBadge, IStyleBadge>(BaseBadge);
	render() {
		return <span css={this.props._style?._span}>{this.props.children}</span>;
	}
}
