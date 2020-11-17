/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { BaseTabsConsumer as Consumer, BaseTabsProvider as Provider } from "./context";
import { BaseTab } from "./Tab";
import { fnDecorator } from "../utils/fnDecorator";

export interface IStyleBaseTabs {
	_container?: any;
	_item?(theme: any, args: { active: boolean }): any;
	_itemContainer?: any;
	_itemPanel?: any;
}

interface Props {
	_style?: IStyleBaseTabs;
	activeKey?: string;
	onTabClick?: (tab: any) => void;
}

export { BaseTab };

export class BaseTabs extends React.PureComponent<Props> {
	static BaseTab = BaseTab;
	static decorate = fnDecorator<typeof BaseTabs, IStyleBaseTabs>(BaseTabs);

	render() {
		const { children, activeKey, onTabClick, _style } = this.props;
		return (
			<div css={_style?._container}>
				<Provider activeKey={activeKey} onItemClick={onTabClick}>
					<Consumer>
						{(value) => (
							<React.Fragment>
								<div css={_style?._itemContainer}>
									{value.context.items.map((item) => {
										return (
											<button
												key={item.key}
												css={(theme) =>
													_style?._item &&
													_style?._item(theme, {
														active: value.context.activeKey === item.key,
													})
												}
												onClick={value.context.onClick(item)}
											>
												{item.title}
											</button>
										);
									})}
								</div>
								<div css={_style?._itemPanel}>{children}</div>
							</React.Fragment>
						)}
					</Consumer>
				</Provider>
			</div>
		);
	}
}
