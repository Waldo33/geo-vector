const {src, dest, series, watch} = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);
const csso = require('gulp-csso')
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

const del = require('del');

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function images() {
    return src('src/images/**')
        .pipe(dest('dist/images'))
}

function js() {
    return src('src/js/**.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(dest('dist'))
}

function libs_js() {
    return src('src/js/libs/**.js')
        .pipe(uglify())
        .pipe(dest('dist/libs'))
}

function phpmailer() {
    return src('src/phpmailer/**.php')
        .pipe(dest('dist/php'))
}

function fonts() {
    return src('src/fonts/**')
        .pipe(dest('dist/fonts'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/components/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/scss/components/**.scss', series(scss)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
    watch('src/phpmailer/**.php', series(phpmailer)).on('change', sync.reload)
    watch('src/images/**', series(images)).on('change', sync.reload)
}

exports.build = series(clear, libs_js, js, scss, html, images, fonts, phpmailer)
exports.serve = series(clear, libs_js, js, scss, html, images, fonts, phpmailer, serve)
exports.clear = clear