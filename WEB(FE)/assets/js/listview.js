const LANGUAGE_OPTION = {
    "decimal" : "",
    "emptyTable" : "데이터가 없습니다.",
    "info" : "_START_ ~ _END_ (총 _TOTAL_ 개의 데이터가 있습니다.)",
    "infoEmpty" : "0명",
    "infoFiltered" : "(전체 _MAX_ 개 중 검색결과)",
    "infoPostFix" : "",
    "thousands" : ",",
    "lengthMenu" : "_MENU_ 개씩 보기",
    "loadingRecords" : "로딩중...",
    "processing" : "처리중...",
    "search" : "검색 : ",
    "zeroRecords" : "검색된 데이터가 없습니다.",
    "paginate" : {
        "first" : "첫 페이지",
        "last" : "마지막 페이지",
        "next" : "다음",
        "previous" : "이전"
    },
    "aria" : {
        "sortAscending" : " :  오름차순 정렬",
        "sortDescending" : " :  내림차순 정렬"
    }
};

/**
 * listview.html
 */
$(document).ready(function () {
    fnGetListViewData("https://moonjewoong.pythonanywhere.com/board/?board_type=pick_up&post_status=ongoing", "dataTableLost");
    fnGetListViewData("https://moonjewoong.pythonanywhere.com/board/?board_type=request&post_status=ongoing", "dataTableFound");
    fnGetListViewData("https://moonjewoong.pythonanywhere.com/board/?post_status=completed", "dataTableSuccess");
});

function fnGetListViewData(url, tableName) {
    var data = new Array();

    $.ajax({
        url: url, 
        dataType: "json", 
        type: "GET", 
        success: function(ret) { 
            
            for (const key in ret.data) {
                let tmp = new Array();
                tmp.push(getDateTimePostFormat(ret.data[key].created_at));
                tmp.push(ret.data[key].title);
                tmp.push(getTagOrName(ret.data[key].tag, true));
                tmp.push(ret.data[key].id);
                data.push(tmp);
            }

            initDataTable(data, tableName);
        }, 
        error: function(request, status, error) {
            alert('데이터 로딩에 실패했습니다.');
        }
    });
}

/**
 * 찾아주세요! 게시판 init
 */
function initDataTable(data, tableName) {

    // console.log(data);
    // console.log(tableName);

    var table = $(`#${tableName}`).DataTable({
        data: data,  
        "order" : [[0, 'asc']], 
        "language" : LANGUAGE_OPTION, 
        "columnDefs": [{
            targets : 0, 
            className : 'dt-center', 
            orderable : true
        }, {
            targets : 1, 
            className : 'dt-left', 
            className : 'dt-head-center', 
            orderable : false
        }, {
            targets : 2, 
            className : 'dt-center', 
            orderable : false
        }, 
        
        /*{
            targets : 3, 
            className : 'dt-center', 
            orderable : true, 
            render : function(data, type) {
                if (type == 'display') {
                    if (data == '1') {
                        return "처리완료 <i style='color: #14c871;' class='fa fa-3 fa-check-circle datatable-paid-1'></i>";
                    } else if (data == '2') {
                        return "처리중 <i style='color: #00a3d2;' class='fa fa-3 fa-exclamation-circle datatable-paid-0'></i>";
                    } else if (data == '3') {
                        // return "<i class='fa fa-3 fa-exclamation-circle datatable-paid-0'></i>";
                    }
                } else {
                    return data;
                }
            }
        }, 
        */
        {
            targets: -1,
            className : 'dt-center', 
            orderable : false, 
            data: null,
            defaultContent: "<button style='border-radius: 4px; background: #fff; color: #5f687b; border: 1px solid #cdd1d9; font-size: 14px; padding: 8px 20px;'>자세히 보기</button>"
        }],
        
        initComplete: function () {
            this.api().column().eq(0).each( function () {
                var column = this.column(2);
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.header()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            });
        }
        
    });

    $(`#${tableName} tbody`).on('click', 'button', function () {
        var data = table.row( $(this).parents('tr')).data();
        console.log(data[3]);
        window.open(`post.html?postNo=${data[3]}`);
    });
}
