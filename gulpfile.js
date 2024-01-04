let preprocessor = 'sass';
const { parallel, series, watch, src, dest  } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imageComp = require('compress-images');
const clean = require('gulp-clean');

function serv() {
    browserSync.init({
        server: { baseDir: './' },
        notify: false,
        online: true
    })
}

function scripts() {
    return src([
        // 'node_modules/jquery/dist/jquery.min.js',
        './src/js/*.js',
        '!./src/js/**/*min.js',
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(dest('./src/js/'))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/' + preprocessor + '/main.scss' + '')
        .pipe(eval(preprocessor)())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleanCSS( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
        .pipe(dest('./src/css/'))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
}

async function images() {
    imageComp(
        "./src/images/**/*",
        "./dist/images/",
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
        { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (err, completed) {
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

function cleanImg() {
    return src('./dist/images/', {allowEmpty: true}).pipe(clean())
}

function cleanDist() {
    return src('./dist', {allowEmpty: true}).pipe(clean())
}

function watcher() {
    watch(['./src/**/*.js', '!./src/**/*.min.js'], scripts);
    watch('./src/**/' + preprocessor + '/**/*', styles);
    watch('./**/*.html').on('change', browserSync.reload);
    watch('./src/images/**/*', images);
}

function buildCopy() {
    return src([
        './src/css/**/*.min.css',
        './src/js/**/*.min.js',
        './src/images/**/*',
    ], { base: './src' })
        .pipe(dest('./dist'))
}

exports.serv = serv;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanImg = cleanImg;
exports.cleanDist = cleanDist;
exports.buildCopy = buildCopy;

exports.build = series(cleanDist, styles, scripts, images, buildCopy);
exports.dev = parallel(styles, scripts, serv, watcher);

exports.default = parallel(styles, scripts, serv, watcher); // для удобства набора в терминале