# Uploader
Node.js + Ajax 实现的带进度反馈的上传功能

![image](https://github.com/hwaphon/Uploader/blob/master/demo.gif)

你可以利用以下命令将项目复制到本地并且运行查看效果

	git clone https://github.com/hwaphon/Uploader.git
	cd Uploader
	node app.js

实现上传进度更新的核心代码如下:

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
		
这里使用了 `xhr.upload`，作用是返回一个 `XMLHttpRequestUpload` 对象，然后我们就可以监听进度事件，利用 `loaded` 和 `total` 分别获取已上传的大小和总文件大小，取二者的比值即可更新进度条。

参考资料：

[FormData 资料](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

[XMLHttpRequest 资料](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[formidable 官方介绍](https://www.npmjs.com/package/formidable)
