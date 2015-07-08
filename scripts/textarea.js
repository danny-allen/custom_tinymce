/* global Perch */

var CustomTinyMCE = CustomTinyMCE || {};

(function($, window, document, undefined) {

	'use strict';

	/**
	 * textarea
	 *
	 * Sets the textarea options.
	 */
	CustomTinyMCE.textarea = function(userOptions){

		this.options = {
			script_url : '/perch/addons/plugins/editors/custom_tinymce/tinymce/tinymce.min.js',
			content_css : '/perch/addons/plugins/editors/custom_tinymce/styles/custom_tinymce_textarea.css',
			plugins: [
				'autolink link image lists hr anchor code media',
			],
			menu : {
				//remove menu
			},
			toolbar: 'styleselect | bold italic | hr blockquote link  image | custombutton perchimage | code',
			convert_urls: false,
			relative_urls: false,
			style_formats: [
				{title: 'Headers', items: [
					{title: 'Header 1', format: 'h1'},
					{title: 'Header 2', format: 'h2'},
					{title: 'Header 3', format: 'h3'},
					{title: 'Header 4', format: 'h4'},
					{title: 'Header 5', format: 'h5'},
					{title: 'Header 6', format: 'h6'}
				]},
				{title: 'Inline', items: [
					{title: 'Bold', icon: 'bold', format: 'bold'},
					{title: 'Italic', icon: 'italic', format: 'italic'},
					{title: 'Underline', icon: 'underline', format: 'underline'},
					{title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
					{title: 'Superscript', icon: 'superscript', format: 'superscript'},
					{title: 'Subscript', icon: 'subscript', format: 'subscript'},
				]},
				{title: 'Blocks', items: [
					{title: 'Blockquote', format: 'blockquote'},
				]},
				{title: 'Alignment', items: [
					{title: 'Left', icon: 'alignleft', format: 'alignleft'},
					{title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
					{title: 'Right', icon: 'alignright', format: 'alignright'},
					{title: 'Justify', icon: 'alignjustify', format: 'alignjustify'}
				]}
			]
		};

		// Merge user_options into this.options
		$.extend(this.options, userOptions);
	};

	/**
	 * init description
	 *
	 * Load tinyMCE
	 * @return {[type]} [description]
	 */
	CustomTinyMCE.textarea.prototype.init = function(){

		//reference to this
		var self = this;

		$('textarea.custom_tinymce:not([data-init])')
			.wrap('<div class="editor-wrap"></div>')
			.tinymce(self.options)
			.attr('data-init', true);
	};
})(jQuery, window, document);