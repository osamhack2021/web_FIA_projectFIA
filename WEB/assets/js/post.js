let postNo;

$(document).ready(function() {

    postNo = getParameterByName('postNo');

    if (postNo == null) {
        alert('잘못된 접근입니다.');
        location.href = 'index.html';
    } else if (sessionStorage.getItem('userToken') == null) {
        alert('세션이 만료되었습니다. 로그인 해주세요.');
        location.href = 'index.html';
    }

    $.ajax({
        url: `https://moonjewoong.pythonanywhere.com/board/${postNo}/`, 
        // url: "/WEB/assets/test-data-post.json", 
        // url: `http://20.196.209.235/board/${postNo}/`, 
        dataType: "json", 
        type: "GET", 
        success: function(data) { 
            fnSetPostInfo(data);
        }, 
        error: function(request, status, error) {
            // console.log(request);
            // console.log(status);
            // console.log(error);

            alert('데이터 로딩에 실패했습니다. 잠시 후 시도해주세요.');
            location.href = 'index.html';
        }
    });
    
});

function fnSetPostInfo(data) {
    document.getElementById('title').value = data.data.title;
    document.getElementById('userID').value = `${data.data.username} ( ${data.data.user} )`;
    document.getElementById('tag').value = getTagOrName(data.data.tag, true);
    document.getElementById('writeType').value = data.data.board_type === 'pick_up' ? "찾아가세요!" : "찾아주세요!";
    document.getElementById('place').value = data.data.place;
    document.getElementById('details').value = data.data.body;

    

    for (const key in data.data.comments) {
        fnAddComment(`${data.data.comments[key].username} ( ${data.data.comments[key].user} )`, data.data.comments[key].created_at, data.data.comments[key].body);
    }
}


function fnAddComment(userInfo, dateTime, content) {

    // div 추가
    const commentEl = document.createElement('div');

    const rowEl = document.createElement('div');
    const lineEl = document.createElement('hr');
    const infoEl = document.createElement('div');
    const timeEl = document.createElement('div');
    const contentEl = document.createElement('div');

    lineEl.classList.add('mb-4');
    rowEl.classList.add('row');
    infoEl.classList.add('col-md-9');
    timeEl.classList.add('col-md-3');
    
    infoEl.innerText = userInfo;
    timeEl.innerText = getDateTimePostFormat(dateTime);
    contentEl.innerText = content;

    rowEl.appendChild(infoEl);
    rowEl.appendChild(timeEl);

    commentEl.appendChild(lineEl);
    commentEl.appendChild(rowEl);
    commentEl.appendChild(document.createElement('br'));
    commentEl.appendChild(contentEl);

    document.getElementById('count').innerText = parseInt(document.getElementById('count').innerText) + 1;
    document.getElementById('comment').appendChild(commentEl);
}

function fnAddCommentCheck() {
    $.ajax({
        url: "https://moonjewoong.pythonanywhere.com/board/comment/", 
        // url: "/WEB/assets/test-data-post.json", 
        // url: `http://20.196.209.235/board/${postNo}/`, 
        dataType: "json", 
        type: "POST", 
        data: {
            body: document.getElementById('add').value, 
            post: postNo
        }, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + sessionStorage.getItem('userToken'));
        },
        success: function(data) { 
            document.getElementById('add').value = '';
            fnAddComment(`${data.username} ( ${data.user} )`, getDateTimePostFormat(data.created_at), data.body);
        }, 
        error: function(request, status, error) {
            console.log(request);
            console.log(status);
            console.log(error);

            alert('댓글 추가를 실패했습니다. 잠시 후 시도해주세요.');
        }
    });

    
}

function getDateTimePostFormat(dateTimeParam) {
    let dateTime = new Date(dateTimeParam);
    const formatDate = (current_datetime)=>{
        let formatted_date = current_datetime.getFullYear() + "-" 
            + (current_datetime.getMonth() + 1) + "-" 
            + current_datetime.getDate() + " " 
            + current_datetime.getHours() + ":" 
            + current_datetime.getMinutes();
        return formatted_date;
    }

    return formatDate(dateTime);
}