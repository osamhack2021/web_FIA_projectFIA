$(document).ready(function () {
    let writeType = sessionStorage.getItem('writeype');

    if (writeType === null) {
        alert('잘못된 경로로 접근하셨습니다.');
    } else if (writeType === 'lost') {

    } else if (writeType === 'found') {

    }

    sessionStorage.clear();
});