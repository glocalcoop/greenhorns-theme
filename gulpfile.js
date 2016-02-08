// npm install --save-dev gulp gulp-plumber gulp-watch gulp-livereload gulp-minify-css gulp-jshint jshint-stylish gulp-uglify gulp-rename gulp-notify gulp-include gulp-sass

var gulp = require('gulp'),
	plumber = require( 'gulp-plumber' ),
	watch = require( 'gulp-watch' ),
	livereload = require( 'gulp-livereload' ),
	minifycss = require( 'gulp-minify-css' ),
	jshint = require( 'gulp-jshint' ),
	stylish = require( 'jshint-stylish' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	notify = require( 'gulp-notify' ),
	include = require( 'gulp-include' ),
    gulpif = require('gulp-if'),
    sprity = require('sprity'),
	sass = require( 'gulp-sass' );

var onError = function( err ) {
	console.log( 'An error occurred:', err.message );
	this.emit( 'end' );
}

gulp.task( 'sass', function() {
	return gulp.src( './src/sass/style.scss', {
		style: 'expanded'
	} )
	.pipe( plumber( { errorHandler: onError } ) )
	.pipe( sass() )
	.pipe( gulp.dest( '.' ) )
	.pipe( minifycss() )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( gulp.dest( './assets/styles' ) )
	.pipe( notify( { message: 'Styles task complete' } ) )
    .pipe( livereload() );
} );

gulp.task('scripts', function() {
  return gulp.src( './src/js/**/*.js' )
    .pipe( gulp.dest( './assets/js' ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( uglify() )
    .pipe( gulp.dest('./assets/scripts') )
    .pipe( notify( { message: 'Scripts task complete' } ) )
    .pipe( livereload() );
});

// generate sprite.png and _sprite.scss 
gulp.task('sprites', function () {
  return sprity.src({
    src: './src/images/sprites/**/*.{png,jpg}',
    style: './_sprites.scss',
    split: true,
    cssPath: 'assets/images/',
    // ... other optional options 
    // for example if you want to generate scss instead of css 
    processor: 'sass', // make sure you have installed sprity-sass 
  })
  .pipe(gulpif('*.png', gulp.dest('./assets/images/'), gulp.dest('./src/sass/components/')))
});

gulp.task( 'watch', function() {
	livereload.listen();
	gulp.watch( './src/sass/**/*.scss', [ 'sass' ] );
	gulp.watch( './src/js/**/*.js', [ 'scripts' ] );
    gulp.watch( './src/images/sprites/**/*.{png,jpg}', [ 'sprites' ] );
	gulp.watch( './**/*.php' ).on( 'change', function( file ) {
		livereload.changed( file );
	} );
} );

gulp.task( 'default', ['watch', 'sass', 'scripts', 'sprites' ], function() {

} )