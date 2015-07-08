/* global Perch */

var CustomTinyMCE = CustomTinyMCE || {};

(function($, window, document, undefined) {

	'use strict';

	/**
	 * textarea
	 *
	 * Sets the textarea options.
	 */
	CustomTinyMCE.upload = function(){

	};


	CustomTinyMCE.upload.prototype.init = function(tinyMCETextarea, fileUpload){

		//set vars
		var textareaID = tinyMCETextarea.id;
		var textarea = $('#'+textareaID);
		var buttonSelector;
		var output = '';

		$('#custom_tinymce_image_upload').remove();

		//stop the query from caching
		var query = { rand: Math.random() };

		//get the image upload form
		$.get('/perch/addons/plugins/editors/custom_tinymce/image_upload/image_upload.html', query, function(data){

			//append the form to the body
			$('body').append(data);

			//set form as we know it
			var form = $('#custom_tinymce_image_upload');

			//detect the type of upload
			if (fileUpload) {
				buttonSelector = '.file-upload';
			}else{
				buttonSelector = '#perchimage';
			}

			//position form relative to button
			form.css({
				'top': textarea.prev('.mce-tinymce').find(buttonSelector).offset().top+55,
				'left': textarea.prev('.mce-tinymce').find(buttonSelector).offset().left-270
			});
			
			if (fileUpload) {
				form.find('label[for=custom_tinymce_image_upload_title]').text(Perch.Lang.get('File title'));
			}else{
				form.find('label[for=custom_tinymce_image_upload_title]').text(Perch.Lang.get('Image title'));
				form.find('label[for=custom_tinymce_image_upload_class]').text(Perch.Lang.get('Style'));
			}
			
			form.find('label[for=custom_tinymce_image_upload_image]').text(Perch.Lang.get('File to upload'));
			form.find('input[type=submit]').attr('value', Perch.Lang.get('Upload'));
			form.find('span.or').text(Perch.Lang.get('or'));
			form.find('a.cancel').text(Perch.Lang.get('Cancel')).click(function(e){
				e.preventDefault();
				form.fadeOut(function(){
					form.remove();
				});
			});
			
			//set spinner
			form.find('img.spinner').attr('src', '/perch/addons/plugins/editors/custom_tinymce/images/loader.gif');
			
			// class options
			if (!fileUpload) {
				var classString = textarea.attr('data-classes');
				if (classString) {
					var arclasses = classString.split(',');
					var i, l, label, value, arval;
					var selectbox = $('#custom_tinymce_image_upload_class');
					for(i=0, l=arclasses.length; i<l; i++) {
						if (arclasses[i].indexOf('|')!==-1) {
							arval = arclasses[i].split('|');
							label = $.trim(arval[0]);
							value = $.trim(arval[1]);
						}else{
							label = $.trim(arclasses[i]);
							value = $.trim(label);
						}
						selectbox.append('<option value="'+value+'">'+label+'</option>');
					}
				}else{
					$('#custom_tinymce_image_upload_classes').remove();
				}
			}else{
				$('#custom_tinymce_image_upload_classes').remove();
			}
			
			//show form
			form.fadeIn(function(){
				$('#custom_tinymce_image_upload_image').focus();
			});
			
			//set form action to the image upload script
			form.attr('action', '/perch/addons/plugins/editors/custom_tinymce/image_upload/image_upload.php');

			//ajax form
			form.ajaxForm({
				beforeSubmit: function(){
					form.find('img.spinner').show();
				},
				success: function(result) { 

					form.find('img.spinner').hide();
					if (result!=='FAIL') {
						//remove fail class from form, we've got a result
						form.removeClass('fail');
						var alt = form.find('#custom_tinymce_image_upload_title').val();
						var classname = form.find('#custom_tinymce_image_upload_class').val();
						
						//build HTML
						if (fileUpload) {
							
							var sText = result;
							if (alt){
								sText = alt;
							}
							output = '<a href="'+result+'">'+sText+'</a>';
						}else{
							var sAlt = 'alt=""';
							var sClass = '';
							if (alt){
								sAlt = ' alt="'+alt+'"';
							}
							if (classname){
								sClass = ' class="'+classname+'"';
							}
							output = '<img src="'+result+'"'+sAlt+sClass+' />';
						}

						//remove form
						form.fadeOut(function(){
							form.remove();
						});

						//insert content to TinyMCE
						tinyMCETextarea.insertContent(output);
						return;

					}else{
						//set fail class to the form.
						form.addClass('fail');
					}
				},
				data: {
					upload: true,
					image: !fileUpload,
					width: textarea.attr('data-width'),
					height: textarea.attr('data-height'),
					crop: textarea.attr('data-crop'),
					density: textarea.attr('data-density'),
					quality: textarea.attr('data-quality'),
					sharpen: textarea.attr('data-sharpen'),
					bucket: textarea.attr('data-bucket')
				}
			});
			
		});	

		return true;
	};

})(jQuery, window, document);
