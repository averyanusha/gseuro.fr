import webpack from "webpack-stream";
import webpackConfig from "../../webpack.config.js"; // Import the external config

export const js = () => {
    // The src should include all your JS and JSX entry points
    return app.gulp.src(['./src/js/app.js', './src/react/carousel-main.jsx', './src/react/calendar-main.jsx'], {
        sourcemaps: app.isDev,
        allowEmpty: true // Add allowEmpty for robust watching
    })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({
            // Pass the external webpack config
            ...webpackConfig,
            // Override mode and devtool for Gulp CLI flags
            mode: app.isBuild ? 'production' : 'development',
            devtool: app.isDev ? 'eval-cheap-module-source-map' : 'source-map',
            // Ensure cache is off for watch mode, or manage it via watchify/webpack dev server
            cache: false,
        }))
        .pipe(app.gulp.dest(app.path.build.js)) // 
        .pipe(app.plugins.browsersync.stream());
}