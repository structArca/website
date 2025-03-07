/*special-report.txtは、最後に一行余白行が必要*/

/*描画*/
function DrawSpecialReport(resourceText)
{
    if(resourceText === null || contentIDSave === ""){
        MSG_ERROR("spacial-report.js", "DrawSpecialReport()", "実行できません。");
        return;
    }

    let dataLength = 4;
    let data = Array(dataLength);
    for(j = 0; j < dataLength; j++){
        data[j] = "";
    }
    /*
    0 : 更新日時
    1 : タイトル
    2 : リンク
    3 : 詳細
    */

    const src = String(resourceText);

    document.getElementById(contentIDSave).innerHTML = "読み込み中...";
    var dest = "<div style = \"display: flex;\">";

    for(i = 0, j = 0, n = 0, iStart = 0; i < src.length; i++){
        if(src[i] == ',' || src[i] == '\n'){
            data[j] = src.slice(iStart, i);
            j++;
            if(j >= dataLength){
                MSG_ERROR("Special-Report.js", "DrawSpecialReport()", "dataLengthが短いままです");
            }
            iStart = i+1;
        }

        if(src[i] == '\n'){

            dest += "<div style = \"\
                position: relative;\
                margin: 0;\
                padding: 0;\
                width: 12vw;\
                height: 16vh;\
                white-space: nowrap;\
                overflow: hidden;\
            \">";

            if(data[1] == ""){
                data[1] = "無題"
            }

            dest += "<h4 style = '\
            '>" + data[1] + "</h4>";
            if(data[3] == ""){
            }else{
                dest += "<p>" + data[3] + "</p>";
            }
            if(data[2] == ""){
            }else{
                dest += "<a href = '" + data[2] + "' target = '" + data[1] + "' ";
                dest += "style = '\
                    position: relative;\
                    padding-left: 2vw;\
                    padding-right: 2vw;\
                    padding-top: 2vh;\
                    padding-bottom: 2vh;\
                    width: 8vw;\
                    height: 6vh;\
                    font-size: 1vw;\
                    text-align: center;\
                    background-color: #333333;\
                    color: #FFFFFF;'\
                    >"
                dest += "No Image.";
                dest += "<img src = \"" + data[2] + "\" onError = 'this.style.display = \"none\"'\>";
                dest += "</a>";
            }
            if(data[0] == ""){
            }else{
                dest += "<div style = '\
                position: relative;\
                margin: 0;\
                padding: 0;\
                top: 2vh;\
                text-size: 0.5vw;\
                opacity: 30%;\
                '>" + data[0] + "</div>";
            }
            // dest += "<br><br>";
            dest += "</div>";

            for(j = 0; j < dataLength; j++){
                data[j] = "";
            }
            iStart = i+1;
            j = 0;
            n++;
        }
    }

    dest += "<div>";
    document.getElementById(contentIDSave).innerHTML = dest;
};

/*ファイル読み込ませ、Drawを呼び出させる*/
function ShowSpecialReport(filePath, contentID){
    GetTextByFile(filePath, null, DrawSpecialReport);
    contentIDSave = contentID;
};