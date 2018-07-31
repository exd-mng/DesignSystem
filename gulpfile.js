var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    data = require('gulp-data'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require("gulp-uglify"),
    del = require('del'),
    fs = require("fs"),
    merge = require('gulp-merge-json'),
    path = require('path'),
    svgsprite = require('gulp-svg-sprite'),
    bs = require('browser-sync').create();

gulp.task('browser-sync', function() {
  bs.init({
      server: {
          baseDir: "dist"
      }
  });
});

var autoprefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('pug:data', function() {
  return gulp
    .src('source/app/_data/partials/*.json')
    .pipe(merge({
        fileName: 'data.json',
        edit: (json, file) => {
            var filename = path.basename(file.path),
                primaryKey = filename.replace(path.extname(filename), '');
            var data = {};
            data[primaryKey.toUpperCase()] = json;
            return data;
        }
    }))
    .pipe(gulp.dest('source/app/_data/'));
});

gulp.task('html', ['pug:data'], function() {
  return gulp
    .src(['source/**/*.pug', '!source/app/_layouts/*.pug', '!source/app/_includes/**/*.pug', '!source/app/common/components/**/*.pug' ,'!source/assets/icons/**/*.pug'])
    .pipe(data( function(file) {
      return JSON.parse(
        fs.readFileSync('source/app/_data/data.json')
      );
    } ))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('styles', function () {
  return gulp
    .src('source/app/common/**/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(prefix(autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/app/common'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp
    .src('source/app/common/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/app/common/js'));
});

gulp.task('images', function() {
  return gulp
    .src('source/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('fonts', function() {
  return gulp
    .src(['source/app/common/styles/typo/*.*'])
    .pipe(gulp.dest('dist/app/common/styles/typo'));
});

var svgSpriteConfig = {
  mode: {
    symbol: {
      dest: '',
      sprite: 'sprite.svg'
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
    }
  }
};

gulp.task('svg', function () {
  return gulp.src('./source/assets/icons/*.svg')
    .pipe(svgsprite(svgSpriteConfig))
    .pipe(gulp.dest('./source/assets/icons/sprite'))
    .pipe(gulp.dest('./dist/assets/icons'));
}); 

gulp.task('clean', function() {
  return del(['dist', , 'source/assets/icons/sprite/*.svg' ]);
});

gulp.task('watch', function() {
  gulp.watch('source/**/*.pug', ['html']);
  gulp.watch('source/app/common/**/**/*.scss', ['styles']);
  gulp.watch('source/app/common/js/**/*.js', ['scripts']);
  gulp.watch('source/assets/img/**/*', ['images']);
  gulp.watch('source/assets/img/**/*', ['svg']);
});

gulp.task('default', ['svg', 'images', 'fonts', 'html', 'styles', 'scripts', 'watch'], function() {
  gulp.start('browser-sync');
});