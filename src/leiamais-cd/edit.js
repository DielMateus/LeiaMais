/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
// import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarDropdownMenu, DropdownMenu, PanelBody } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import {
	InnerBlocks,
	useBlockProps,
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	__experimentalUseColors,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './index.js';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
// Aqui onde será renderizado no Front-end
export default function Edit({ attributes, setAttributes }) {
	return (
		<p {...useBlockProps()}>


			<RichText
				className='content'
				tagName='p'
				value={attributes.content}
				onChange={(newText) => {
					setAttributes({ content: newText })
				}}
			/>
		</p>
	);

}