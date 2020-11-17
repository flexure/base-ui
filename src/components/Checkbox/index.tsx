/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import _ from "lodash";
import { fnDecorator } from "../utils/fnDecorator";

export interface IStyleCheckbox {
	_input?: any;
	_label?: any;
	_container?: any;
}

interface IProps {
	_style?: IStyleCheckbox;
	label?: string;
	onChanged?: (checked: boolean) => void;
}

type CheckboxProps = React.HTMLAttributes<HTMLInputElement> & IProps;

export class BaseCheckbox extends React.PureComponent<CheckboxProps> {
	static decorate = fnDecorator<typeof BaseCheckbox, IStyleCheckbox>(BaseCheckbox);

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		return this.props.onChanged && this.props.onChanged(e.target.checked);
	};
	render() {
		const { props } = this;
		const this_id = Math.random().toString().replace(/0\./, "");
		const sProps = _.omit(this.props, "onChanged");
		return (
			<div css={props._style?._container}>
				<input
					css={props._style?._input}
					onChange={this.handleChange}
					type="checkbox"
					id={this_id}
					{...sProps}
				/>
				<label css={props._style?._label} htmlFor={this_id}>
					{props.label}
					{props.children}
				</label>
			</div>
		);
	}
}
