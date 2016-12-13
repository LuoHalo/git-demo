/**
*1.LESS编译 压缩 合并
*2.js合并 压缩 混淆
*3.img复制
*4.html压缩
*/

//在gulpfile中先载入gulp包，因为这个包提供了一些API
 
 //插件
 var gulp = require('gulp');
 //less
 var less =require('gulp-less');
 //压缩
 var cssnano=require('gulp-cssnano');

 //1.LESS编译 压缩 合并
 gulp.task('style',function(){
 	//这里是在执行style任务时自动执行的
 	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
 	.pipe(less())
 	.pipe(cssnano())
 	.pipe(gulp.dest('dist/styles'))
 	.pipe(browserSync.reload({stream:true}));
 });

 //合并
 var concat=require('gulp-concat');
  //压缩
 var uglify=require('gulp-uglify');
 
//2.js合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({stream:true}));
});


//3.图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));
});

var htmlmin=require('gulp-htmlmin');
//3.HTML
gulp.task('html',function(){
	gulp.src('src/*.html')
	//折叠空白字符
	.pipe(htmlmin({
		collapseWhitespace:true,
		//去掉html的注释
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});

var browserSync=require('browser-sync');
gulp.task('serve',function(){
	browserSync(
		{server:{
			baseDir:['dist/']
		}
		},
		function(err,bs){
		console.log(bs.options.getIn(["urls","local"]));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});





