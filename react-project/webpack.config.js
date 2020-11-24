const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const bundleAnalyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
})



function getBaseConfig(env) {
    const config = {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/, loader: "ts-loader", options: {
                        transpileOnly: true,
                        compilerOptions: {
                            sourceMap: false
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        externals: {
        },
        entry: { 'bundle': './src/index' },
        target: 'web',
        plugins: [
            bundleAnalyzer
        ]

    }
    return config;
}



module.exports = env => {
    return {
        ...getBaseConfig(),
        mode: "production"
    }
}