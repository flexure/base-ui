/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { BasePageConsumer as Consumer, BasePageProvider as Provider, IBaseSection } from "./context";
import { DocSection } from "./BaseSection";
import { fnDecorator } from "../../utils";

export interface IBasePageDocStyle {
	_container: any;
	_menuContainer: any;
	_sectionContainer: any;
	_asideContainer: any;
}

export type BasePageDocProps = {
	_style?: IBasePageDocStyle;
	renderTitle: (item: IBaseSection) => React.ReactNode;
};

export class BasePageDoc extends React.PureComponent<BasePageDocProps> {
	static Section: typeof DocSection = DocSection;
	static decorate = fnDecorator<typeof BasePageDoc, IBasePageDocStyle>(BasePageDoc);
	render() {
		const { children, _style } = this.props;
		return (
			<Provider>
				<Consumer>
					{(value) => (
						<div css={_style?._container}>
							<div css={_style?._menuContainer}>
								{value.context.items.map((item) => {
									return (
										<React.Fragment key={item.key}>{this.props.renderTitle(item)}</React.Fragment>
									);
								})}
							</div>
							{children}
							<div css={_style?._asideContainer} />
						</div>
					)}
				</Consumer>
			</Provider>
		);
	}
}
