function fnAddComment() {
    
}

function addComment(userID, dateTime, content) {
    // 추가될 댓글 Element
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

