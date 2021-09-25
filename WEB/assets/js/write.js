$(document).ready(function () {
    
    let writeType = getParameterByName('writeType');
    if (writeType === null || !(writeType === 'lost' || writeType === 'found')) {
        alert('잘못된 경로로 접근하였습니다.');
        location.href = '/WEB/index.html';
    }

    // $("#writeType").text(writeType === 'lost' ? '찾아주세요!' : '찾아가세요!');
});

function getParameterByName(name) { 
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), 
    results = regex.exec(location.search); 
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " ")); 
}
