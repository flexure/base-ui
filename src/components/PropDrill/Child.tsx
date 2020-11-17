import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { PropDrillContext } from "./context";

export interface ChildInputs {
	key: string;
	title: ReactNode;
}

export class PropDrillChild extends React.PureComponent {
	[x: string]: any;
	static propTypes: {
		title: React.Validator<ReactNode>;
	};

	props!: ChildInputs & { children: React.ReactNode };

	componentDidMount() {
		this.context.context.addChild({
			key: this._reactInternalFiber.key,
			title: this.props.title,
		});
	}

	render() {
		const { children } = this.props;
		const key = this._reactInternalFiber.key;
		//Section Key
		return React.Children.map(children, (child: any) => {
			return React.cloneElement(child, { id: key, ...this.props });
		});
	}
}
PropDrillChild.contextType = PropDrillContext;
PropDrillChild.propTypes = {
	title: PropTypes.node.isRequired,
};
