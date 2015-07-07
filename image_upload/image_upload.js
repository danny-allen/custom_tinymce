/* global Perch */

var customTinyMCE = function(){
	'use strict';

	var upload =  function(tinyTextarea, fileUpload) {

		var textareaID = tinyTextarea.id;
		var textarea = $('#'+textareaID);
		var buttonSelector;

		console.log('here');
		var output = '';
		$('#custom_tinymce_image_upload').remove();

		var query = { rand: Math.random() };
		$.get('/perch/addons/plugins/editors/custom_tinymce/image_upload/image_upload.html', query, function(data){
			console.log(data);
			$('body').append(data);
			var form = $('#custom_tinymce_image_upload');

			console.log(form);

			if (fileUpload) {
				buttonSelector = '.file-upload';
			}else{
				buttonSelector = '#perchimage';
			}

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
			
			form.find('img.spinner').attr('src', '/perch/addons/plugins/editors/custom_tinymce/image_upload/loader.gif');
			
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

			console.log(form);
			
			
			form.fadeIn(function(){
				$('#custom_tinymce_image_upload_image').focus();
			});
			
			form.attr('action', '/perch/addons/plugins/editors/custom_tinymce/image_upload/image_upload.php');
			


			
			form.ajaxForm({
				beforeSubmit: function(){
					form.find('img.spinner').show();
				},
				success: function(r) { 

					form.find('img.spinner').hide();
					if (r!=='FAIL') {
						form.removeClass('fail');
						var alt = form.find('#custom_tinymce_image_upload_title').val();
						var classname = form.find('#custom_tinymce_image_upload_class').val();
						
						if (fileUpload) {
							
							var sText = r;
							if (alt){
								sText = alt;
							}
							output = '<a href="'+r+'">'+sText+'</a>';
						}else{
							var sAlt = 'alt=""';
							var sClass = '';
							if (alt){
								sAlt = ' alt="'+alt+'"';
							}
							if (classname){
								sClass = ' class="'+classname+'"';
							}
							output = '<img src="'+r+'"'+sAlt+sClass+' />';
						}

						console.log(output);

						form.fadeOut(function(){
							form.remove();
						});

						tinyTextarea.insertContent(output);
						return;

					}else{
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


	return {
		upload: upload
	};

}();
