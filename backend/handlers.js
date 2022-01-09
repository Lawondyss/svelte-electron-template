class Handlers {
    ping() {
        return 'PONG in ' + new Date
    }

    versionOf(type) {
        return process.versions[type] ?? null
    }
}

module.exports = new Handlers