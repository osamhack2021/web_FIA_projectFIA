let images = [];

const WRITE_KEY = ['title', 'userID', 'place', 'details', 'tag', 'writeType', 'date', 'time'];
const WRITE_KEY_KO = ['제목', '작성자', '습득장소(특이사항)', '세부사항', '태그', '글 유형', '습득 날짜', '습득 시각'];

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
 * URL Parameter value return
 * 
 * @param {string} name parameter name
 * @returns {string} parameter value
 */
function getParameterByName(name) { 
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), 
    results = regex.exec(location.search); 
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " ")); 
}

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

/**
 * 날짜와 시각을 DB의 포맷에 맞춰 변경한다.
 * format: yyyy-MM-dd HH:mm
 * 
 * @param {string} date 습득 날짜
 * @param {string} time 습득 시각
 * @returns {string} 작성자가 설정한 습득 DateTime
 */
function getAcquireDateTime(date, time) {
    let dateTime = new Date(`${date} ${time}`);
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
