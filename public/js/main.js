window.onload = function() {
	var progressBar = document.getElementById('progressbar'),
		progressText = document.getElementById('progress-text'),
		uploadFile = document.getElementById('upload-file'),
		uploadButton = document.getElementById('upload');

	uploadButton.addEventListener('click', function() {
		uploadFile.click();
	}, false);

	uploadFile.addEventListener( 'change', function(event) {
		var files = uploadFile.files;

		if (files.length > 0) {
			var formData = new FormData();

			for(var i = 0; i < files.length; i++) {
				var file = files[i];
				formData.append('uploads[]', file, file.name);
			}
		}

		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}

		xhr.upload.onprogress = function(event) {
			if (event.lengthComputable) {
				var result = Math.round(event.loaded / event.total * 100);

				if (result >= 100) {
					progressText.innerHTML = "Completed!";
				} else {			
					progressText.innerHTML = result + '%';
				}

				progressBar.style.width = result + '%';
			}
		};

		xhr.open('POST', '/upload', true);
		xhr.send(formData);

	}, false );
}