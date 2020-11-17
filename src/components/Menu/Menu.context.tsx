import React from "react";
import { IStyleBaseMenu } from ".";

interface IMenuContext {
	activeKey: any;
	itemClick: any;
	_style?: IStyleBaseMenu;
}
const BaseMenuContext = React.createContext<Partial<IMenuContext>>({});

export const BaseMenuProvider = BaseMenuContext.Provider;
export const BaseMenuConsumer = BaseMenuContext.Consumer;

export default BaseMenuContext;
