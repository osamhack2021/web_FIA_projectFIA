let images = [];

const WRITE_KEY = ['title', 'userID', 'tag', 'writeType', 'date', 'time', 'place', 'details'];
const WRITE_KEY_KO = ['제목', '작성자', '태그', '글 유형', '습득 날짜', '습득 시각', '습득장소(특이사항)', '세부사항'];

/**
 * write.html 
 */
$(document).ready(function () {
    
    let writeType = getParameterByName('writeType');
    if (writeType === null || !(writeType === 'lost' || writeType === 'found')) {
        alert('잘못된 경로로 접근하였습니다.');
        location.href = '/WEB/index.html';
    }

    $('#date').datepicker({
        format: "yyyy-mm-dd", 
        autoclose : true, 
        todayHighlight : true, 
        language : "ko"
    }).datepicker("setDate", new Date());

    $('#time').timepicki();

    $("#writeType").val(writeType === 'lost' ? "찾아주세요!" : "찾아가세요!").prop("selected", true);
    // sessionStorage.setItem('userID', 'TEST');
    $("#user").val(sessionStorage.getItem('userID'));
    

    document.getElementById("userID").value = 's';
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
            return false;
        }
        data[WRITE_KEY[i]] = tmp;
    }

    data["date"] = getAcquireDateTime(data["date"], data["time"]);
    delete data["time"];


    // JSON으로 변환 
    // POST로 서버에 전송해야함
    console.log(JSON.stringify(data));
    
    return false;
}
