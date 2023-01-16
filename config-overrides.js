module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "util": require.resolve("util/"),
        "buffer": require.resolve("buffer/")
    }

    return config;
}