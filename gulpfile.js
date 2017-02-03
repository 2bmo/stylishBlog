var gulp = require('gulp'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    svgSprite = require('gulp-svg-sprite'),
    spritesmith = require('gulp.spritesmith'),	
    runSequence = require('run-sequence'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

gulp.task('default', function (callback) {
    runSequence(['copy-fonts','png-sprite','svg-sprite','copy-images','sass','watch'],
        callback
    )
});
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('dev/scss/*.scss', ['sass']);
    gulp.watch('dev/html/*.html', ['useref']);
});
gulp.task('sass', function() {
    return gulp.src('dev/scss/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('res/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('useref', function(){
    return gulp.src('dev/html/*.html')
        .pipe(useref())
        .pipe(gulp.dest('res'))
        .pipe(browserSync.reload({
            stream: true
        }))

});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'res'
        }
    })
});
gulp.task('svg-sprite', function() {
    config = {
        shape: {
            dimension: {
                maxWidth: 120,
                maxHeight: 120
            },
            spacing: {
                padding: 8
            },
            dest: 'intermediate'
        },
        mode: {
            view: {
                bust: false,
                render: {
                    scss: true
                }
            }
        }
    };
    gulp.src('**/*.svg', {cwd: 'dev/img/svg'})
        .pipe(svgSprite(config))
        .pipe(gulp.dest('res/img'));
});
gulp.task('png-sprite', function () {
  var spriteData = gulp.src('dev/img/png/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('res/img'));
});
gulp.task('css-min', function () {
    gulp.src('res/css/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('res/css'));
});
gulp.task('pref', function () {
    return gulp.src('res/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['ie >= 9, last 3 versions, > 2%'],
            cascade: false
        }))
        .pipe(gulp.dest('res/css'));
});
gulp.task('post', function (callback) {
    runSequence(['pref', 'css-min'],
        callback
    )
});
gulp.task('copy-fonts', function () {
    gulp.src('dev/font/**/*.{ttf,woff,woof2,otf,eot,svg}')
        .pipe(gulp.dest('res/font'));
});
gulp.task('copy-images', function () {
    gulp.src('dev/img/*.{png,svg,jpg}')
        .pipe(gulp.dest('res/img'));
});
