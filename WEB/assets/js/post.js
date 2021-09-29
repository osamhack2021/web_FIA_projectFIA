$(document).ready(function() {
    let postNo = getParameterByName('postNo');
    $.ajax({
        url: "/WEB/assets/test-data-post.json", 
        data: { 'postNo': postNo }, 
        dataType: "json", 
        success: function(data) { 
            fnSetPostInfo(data);
        }, 
        error: function(request, status, error) {
            // console.log(request);
            // console.log(status);
            // console.log(error);

            alert('데이터 로딩에 실패했습니다.');
            location.href = 'index.html';
        }
    });

});

function fnSetPostInfo(data) {
    document.getElementById('title').value = data.title;
    document.getElementById('userID').value = data.userID;
    document.getElementById('tag').value = data.tag;
    document.getElementById('writeType').value = data.writeType === 'lost' ? "찾아주세요!" : "찾아가세요!";
    document.getElementById('place').value = data.place;
    document.getElementById('details').value = data.details;

    

    for (const key in data.comments) {
        fnAddComment(data.comments[key].userID, data.comments[key].dateTime, data.comments[key].content);
    }
}

function fnAddComment(userID, dateTime, content) {

    // div 추가
    const commentEl = document.createElement('div');

    const lineEl = document.createElement('hr');
    const infoEl = document.createElement('div');
    const contentEl = document.createElement('div');

    lineEl.classList.add('mb-4');
    
    infoEl.innerText = `${userID} ( ${dateTime} )`;
    contentEl.innerText = content;

    commentEl.appendChild(lineEl);
    commentEl.appendChild(infoEl);
    commentEl.appendChild(contentEl);

    document.getElementById('count').innerText = parseInt(document.getElementById('count').innerText) + 1;
    document.getElementById('comment').appendChild(commentEl);
}

function fnAddCommentCheck() {
    // let userID = 
    let content = document.getElementById('add').value;
    let dateTime = getAcquireDateTime(new Date().toISOString().split("T")[0], new Date().toTimeString().split(" ")[0]);
}
