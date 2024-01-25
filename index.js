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
import { group, more, arrowUp, arrowDown, trash, button } from '@wordpress/icons';

import React, { useState } from "react";

/**
 * 
 * Estilização CSS dentro do Bloco
 * 
 */
import './style.scss';

const iconLeiaMais = <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"></path></svg>;

let botaoLeiaMais = 0;

registerBlockType('create-block/leiamais', {
	"apiVersion": 2,
	"title": "Leia Mais",
	"category": "text",
	"icon": iconLeiaMais,
	"description": "Informações do Bloco Leia Mais",
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
		botaoLeiaMais++;

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

		// Função pra evitar a edição do texto: Leia mais
		const handleChange = (event) => {
			event.preventDefault();
			let leiaMais = document.getElementById(event.target.id);

			if (leiaMais) {
				leiaMais.innerHTML = 'Leia mais';
			}
		}

		// Função para desativar o evento de teclado ao clicar no Botão de Leia mais
		function selecionaTextoDesativaTeclado(event) {
			setTimeout(() => {
				let btn = document.getElementById("leiamais" + botaoLeiaMais);

				// Verifica se não é null antes de adicionar o ouvinte(addEventListener)
				btn && btn.addEventListener('keydown', event => {
					// console.log(`User pressed: ${event.key}`);
					event.preventDefault();
					return false;
				});

				// Seleciona todo o elemento button para selecionar o texto Leia mais e inserir o link
				btn && btn.addEventListener("click", (e) => {
					const selection = window.getSelection();
					selection.removeAllRanges();

					const range = document.createRange();
					range.selectNodeContents(btn);
					selection.addRange(range);
					// range.on.focusable();
				});
			}, 500);
		}


		return (
			<div {...useBlockProps()}>
				<RichText
					id={"leiamais" + botaoLeiaMais}
					tagName="button"
					value={attributes.buttonText} /*Pega do attributes o Valor(Leia Mais) */
					// onChange={(buttonText) => setAttributes({ buttonText })}
					onChange={(buttonText) => (setAttributes({ buttonText }), handleChange(event))}
					allowedFormats={['core/link']}
					placeholder={__('Leia mais', 'editor-blocks')}
					onClick={selecionaTextoDesativaTeclado(event)}
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
