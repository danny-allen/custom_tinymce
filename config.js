	// function to set up uninitialised textareas
	var set_up_myeditor = function(){
		$('textarea.custom_tinymce:not([data-init])').wrap('<div class="editor-wrap"></div>').tinymce({
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
			toolbar: "styleselect | bold italic | link image | perchimage",
			convert_urls: false,
			relative_urls: false,
			setup: function(editor) {
				editor.addButton('perchimage', {
					text: 'Perch Image',
					icon: false,
					id: 'perchimage',
					onclick: function() {
						tinyImageUpload.upload(editor);
					}
				});
			},
		}).attr('data-init', true);

	};

	// run the function
	set_up_myeditor();

	// listen for when the function needs to be run again
	$(window).on('Perch_Init_Editors', function(){
	  set_up_myeditor();
	}); 