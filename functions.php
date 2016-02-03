<?php
/**
 * Twenty Sixteen custom functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

$textdomain = "greenhorns";


if ( ! function_exists( 'greenhorns_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * Create your own twentysixteen_setup() function to override in a child theme.
 *
 * @since Twenty Sixteen 1.0
 */
function greenhorns_setup() {
    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on Twenty Sixteen, use a find and replace
     * to change 'twentysixteen' to the name of your theme in all the template files
     */
    load_theme_textdomain( $textdomain, get_template_directory() . '/languages' );

    add_action( 'wp_enqueue_scripts', 'greenhorns_enqueue_styles' );


    // This theme uses wp_nav_menu() in two locations.
    register_nav_menus( array(
        'external' => __( 'External Links Menu', $textdomain ),
    ) );

    $custom_header_defaults = array(
        'width'                  => 1200,
        'height'                 => 160,
        'flex-height'            => true,
        'flex-width'             => true,
        'header-text'            => false,
    );

    add_theme_support( 'custom-header', $custom_header_defaults );

}
endif; // greenhorns_setup

add_action( 'after_setup_theme', 'greenhorns_setup' );


/**
 * Enqueue parent and child styles
 */
function greenhorns_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style )
    );
}

