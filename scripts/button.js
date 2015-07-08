/* global Perch */

var CustomTinyMCE = CustomTinyMCE || {};

(function($, window, document, undefined) {

	'use strict';

	/**
	 * button
	 *
	 * Sets the button options.
	 */
	CustomTinyMCE.button = function(){

		//form
		this.form = '#custom_tinymce_custom_button';

		//fields - id strings are used later, therefore id string is set rather than the jquery selector
		this.fields = {
			url: '#custom_tinymce_custom_button_url',
			text: '#custom_tinymce_custom_button_text',
			title: '#custom_tinymce_custom_button_title',
			target: '#custom_tinymce_custom_button_target',
			style: '#custom_tinymce_custom_button_style'
		};

		//The style select options as they will be output into the textarea.
		//used to match the class of a pre-selected custombutton
		this.styleValues = [
			'btn btn--primary',
			'btn btn--secondary',
			'btn btn--tertiary'
		];

		//these are the option values the form excepts
		this.styleSelectOptions = [
			'primary',
			'secondary',
			'tertiary'
		];
	};


	CustomTinyMCE.button.prototype.preparePresetFormValues = function(selection){

		//set content
		var content = selection.getContent();

		//return if no content
		if(content === 'undefined' || content === ''){ return; }

		//set node and create jquery selector
		var node = $(selection.getNode());

		//get the style id based on input value matching our arrays
		var styleId = this.styleValues.indexOf(node.attr('class'));

		//check if styleId is within the styleSelectOptions key range, else set default - 0
		styleId = (styleId < this.styleSelectOptions.length && styleId >= 0)? styleId : 0; //can't be minus

		//set field vars
		var url = node.attr('href');
		var text = node.text();
		var title = node.attr('title');
		var target = (node.attr('target') === undefined)? '_self' : node.attr('target'); //select - must match value
		var style = this.styleSelectOptions[styleId]; //select - must match value

		//set field values to those above
		$(this.fields.url).val(url);
		$(this.fields.text).val(text);
		$(this.fields.title).val(title);
		$(this.fields.target).val(target);
		$(this.fields.style).val(style);
	};


	CustomTinyMCE.button.prototype.init = function(tinyMCETextarea){

		//set vars for later use
		var self = this;
		var textareaID = tinyMCETextarea.id;
		var textarea = $('#'+textareaID);
		var buttonSelector;
		var url, text, title, target, style, html;

		//remove form - we're about to get a new one!
		$(this.form).remove();

		//stop the query from caching
		var query = { rand: Math.random() };

		//get the image upload form
		$.get('/perch/addons/plugins/editors/custom_tinymce/templates/button.html', query, function(data){

			//append the form to the body
			$('body').append(data);

			//pre-populate form with values if they exist
			self.preparePresetFormValues(tinyMCETextarea.selection);

			//detect the type of upload
			buttonSelector = '#custombutton';

			//position form relative to button
			$(self.form).css({
				'top': textarea.prev('.mce-tinymce').find(buttonSelector).offset().top+55,
				'left': textarea.prev('.mce-tinymce').find(buttonSelector).offset().left-270
			});

			//deal with cancel button on click
			$(self.form).find('a.cancel').text(Perch.Lang.get('Cancel')).click(function(e){
				e.preventDefault();
				$(self.form).fadeOut(function(){
					$(self.form).remove();
				});
			});
			
			//show form
			$(self.form).fadeIn(function(){
				$('#custom_tinymce_image_upload_image').focus();
			});

			//intterupt submit of form
			$(self.form).on('submit', function(e){
				e.preventDefault();

				//remove fail class from form, we've got a result
				$(self.form).removeClass('fail');

				//set the vars to build the html output
				url = $(self.form).find('#custom_tinymce_custom_button_url').val();
				text = $(self.form).find('#custom_tinymce_custom_button_text').val();
				title = $(self.form).find('#custom_tinymce_custom_button_text').val();
				target = $(self.form).find('#custom_tinymce_custom_button_target').val();
				style = $(self.form).find('#custom_tinymce_custom_button_style').val();

				//set the html output based on the user input
				html = '<a href="'+url+'" title="'+title+'" target="'+target+'" class="btn btn--'+style+'">'+text+'</a>';

				//remove form
				$(self.form).fadeOut(function(){
					$(self.form).remove();
				});

				//insert content to TinyMCE
				tinyMCETextarea.insertContent(html);
			});
			
		});	

		return true;
	};

})(jQuery, window, document);
