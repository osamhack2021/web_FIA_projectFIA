$(document).ready(function () {
    var table = $('#listview').DataTable({
        "ajax": {
            url: '/WEB/assets/data.json', 
            type : 'GET', 
            error: function(xhr) {
                console.log(xhr);
            }
        }, 
        "order": [[0, 'asc']], 
        "language": {
        "decimal" : "",
        "emptyTable" : "데이터가 없습니다.",
        "info" : "_START_ ~ _END_ (총 _TOTAL_ 개의 데이터가 있습니다.)",
        "infoEmpty" : "0명",
        "infoFiltered" : "(전체 _MAX_ 명 중 검색결과)",
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
        }, 
        "columnDefs": [{ 
            targets : 2, 
            render: function(data, type) {
                if (type == 'display') {
                    if (data == '1') {
                        return '처리완료 <i class="fa fa-3 fa-check-circle datatable-paid-1"></i>';
                    } else if (data == '2') {
                        return '처리중 <i class="fa fa-3 fa-exclamation-circle datatable-paid-0"></i>';
                    } else if (data == '3') {
                        return '<i class="fa fa-3 fa-exclamation-circle datatable-paid-0"></i>';
                    }
                } else {
                    return data;
                }
            }
        }, {
            targets: -1,
            data: null,
            defaultContent: "<button style='color: green;'>자세히 보기</button>"
        }],
    });

    $('#listview tbody').on('click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert(`${data[3]}번째 글입니다.`);
    });
});
