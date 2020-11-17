/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { useHandleClickOutside } from "./handleClickOutside"
import { useEventTrigger } from "./useEventTrigger"
import { memoize } from "lodash"

export interface IStyleBaseDropdown {
	_parent?: any
	_overlay?: any
}

interface IOverlay {
	_style?: IStyleBaseDropdown
}

interface IChildren<T extends IOverlay> {
	Overlay: React.ComponentType<T>
	close: () => void
}

interface DC {
	ref?: any
}

function hocDropdown<T extends IOverlay>(
	Component: React.ComponentType<any>,
	state: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> },
) {
	const Dropdown: React.FC<T> = props => {
		// handle click outside
		const _ref = useHandleClickOutside(() => state.setVisible(false))

		// handle events for html element only
		const childRef = useEventTrigger("mousedown", () => state.setVisible(!state.visible))

		return (
			<div css={props._style?._parent}>
				<div ref={childRef}>
					<Component {...props} />
				</div>
				{state.visible && (
					<div ref={_ref} css={props._style?._overlay}>
						{props.children}
					</div>
				)}
			</div>
		)
	}
	return Dropdown
}

interface DropdownProps<T extends object> {
	children: (props: IChildren<T>) => any
}

export default function<P extends DropdownProps<IOverlay>>(Component: React.ComponentType<any>) {
	const Dropdown: React.FC<P> = props => {
		// For dropdown to show/hide
		const [visible, setVisible] = React.useState(false)
		// Caching
		const memo = memoize((visible, setVisible) => ({ visible, setVisible }))(visible, setVisible)

		const params = { Overlay: hocDropdown(Component, memo), close: () => memo.setVisible(false) }

		return props.children(params)
	}
	return Dropdown
}
