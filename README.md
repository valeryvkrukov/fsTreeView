# fsTreeView
Plugin takes filesystem data in JSON format via AJAX request and build HTML tree with folders and files 

# Usage
### Installation
Simply insert `<script src="path/to/fs.treeview.jquery.js"></script>` into header or bottom scripts in layout after jQuery.

### Initialization
#### HTML:
> `<div class="fs-tree-view-container"></div>`

#### JS:
```
jQuery(document).ready(function($){
	$('.fs-tree-view-container').fsTreeView({
		apiUrl:'url/to/data.php', //required 
		apiKey:'someApiKeyIfNeeded', //optional
		fileCallback:function(el){ // optional
			console.log($(el).html());
		},
		folderClosedIcon:'<i class="glyphicon glyphicon-folder-close"></i>', // optional any HTML or blank string to remove
		folderOpenIcon:'<i class="glyphicon glyphicon-folder-open"></i>', // optional any HTML or blank string to remove
		fileIcon:'<i class="glyphicon glyphicon-open-file"></i>' // optional any HTML or blank string to remove
	});
});
```
#### Example of JSON data
```
[{
	name:'folder1',
	type:'folder',
	path:'/opt/folder1',
	items:[{
		name:'folder2',
		type:'folder',
		path:'/opt/folder1/folder2',
		items:[{
			name:'file5.txt',
			type:'file',
			path:'/opt/folder1/folder2/file5.txt',
			size:'3456'
		}]
	},{
		name:'file3.txt',
		type:'file',
		path:'/opt/folder1/file3.txt',
		size:'3456'
	},{
		name:'file4.txt',
		type:'file',
		path:'/opt/folder1/file4.txt',
		size:'4567'
	}]
},{
	name:'file1.txt',
	type:'file',
	path:'/opt/file1.txt',
	size:'12345'
},{
	name:'file2.txt',
	type:'file',
	path:'/opt/file2.txt',
	size:'23456'
}];
```