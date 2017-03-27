var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');


gulp.task('alljs', function () {
	gulp.src([
  		'js/phaser.min.js',
  		'js/phaser-debug.js',
      'js/md5.js',
  		'js/level_data.js',
  		'js/classes/Explosion.js',
  		'js/classes/Powerup.js',
  		'js/classes/Bullet.js',
  		'js/classes/Weapons.js',
  		'js/classes/Enemies.js',
  		'js/classes/Buddy.js',
  		'js/boot.js',
  		'js/preload.js',
  		'js/gametitle.js',
  		'js/gameplay.js',
  		'js/gameover.js',
  		'js/scoresummary.js',
      'js/toptenscore.js',
      'js/displayscores.js',
      'js/cutscene.js'
	])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('default', function(){
	gulp.run('alljs'); 
});

gulp.watch('./js/*', function () {
     gulp.run('alljs');
});