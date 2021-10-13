$(document).ready(function() {

    let postNo = getParameterByName('postNo');
    console.log(postNo);

    $.ajax({
        url: "/WEB/assets/test-data-post.json", 
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

            alert('데이터 로딩에 실패했습니다.');
            location.href = 'index.html';
        }
    });
    
    // 서버와 GET 요청 테스트
    /*
    $.ajax({
        url: "https://osamhack2021-web-cloud-fia-projectfia-976rpwvg5f7x99-8000.githubpreview.dev/accounts/", 
        dataType: "json", 
        type: "POST", 
        data: {
            "username": "",
            "email": "rickysbcwws@naver.com",
            "password1": "1q2w3e4r!",
            "password2": "1q2w3e4r!",
            "army_num": "21-76008799",
            "army_rank": 'private',
            "name": "조우성"
        }, 
        success: function(data) { 
            console.log(data);
        }, 
        error: function(request, status, error) {
            if (request.responseText.length > 1000) {
                
            }
            console.log(request.responseText);
            console.log(status);
            console.log(error);
        }
    });
    */
    
});

function fnSetPostInfo(data) {
    document.getElementById('title').value = data.data.title;
    document.getElementById('userID').value = `${data.data.username} ( ${data.data.user} )`;
    // document.getElementById('tag').value = data.tag;
    // 태그 수정 해야함
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
    // let userID = 
    let content = document.getElementById('add').value;
    let dateTime = getAcquireDateTime(new Date().toISOString().split("T")[0], new Date().toTimeString().split(" ")[0]);
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