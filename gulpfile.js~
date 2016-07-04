var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'), //use csso or clean-css?
    filter = require('gulp-filter'),
    ngAnnotate = require('gulp-ng-annotate'),
//    rev = require('gulp-rev'),
//    revReplace = require('gulp-rev-replace'),
    debug = require('gulp-debug'),
    htmlmin = require('gulp-htmlmin'),
    del = require("del"),
    lazypipe = require('lazypipe');

// cache-busting is defunct - anybody knows why?

gulp.task('default', function() {
    var notIndexFilter = filter(['*', '!index.html'], { restore: true });
    return gulp.src('*.html')
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        //.pipe(notIndexFilter)
        //.pipe(rev())
        //.pipe(notIndexFilter.restore)
        //.pipe(revReplace())
        .pipe(gulpif('*.html', htmlmin({removeComments: true, collapseWhitespace: true})))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'))
        .pipe(debug({title: 'optimizing:'}));
});

gulp.task('clean', function(cb) {
  del("dist/**/*",cb);
});
