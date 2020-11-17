/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { IDecorate, fnDecorator } from "../utils/fnDecorator";

export interface IStyleFieldset {
	_fieldset: any;
	_text: any;
}

interface Props {
	text?: string;
	_style?: IStyleFieldset;
}

export const BaseFieldset: React.FC<Props> & IDecorate<IStyleFieldset> = (props) => {
	return (
		<fieldset css={props._style?._fieldset}>
			<legend css={props._style?._text}>{props.text}</legend>
			{props.children}
		</fieldset>
	);
};

BaseFieldset.decorate = fnDecorator<typeof BaseFieldset, IStyleFieldset>(BaseFieldset);
