/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { IDecorate, fnDecorator } from "../utils/fnDecorator";

export interface IStyleTextInput {
	_input?: any;
}

interface IProps {
	disabled?: boolean;
	_style?: IStyleTextInput;
}

type TextProps = React.HTMLAttributes<HTMLInputElement> & IProps;

export const BaseTextInput: React.FC<TextProps> & IDecorate<IStyleTextInput> = (props) => {
	return <input css={props._style?._input} type="text" {...props} />;
};

BaseTextInput.decorate = fnDecorator<typeof BaseTextInput, IStyleTextInput>(BaseTextInput);
