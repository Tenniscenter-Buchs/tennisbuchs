export default class Loader {
    static disengage() {
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
            ele.classList.add('available');
        }
    }

    static engage() {
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
            ele.classList.remove('available');
        }
    }
}
