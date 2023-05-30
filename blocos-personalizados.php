<?php

/**
 * Plugin Name:       Blocos Personalizados teste Leia Mais
 * Description:       Plugin que permite selecionar somente os blocos  do Gutenberg que deseja que sejam utilizados
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Text Domain:       blocos-personalizados
 *
 * @package           create-block
 */

// Função que registra os blocos criados e que precisa inserir aqui para que sejam visualizados no WP
function init_function_blocos_personalizados()
{
    register_block_type(__DIR__ . '/build/leiamais-cd');
    
}
add_action('init', 'init_function_blocos_personalizados');


// Função que permite somente a visualização dos blocos personalizados no WP
function function_visible_blocks_gutenberg_wordpress()
{
    // cria a lista dos blocos permitidos
    $new_allowed_blocks = [
        'create-block/leiamais-cd',
    ];

    return $new_allowed_blocks;
}
add_filter('allowed_block_types', 'function_visible_blocks_gutenberg_wordpress');

// Função para remover as variações de blocos Embed na pesquisa do editor
function function_deny_blocks_embed()
{
    wp_enqueue_script(
        'deny-blocks-scripts',
        plugins_url('js/remove_blocks_embed.js', __FILE__),
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        filemtime(plugin_dir_path(__FILE__) . 'js/remove_blocks_embed.js')
    );
}
add_action('enqueue_block_editor_assets', 'function_deny_blocks_embed');






