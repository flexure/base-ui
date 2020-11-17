import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { BaseTabsContext } from "./context";
import { Display } from "../Display";

export interface BaseTabInputs {
	key: string;
	title: ReactNode;
	index?: string | number;
}

export class BaseTab extends React.PureComponent {
	[x: string]: any;
	static propTypes: {
		title: React.Validator<ReactNode>;
		index?: React.Requireable<React.Requireable<string> | React.Requireable<number>>;
	};

	props!: BaseTabInputs & { children: React.ReactNode };

	componentDidMount() {
		this.context.context.addItem({
			key: this._reactInternalFiber.key,
			title: this.props.title,
			index: this.props.index,
		});
	}

	render() {
		const key = this._reactInternalFiber.key;
		const {
			context: { activeKey, openedKeys },
		} = this.context;
		const { children } = this.props;

		//LAZY LOADING
		if (openedKeys.find((e: any) => e === key)) {
			return <Display none={activeKey !== key}>{children}</Display>;
		} else return activeKey === key && children;
	}
}

BaseTab.contextType = BaseTabsContext;

BaseTab.propTypes = {
	title: PropTypes.node.isRequired,
	index: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};
