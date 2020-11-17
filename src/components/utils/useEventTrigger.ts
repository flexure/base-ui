import React from "react";
/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useEventTrigger<K extends keyof DocumentEventMap>(trigger: K, fn: any): React.RefObject<any> {
	const ref = React.useRef<Partial<any>>(null);
	React.useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */

		function _handleClickOutside(e: any) {
			if (ref.current && ref.current.contains(e.target)) {
				if (typeof fn === "function") {
					fn();
				}
			}
		}

		// Bind the event listener

		document.addEventListener(trigger, _handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener(trigger, _handleClickOutside);
		};
	}, [ref, fn, trigger]);
	return ref;
}
