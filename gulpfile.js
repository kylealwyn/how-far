const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('sass', () => {
  return gulp.src('readingtime.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('js', () => {
  return gulp.src('readingtime.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('readingtime.compiled.js'))
    .pipe(gulp.dest('.'))
})

gulp.task('default', ['js', 'sass']);
gulp.task('serve', () => {
  gulp.watch('readingtime.js', ['js']);
  gulp.watch('readingtime.scss', ['sass']);
})