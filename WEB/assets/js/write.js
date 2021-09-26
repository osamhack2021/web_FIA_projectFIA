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

    $("#type").val(writeType === 'lost' ? "찾아주세요!" : "찾아가세요!").prop("selected", true);
    // sessionStorage.setItem('userID', 'TEST');
    $("#user").val(sessionStorage.getItem('userID'));
});

function getParameterByName(name) { 
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), 
    results = regex.exec(location.search); 
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " ")); 
}

function uploadImgPreview() {
    // @breif 업로드 파일 읽기
    let fileList = document.getElementById( "upload" ).files;
    // @breif 업로드 파일 읽기
    function readAndPreview( fileList ) {
        // @breif 이미지 확장자 검사
        if ( /\.(jpe?g|png|gif)$/i.test( fileList.name ) ) {
            let reader = new FileReader();
            reader.addEventListener( "load", function() {
                let image = new Image();
                image.width = "264";
                image.height = "264";
                image.title = fileList.name;
                image.src = this.result;
                // @details 이미지 확장자 검사
                document.getElementById( "thumbnailImgs" ).appendChild( image );
            }, false );
            // @details readAsDataURL( )을 통해 파일의 URL을 읽어온다.
            if( fileList ) {
                reader.readAsDataURL( fileList );
            }
        }
    }
    if( fileList ) {
        [].forEach.call( fileList, readAndPreview );
    }
}