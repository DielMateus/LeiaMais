/**
 * 
 * Importação de bibliotecas e Registro do Bloco
 * 
 */

import { registerBlockType } from '@wordpress/blocks';

import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	RichText,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';

import { __, _x } from '@wordpress/i18n';

import { registerPlugin } from '@wordpress/plugins';
import { select, dispatch } from '@wordpress/data';
import { ToolbarButton, ToolbarGroup, ToggleControl, PanelBody, Disabled } from '@wordpress/components';
import { group, more, arrowUp, arrowDown, trash } from '@wordpress/icons';

/**
 * 
 * Estilização CSS dentro do Bloco
 * 
 */
import './style.scss';

/**
 * 
 * Dependências internas de arquivos que devem ser importados
 * 
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const iconLeiaMais = <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"></path></svg>;


registerBlockType('create-block/leiamais-cd', {
	"apiVersion": 2,
	"title": "Leia Mais (CD)",
	"category": "text",
	"icon": iconLeiaMais,
	"description": "Informações do Bloco Leia Mais (CD)",
	"attributes": {
		buttonText: {
			type: 'string',
			default: __('Leia mais', 'editor-blocks'),
			source: 'html',
			selector: 'button',
			__experimentalRole: 'content'
		},
	},

	edit: function (props) {
		const { attributes, setAttributes } = props;

		const CloneButton = () => (<ToolbarButton
			icon={group}
			onClick={cloneSelectedBlocks}
			label={'Duplicar Bloco'}
		/>)

		const DeleteButton = () => (<ToolbarButton
			icon={trash}
			label={'Remover Bloco'}
			onClick={deleteSelectedBlocks}
		/>)

		const deleteSelectedBlocks = () => {
			const { removeBlocks } = dispatch('core/block-editor');
			const block_ids = select('core/block-editor').getSelectedBlockClientIds();
			removeBlocks(block_ids);
		};

		const cloneSelectedBlocks = () => {
			const block_ids = select('core/block-editor').getSelectedBlockClientIds();
			dispatch('core/block-editor').duplicateBlocks(block_ids)
		};
		 
		return (
			<div {...useBlockProps()}>
				<RichText
					tagName="button"
					value={attributes.buttonText} /*Pega do attributes o Valor(Leia Mais) */
					onChange={(buttonText) => setAttributes({ buttonText })}
					readonly
					allowedFormats={['core/link']}
					placeholder={__('Leia mais', 'editor-blocks')}
					keepPlaceholderOnFocus={true}
					disabled 
				/>
				<BlockControls>
					<ToolbarGroup>
						<div className={`customgutbuttons`}>
							<CloneButton />
							<DeleteButton />
						</div>
					</ToolbarGroup>
				</BlockControls>
			</div>
		);
	},

	save: function (props) {
		const blockProps = useBlockProps.save();
		const { attributes } = props;

		return (
			<div {...blockProps}>
				<RichText.Content
					tagName="button"
					value={attributes.buttonText}
				/>
			</div >

		);
	},
});
