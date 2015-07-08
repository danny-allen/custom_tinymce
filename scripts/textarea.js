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
		
		//reference to this
		var self = this;

		this.options = {
			// Location of TinyMCE script
			script_url : '/perch/addons/plugins/editors/custom_tinymce/tinymce/tinymce.min.js', 
			plugins: [
				"advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
				"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
				"save table contextmenu directionality emoticons template paste textcolor"
			],
			menu : { // this is the complete default configuration
				file   : {},
				edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
				insert : {title : 'Insert', items : 'link media'},
				view   : {},
				format : {},
				table  : {},
				tools  : {title : 'Tools' , items : 'code'}
			},
			toolbar: "styleselect | bold italic | link image | perchimage | custombutton",
			convert_urls: false,
			relative_urls: false,
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