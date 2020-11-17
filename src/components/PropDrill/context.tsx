import React from "react";
import _ from "lodash";

export interface IChild {
	key: string;
	title: string | React.ReactNode;
	icon?: any;
}

export interface IContext {
	children: IChild[];
	addChild: (child: IChild | any) => void;
	removeItem: (child: IChild | any) => void;
	activeKey: string;
	onChildClick: (child: IChild) => (event: any) => void;
}

interface IPropDrillContext {
	context: IContext;
}

export const PropDrillContext = React.createContext<IPropDrillContext>({
	context: {
		children: [],
		addChild: (child: IChild) => {},
		removeItem: (child: IChild) => {},
		activeKey: "",
		onChildClick: (child: IChild) => (event: any) => {},
	},
});

interface S {
	children: any[];
	activeKey: string;
	openedKeys: string[];
}

export class PropDrillProvider extends React.Component<{ activeKey?: any; onChildCkick?: (child: any) => void }, S> {
	state = {
		children: [],
		activeKey: this.props.activeKey,
		openedKeys: [],
	};

	addChild = (child: IChild) => {
		const isItemExist = this.state.children.find((t: IChild) => child.key === t.key);

		if (!isItemExist) {
			this.setState((prevState: { children: any[] }, props) => {
				return {
					children: prevState.children.concat(child),
				};
			});
		}
	};
	onChildClick = (child: any) => (event: any) => {
		this.props.onChildCkick && this.props.onChildCkick(child);
		this.setState((prev: { openedKeys: any[] }) => {
			return { ...this.state, activeKey: child.key, openedKeys: _.uniq(prev.openedKeys.concat(child.key)) };
		});
	};
	removeItem = (key: string) => {
		this.setState((prevState: { children: any[] }, props) => {
			return {
				children: prevState.children.filter((child) => child.key !== key),
			};
		});
	};

	render() {
		const { addChild, removeItem } = this;
		return (
			<PropDrillContext.Provider
				value={{
					context: {
						...this.state,
						addChild,
						removeItem,
						onChildClick: this.onChildClick.bind(this),
					},
				}}
			>
				{this.props.children}
			</PropDrillContext.Provider>
		);
	}
}

export const BasePageConsumer = PropDrillContext.Consumer;
