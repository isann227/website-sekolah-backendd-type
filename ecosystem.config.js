module.exports = {
    apps: [
        {
            name: "Nest Js API Master",
            script: "./dist/src/main.js",
            instances: 2,
            max_memory_restart: "1G",
            // out_file: "./logs/prod-access.log",
            // error_file: "./logs/prod-error.log",
            merge_logs: true,
            log_date_format: "YY-DD-MM HH:mm:ss Z",
            log_type: "log",
            env_production: {
                NODE_ENV: "production",
                PORT: 3000,
                exec_mode: "cluster_mode"
            },
            env_development: {
                NODE_ENV: "development",
                PORT: 3000,
                watch: true,
                watch_delay: 3000,
                ignore_watch: [
                  "./node_modules",
                  "./app/views",
                  "./public",
                  "./.DS_Store",
                  "./package.json",
                  "./yarn.lock",
                  "./samples",
                  "./src"
                ],
            },
        }
    ]
}