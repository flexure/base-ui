/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { BaseMenuProvider } from "./Menu.context";
import { BaseMenuItem } from "./Menu.item";
import { IStyleMenuToggle } from "./Menu.toggle";
import { IDecorate, fnDecorator } from "../utils/fnDecorator";

export interface IStyleBaseMenu {
	_container: any;
	_item?(theme: any, args: { active: boolean }): any;
	_toggleable?: IStyleMenuToggle;
}

export interface IBaseMenu {
	onItemClick?: (key: string) => void;
	activeKey?: any;
	_style?: IStyleBaseMenu;
}

export const BaseMenu: React.FC<IBaseMenu> & { Item: typeof BaseMenuItem } & IDecorate<IStyleBaseMenu> = (props) => {
	const [activeKey, setActiveKey] = React.useState(props.activeKey);

	const itemClick = (key: any) => {
		setActiveKey(key);
		props.onItemClick && props.onItemClick(key);
	};

	return (
		<BaseMenuProvider value={{ activeKey, itemClick, _style: props._style }}>
			<div css={props._style?._container}>{props.children}</div>
		</BaseMenuProvider>
	);
};

BaseMenu.Item = BaseMenuItem;
BaseMenu.decorate = fnDecorator<typeof BaseMenu, IStyleBaseMenu>(BaseMenu);
