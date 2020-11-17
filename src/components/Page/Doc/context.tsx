import React from "react";

export interface IBaseSection {
	key: string;
	displayName: string | React.ReactNode;
	icon?: any;
}

interface IContext {
	context: {
		items: IBaseSection[];
		addItem: (item: IBaseSection | any) => void;
		removeItem: (item: IBaseSection | any) => void;
	};
}

export const BasePageContext = React.createContext<IContext>({
	context: {
		items: [],
		addItem: (item: any) => {},
		removeItem: (item: any) => {},
	},
});

type P = {};

type S = {
	items: any[];
};

export class BasePageProvider extends React.Component<P, S> {
	state = {
		items: [],
	};

	addItem = (item: IBaseSection) => {
		const isItemExist = this.state.items.find((t: IBaseSection) => item.key === t.key);

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

	render() {
		const { addItem, removeItem } = this;
		return (
			<BasePageContext.Provider
				value={{
					context: {
						...this.state,
						addItem,
						removeItem,
					},
				}}
			>
				{this.props.children}
			</BasePageContext.Provider>
		);
	}
}

export const BasePageConsumer = BasePageContext.Consumer;
