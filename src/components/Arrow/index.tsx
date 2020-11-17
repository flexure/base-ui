import styled from "@emotion/styled";
type To = "top" | "right" | "bottom" | "left";

export const Arrow = styled.div<{ to: To }>`
	width: 0;
	height: 0;
	${(props) => {
		switch (props.to) {
			case "top":
				return {
					borderRight: "7px solid transparent",
					borderBottom: "7px solid #666",
					borderLeft: "7px solid transparent",
				};
			case "right":
				return {
					borderTop: "7px solid transparent",
					borderBottom: "7px solid transparent",
					borderLeft: "7px solid #666",
				};
			case "bottom":
				return {
					borderTop: "7px solid #666",
					borderRight: "7px solid transparent",
					borderLeft: "7px solid transparent",
				};
			default:
				//left
				return {
					borderTop: "7px solid transparent",
					borderRight: "7px solid #666",
					borderBottom: "7px solid transparent",
				};
		}
	}}
`;
