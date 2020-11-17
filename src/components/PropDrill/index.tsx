/**
 * Note: Children must assign {...props} if it's not React.ReactNode to supply for their id={key} - For DocPage
 */

/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { BasePageConsumer as Consumer, PropDrillProvider as Provider, IContext } from "./context";
import { PropDrillChild } from "./Child";

interface IPropDrill {
	renderMenu: (ctx: IContext) => React.ReactNode;
}

export class PropDrill extends React.PureComponent<IPropDrill> {
	static Section = PropDrillChild;
	render() {
		const { children } = this.props;
		return (
			<Provider>
				<Consumer>
					{(value) => (
						<React.Fragment>
							{this.props.renderMenu(value.context)}
							{children}
						</React.Fragment>
					)}
				</Consumer>
			</Provider>
		);
	}
}
