import React, { ReactNode } from "react"
import PropTypes from "prop-types"
import { BasePageContext } from "./context"

export interface DocSectionInputs {
	key: string
	displayName: ReactNode
}

export class DocSection extends React.PureComponent {
	[x: string]: any
	static propTypes: {
		displayName: React.Validator<ReactNode>
	}

	props!: DocSectionInputs & { children: React.ReactNode }

	componentDidMount() {
		this.context.context.addItem({
			key: this._reactInternalFiber.key,
			displayName: this.props.displayName,
		})
	}

	static Section: React.FC<any> = ({ dark, title, id, children }) => {
		return (
			<div className={"section" + (dark ? " section-dark" : "")}>
				<div className="section-content" id={id}>
					<h1>{title}</h1>
					{children}
				</div>
			</div>
		)
	}

	render() {
		const key = this._reactInternalFiber.key
		const { children } = this.props

		//Section Key
		return (
			<DocSection.Section title={this.props.displayName} dark={true} id={key}>
				{children}
			</DocSection.Section>
		)
	}
}
DocSection.contextType = BasePageContext
DocSection.propTypes = {
	displayName: PropTypes.node.isRequired,
}
