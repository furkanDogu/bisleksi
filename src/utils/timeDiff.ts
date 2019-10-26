export default {
    startTime: 0,
    start() {
        this.startTime = Date.now();
    },
    getDiffInSeconds() {
        return (Date.now() - this.startTime) / 1000;
    },
};
