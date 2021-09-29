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
