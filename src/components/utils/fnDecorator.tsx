import React from "react";
import _ from "lodash";
import { ITheme } from "../../styled/Theme";

export interface IDecorate<T> {
	decorate: (style: T) => any;
}

const _mergeStyle = (arr: Array<any>, theme?: ITheme, args?: { [key: string]: any }) => {
	return arr.map((value) => {
		return typeof value === "function" ? value(theme, { ...args }) : value;
	});
};

export const StyleDecorator = <U, P extends { _style?: any }>(
	Component: React.ComponentType<P>,
	baseStyle: any,
	exclude?: Array<any>
): U => {
	const excludedStyle = _.pick(baseStyle, exclude);

	const mergeStyle: any = (props) => {
		const _style = _.mapValues(_.omit(baseStyle, exclude), (value, key) => {
			return (theme: ITheme, ...rest: any) =>
				_mergeStyle([value, _.get(props?._style, key)], theme, { ...props, ...rest });
		});

		const _returnExcludedStyle = _.assign(_style, excludedStyle);

		return <Component {...props} _style={_returnExcludedStyle} />;
	};
	mergeStyle.displayName = Component.displayName!;
	mergeStyle.defaultProps = Component.defaultProps;
	return mergeStyle;
};

export const fnDecorator = <U, T extends object>(Component: React.ComponentType<any>) => {
	return function (style: T, exclude?: Array<any>): U {
		return StyleDecorator(Component, style, exclude) as U;
	};
};
