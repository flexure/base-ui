/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { ITheme } from "../../styled/Theme";
import { fnDecorator } from "../utils";

export type NavBarAlignment = "vertical" | "horizontal";

export interface IStyleNavBar {
	_container?: any;
	_nearItemsContainer?: any;
	_farItemsContainer?: any;
}

type P = {
	title?: React.ReactNode;
	alignment?: NavBarAlignment;
	_style?: IStyleNavBar;
};

const NavBarNear: React.FC<{ _nearItemsContainer?: any }> = ({ _nearItemsContainer, children }) => (
	<div css={_nearItemsContainer}>{children}</div>
);

NavBarNear.displayName = "NavBarNear";

const NavBarFar: React.FC<{ _farItemsContainer?: any }> = ({ _farItemsContainer, children }) => (
	<div css={_farItemsContainer}>{children}</div>
);

NavBarFar.displayName = "NavBarFar";

export class BaseNavBar extends React.PureComponent<P> {
	static decorate = fnDecorator<typeof BaseNavBar, IStyleNavBar>(BaseNavBar);

	static NearContainer = NavBarNear;
	static FarContainer = NavBarFar;

	NearItems = () => {
		return (
			<React.Fragment>
				{React.Children.map(this.props.children, (child: any) => {
					if (child.type.displayName === "NavBarNear") {
						return React.cloneElement(child, { ...this.props._style });
					}
				})}
			</React.Fragment>
		);
	};
	FarItems = () => {
		return (
			<React.Fragment>
				{React.Children.map(this.props.children, (child: any) => {
					console.log(child.type);
					if (child.type.displayName === "NavBarFar") {
						return React.cloneElement(child, { ...this.props._style });
					}
				})}
			</React.Fragment>
		);
	};

	render() {
		const { alignment, title, _style } = this.props;
		const { NearItems, FarItems } = this;
		return (
			<div css={(theme: ITheme) => _style?._container(theme, { alignment })}>
				{title}
				{this.NearItems && <NearItems />}
				{this.FarItems && <FarItems />}
			</div>
		);
	}
}
