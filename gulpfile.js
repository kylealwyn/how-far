const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('sass', () => {
  return gulp.src('howfar.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('js', () => {
  return gulp.src('howfar.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('howfar.compiled.js'))
    .pipe(gulp.dest('.'))
})

gulp.task('default', ['js', 'sass']);
gulp.task('serve', () => {
  gulp.watch('howfar.js', ['js']);
  gulp.watch('howfar.scss', ['sass']);
})