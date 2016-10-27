const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('sass', () => {
  return gulp.src('src/howfar.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
  return gulp.src('src/howfar.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('howfar.compiled.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['js', 'sass']);
gulp.task('serve', () => {
  gulp.watch('src/howfar.js', ['js']);
  gulp.watch('src/howfar.scss', ['sass']);
})
