import React from "react";
import _ from "lodash";

export interface IBaseTab {
	key: string;
	title: string | React.ReactNode;
	index?: number;
	icon?: any;
}

interface IContext {
	context: {
		items: IBaseTab[];
		addItem: (item: IBaseTab | any) => void;
		removeItem: (item: IBaseTab | any) => void;
		onClick: (item: IBaseTab) => (event: any) => void;
		activeKey: string;
	};
}

export const BaseTabsContext = React.createContext<IContext>({
	context: {
		items: [],
		addItem: (item: any) => {},
		removeItem: (item: any) => {},
		onClick: (item: any) => (event: any) => {},
		activeKey: "",
	},
});

interface S {
	items: any[];
	activeKey: string;
	openedKeys: string[];
}

export class BaseTabsProvider extends React.Component<{ activeKey?: any; onItemClick?: (item: any) => void }, S> {
	state = {
		items: [],
		prevActiveKey: undefined,
		activeKey: this.props.activeKey,
		openedKeys: [],
	};
	addItem = (item: IBaseTab) => {
		const isItemExist = this.state.items.find((t: IBaseTab) => item.key === t.key);

		if (!isItemExist) {
			this.setState((prevState: { items: any[] }, props) => {
				return {
					items: prevState.items.concat(item),
				};
			});
		}
	};

	removeItem = (key: string) => {
		this.setState((prevState: { items: any[] }, props) => {
			return {
				items: prevState.items.filter((item) => item.key !== key),
			};
		});
	};

	onClick = (item: any) => (event: any) => {
		this.props.onItemClick && this.props.onItemClick(item);
		this.setState((prev: { openedKeys: any[] }) => {
			return { ...this.state, activeKey: item.key, openedKeys: _.uniq(prev.openedKeys.concat(item.key)) };
		});
	};

	render() {
		const { addItem, removeItem, onClick } = this;
		return (
			<BaseTabsContext.Provider
				value={{
					context: {
						...this.state,
						addItem,
						removeItem,
						onClick,
					},
				}}
			>
				{this.props.children}
			</BaseTabsContext.Provider>
		);
	}
}

export const BaseTabsConsumer = BaseTabsContext.Consumer;

