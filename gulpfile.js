
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')
const autoprefixer = require('autoprefixer-stylus')


const { series, parallel } = gulp;

function appCSS() {
    return gulp.src('src/assets/css/*.css')
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(concat("ccCss.min.css"))
        .pipe(gulp.dest("build/"))
}

function appHTML() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
}

function appJS() {
    return gulp.src('src/assets/js/app/*.js')
        .pipe(babel({
            comments: false,
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(concat('ccJs.min.js'))
        .pipe(gulp.dest('build/'))
}

function allJS() {
    return gulp.src('src/assets/js/dependeces/*.js')
        .pipe(babel({
            comments: false,
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(concat('ccDependeces.min.js'))
        .pipe(gulp.dest('build/'))
}

function appIMG() {
    return gulp.src('src/assets/img/prod/*.*')
        .pipe(gulp.dest('build/img/'))
}

function appStylus() {
    return gulp.src('styles/styls/*.styl')
        .pipe(stylus({
            'include css': true,
            use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')],
            compress: true,
            linenos: false,
        }))
        .pipe(concat("global.css"))
        .pipe(gulp.dest("styles/"))
}


gulp.task("appStylus", appStylus)

function archivesMonitor(cb) {
    watch('styles/styls/**/*.styl', () => gulp.series('appStylus')())
    watch('styles/styls/*.styl', () => gulp.series('appStylus')())

    return cb()
}

module.exports.default = series(
    parallel(
        series(appStylus)
    ),
    archivesMonitor
)
