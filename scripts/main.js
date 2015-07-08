var CustomTinyMCE = CustomTinyMCE || {};

(function($, window, document, undefined) {

    'use strict';

    //instantiate the upload plugin for TinyMCE
	var upload = new CustomTinyMCE.upload();

    //instantiate the upload plugin for TinyMCE
	var button = new CustomTinyMCE.button();

	//these are the same options that TinyMCE expects - we're just overwriting the defaults set in our module
    var textareaOptions = {
		setup: function(editor) {

			//Perch Image - Button
			editor.addButton('perchimage', {
				text: 'Perch Image',
				icon: false,
				id: 'perchimage',
				onclick: function() {
					upload.init(editor);
				}
			});

			//Custom Button - ...Button
			editor.addButton('custombutton', {
				text: 'Custom Button',
				icon: false,
				id: 'custombutton',
				onclick: function() {
					button.init(editor);
				}
			});
		},
    };

    //instantiate the textarea passing it our options
	var textarea = new CustomTinyMCE.textarea(textareaOptions);

	//initialise the textarea
	textarea.init();

	//listen for when initialise needs to run again
	$(window).on('Perch_Init_Editors', function(){
		textarea.init();
	});

})(jQuery, window, document);
