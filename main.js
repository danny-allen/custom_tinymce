var CustomTinyMCE = CustomTinyMCE || {};

(function($, window, document, undefined) {

    'use strict';

    //instantiate the upload plugin for TinyMCE
	var upload = new CustomTinyMCE.upload();

	//these are the same options that TinyMCE expects - we're just overwriting the defaults set in our module
    var customOptions = {
		setup: function(editor) {

			//add perch image button
			editor.addButton('perchimage', {
				text: 'Perch Image',
				icon: false,
				id: 'perchimage',
				onclick: function() {
					upload.init(editor);
				}
			});
		},
    };

    //instantiate the textarea passing it our options
	var textarea = new CustomTinyMCE.textarea(customOptions);

	//initialise the textarea
	textarea.init();

	//listen for when initialise needs to run again
	$(window).on('Perch_Init_Editors', function(){
		textarea.init();
	});

})(jQuery, window, document);
