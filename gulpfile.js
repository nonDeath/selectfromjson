var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglyfly = require('gulp-uglyfly');

// Scripts
gulp.task('scripts', function () {
    return gulp.src([
            './src/jquery.jsonselect.js',
        ])
        .pipe(uglyfly())
        .pipe(concat('jquery.jsonselect.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['scripts']);