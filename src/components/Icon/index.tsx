/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Icon, IconProp } from "react-icons-kit";
import { IconSet, IconSetType } from "./IconSet";
import _ from "lodash";
import { IDecorate, fnDecorator } from "../utils/fnDecorator";

export interface IStyleBaseIcon {
	_container?: any;
}

export type IconPosition = "left" | "right" | "top" | "bottom";

interface Props extends Omit<IconProp, "style" | "icon"> {
	_style?: IStyleBaseIcon;
	position?: IconPosition;
	icon: IconSetType;
}

export const BaseIcon: React.FC<Props> & IDecorate<IStyleBaseIcon> = (props) => {
	const { _style, children } = props;
	const iProps = _.omit(props, ["style", "icon"]);
	return (
		<div css={_style?._container}>
			<Icon icon={_.get(IconSet, props.icon)} {...iProps} />
			{children}
		</div>
	);
};

BaseIcon.defaultProps = {
	position: "top",
};

BaseIcon.decorate = fnDecorator<typeof BaseIcon, IStyleBaseIcon>(BaseIcon);
