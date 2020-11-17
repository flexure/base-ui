/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { RadioContext, BaseRadioGroup } from "./Group";
import { fnDecorator } from "../utils/fnDecorator";

export interface IStyleBaseRadio {
	_container?(theme: any, args: { active: boolean }): any;
	_input?(theme: any, args: { active: boolean }): any;
	_label?(theme: any, args: { active: boolean }): any;
}

interface Props {
	value?: any;
	_style?: IStyleBaseRadio;
}

export class BaseRadio extends React.Component<Props> {
	static Group = BaseRadioGroup;
	static decorate = fnDecorator<typeof BaseRadio, IStyleBaseRadio>(BaseRadio);
	static Button: typeof BaseRadio;

	_id = Math.random().toString().replace(/0\./, "");
	render() {
		return (
			<RadioContext.Consumer>
				{(radioGroup) => {
					const active = radioGroup.value === this.props.value;
					return (
						<div
							css={(theme) =>
								this.props._style?._container &&
								this.props._style?._container(theme, {
									active,
								})
							}
						>
							<input
								id={this._id}
								css={(theme) =>
									this.props._style?._input &&
									this.props._style?._input(theme, {
										active,
									})
								}
								type="radio"
								name={radioGroup.name}
								defaultChecked={active}
								onChange={radioGroup.onChange && radioGroup.onChange(this.props.value)}
							/>
							<label
								css={(theme) =>
									this.props._style?._label &&
									this.props._style?._label(theme, {
										active,
									})
								}
								htmlFor={this._id}
							>
								{this.props.children}
							</label>
						</div>
					);
				}}
			</RadioContext.Consumer>
		);
	}
}
