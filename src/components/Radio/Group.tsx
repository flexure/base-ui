import React from "react";
import _ from "lodash";

export const RadioContext = React.createContext<Partial<any>>({});

interface P {
	value?: any;
	name: any;
	onChange?:(selected: any) => void;
}
interface S {
	selected: any;
}
export class BaseRadioGroup extends React.Component<P, S> {
	state = {
		selected: this.props.value,
	};

	createContextValue = _.memoize((value, name, onChange) => ({
		value,
		name,
		onChange,
	}));
	onChange = (selected: any) => (event: any) => {
		this.setState({ selected });
		this.props.onChange && this.props.onChange(selected);
	};

	render() {
		return (
			<RadioContext.Provider
				value={this.createContextValue(this.state.selected, this.props.name, this.onChange.bind(this))}
			>
				{this.props.children}
			</RadioContext.Provider>
		);
	}
}
