/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { BaseMenuConsumer } from "./Menu.context";
import { IMenuItemToggle, MenuItemToggle } from "./Menu.toggle";

export interface IBaseMenuItem extends IMenuItemToggle {
	key: string;
}

export class BaseMenuItem extends React.PureComponent<IBaseMenuItem> {
	// for _reactIntenalFiber.key
	[x: string]: any;

	render() {
		const key = this._reactInternalFiber.key;

		return (
			<BaseMenuConsumer>
				{(value) =>
					this.props.children ? (
						<MenuItemToggle _style={value._style?._toggleable} {...this.props} />
					) : (
						<div
							onClick={(e: any) => value.itemClick && value.itemClick(key)}
							css={(theme) =>
								value._style?._item && value._style?._item(theme, { active: value.activeKey === key })
							}
						>
							{this.props.text}
						</div>
					)
				}
			</BaseMenuConsumer>
		);
	}
}
