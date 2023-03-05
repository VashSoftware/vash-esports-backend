import gulp from 'gulp';
import ts from 'gulp-typescript';
import nodemon from 'gulp-nodemon';

const tsProject = ts.createProject('tsconfig.json');

function compile() {
  const tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest('dist'));
}

function start() {
  nodemon({
    script: 'dist/app.js',
    watch: 'dist',
    delay: 5000
  });
}

function watch() {
  gulp.watch('src/**/*.ts', gulp.series(compile, start));
}

export default gulp.series(compile, gulp.parallel(start, watch));
