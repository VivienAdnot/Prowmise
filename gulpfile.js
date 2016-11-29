const gulp = require('gulp');
const argv = require('yargs').argv;
const merge = require('merge');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const connect = require('gulp-connect');
const jasmine = require('gulp-jasmine');

const paths = {
    pages: ['./src/*.html'],
    buildDir: "./build/dev"
};

const webpackBaseConfig = {
    debug: true,
    bail: true,
    output: {
        //library: "Playtem",
        //libraryTarget: "umd",
        //umdNamedDefine: true
    },
    devtool: "source-map",
    resolve: {
        extensions: [ '', '.ts']
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    plugins: []
};

function buildWebpack(sourceFilename, outputFilename) {
    const config = merge.recursive(true, webpackBaseConfig, {
        output: {
            filename: outputFilename
        }
    });

    return gulp
        .src(sourceFilename)
        .pipe(webpackStream(config))
        .pipe(gulp.dest(paths.buildDir));
}

const webpackBaseTestConfig = {
    debug: true,
    bail: true,
    output: {},
    devtool: "source-map",
    resolve: {
        extensions: [ '', '.ts']
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    plugins: []
};

function buildWebpackTest(sourceFilename, outputFilename) {
    const config = merge.recursive(true, webpackBaseTestConfig, {
        output: {
            filename: outputFilename
        }
    });

    gulp.src(sourceFilename)
        .pipe(webpackStream(config))
        .pipe(gulp.dest("./test/build"));


    return gulp
        .src("./test/build/tests.js")
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));   
}

gulp.task('test', function() {
    return buildWebpackTest('./test/main.ts', 'tests.js');
});

gulp.task('dev', function() {
    connect.server({
        root: paths.buildDir,
        port: 9999
    });
});

gulp.task('build', ['build:main']);

gulp.task('build:main', function() {
    return buildWebpack('./src/main.ts', 'bundle.js');
});

