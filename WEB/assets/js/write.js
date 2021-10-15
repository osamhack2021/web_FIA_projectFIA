let images = [];

const WRITE_KEY = ['title', 'userID', 'tag', 'writeType', 'date', 'time', 'place', 'details'];
const WRITE_KEY_API = [];
const WRITE_KEY_KO = ['제목', '작성자', '태그', '글 유형', '습득 날짜', '습득 시각', '습득장소(특이사항)', '세부사항'];

/**
 * write.html 
 */
$(document).ready(function () {
    
    let writeType = getParameterByName('writeType');
    if (writeType === null || !(writeType === 'lost' || writeType === 'found')) {
        alert('잘못된 경로로 접근하였습니다.');
        location.href = '/WEB/index.html';
    } else if (sessionStorage.getItem('userToken') == null || sessionStorage.getItem('userToken_R') == null) {
        alert('세션이 만료되었습니다. 로그인 해주세요.');
        location.href = 'index.html';
    }

    $.ajax({
        url: `https://moonjewoong.pythonanywhere.com/accounts/user/`, 
        dataType: "json", 
        type: "GET", 
        success: function(data) { 
            document.getElementById("userID").value = `${data.name} ( ${data.email} )`;
        }, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userToken')}`);
        },
        error: function(request, status, error) {
            // console.log(request);
            // console.log(status);
            // console.log(error);

            alert('API 로딩에 실패했습니다. 잠시 후 시도해주세요.');
            location.href = 'index.html';
        }
    });

    $('#date').datepicker({
        format: "yyyy-mm-dd", 
        autoclose : true, 
        todayHighlight : true, 
        language : "ko"
    }).datepicker("setDate", new Date());

    $('#time').timepicki();

    $("#writeType").val(writeType === 'lost' ? "찾아주세요!" : "찾아가세요!").prop("selected", true);
    
    document.getElementById('date_label').innerText = (writeType === 'lost' ? '분실 날짜' : '습득 날짜');
    document.getElementById('time_label').innerText = (writeType === 'lost' ? '분실 시각' : '습득 시각');
    document.getElementById('place_label').innerText = (writeType === 'lost' ? '분실 장소(특이사항)' : '습득 장소(특이사항)');
});

/**
 * 이미지 업로드 미리보기
 */
function fnUploadImgPreview() {
    fileList = document.getElementById("upload").files;
    
    function readAndPreview(fileList) {
        if ( /\.(jpe?g|png|gif)$/i.test(fileList.name)) {
            let reader = new FileReader();
            reader.addEventListener("load", function() {
                let image = new Image();
                image.width = "280";
                image.height = "280";
                image.title = fileList.name;
                image.src = this.result;
                images.push(image);
                document.getElementById("uploadImgs").appendChild(image);
            }, false );
            if(fileList) {
                reader.readAsDataURL(fileList);
            }
        }
    }
    if(fileList.length > 3 || fileList.length + images.length > 3) {
        alert('이미지 첨부는 최대 3개까지 가능합니다.');
    } else if (fileList.length > 0){
        [].forEach.call( fileList, readAndPreview );
    }
}


/**
 * 이미지 업로드 초기화
 */
function fnResetUploadImage() {
    images = [];
    document.getElementById("uploadImgs").innerText = '';
}


/**
 * 글 작성하기 btn Click
 * 
 * @returns {boolean} 글 작성이 성공하면 true를 반환한다.
 */
function fnOnSubmit() {
    let data = new Object();

    for (let i = 0; i < WRITE_KEY.length; i++) {
        let tmp = document.getElementById(WRITE_KEY[i]).value;
        if (!tmp) {
            alert(`${WRITE_KEY_KO[i]}을(를) 작성해 주세요.`);
            return;
        }
        data[WRITE_KEY[i]] = tmp;
    }

    // console.log(data['title']);
    // console.log(`${data['details']}\n\n${(data['writeType'] == '찾아가세요!' ? '습득 시각' : '분실 시각')} : [ ${getAcquireDateTime(data["date"], data["time"])} ]`);
    // console.log(getTagOrName(data['tag'], false));
    // console.log(data['place']);
    // console.log( (data['writeType'] == '찾아가세요!' ? 'pick_up' : 'request') );

    // return;

    $.ajax({
        url: `https://moonjewoong.pythonanywhere.com/board/`, 
        dataType: "json", 
        type: "POST", 
        data: {
            title: data['title'], 
            body: `${data['details']}\n\n${(data['writeType'] == '찾아가세요!' ? '습득 시각' : '분실 시각')} : [ ${getAcquireDateTime(data["date"], data["time"])} ]`, 
            tag: getTagOrName(data['tag'], false), 
            place: data['place'], 
            board_type: (data['writeType'] == '찾아가세요!' ? 'pick_up' : 'request'), 
            post_status: 'ongoing' 
        }, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userToken')}`);
        },
        success: function(data) { 
            alert('게시글 업로드를 성공했습니다. 홈으로 이동합니다');
            location.href = 'index.html';
            // console.log(data);
        }, 
        error: function(request, status, error) {
            // console.log(request);
            // console.log(status);
            // console.log(error);

            alert('게시글 업로드를 실패했습니다. 잠시 후 시도해주세요.');
        }
    });
    
}
