var contentIDSave =  "";

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

    let src = String(resourceText);

    document.getElementById(contentIDSave).innerHTML = resourceText;
    return;

    for(i = 0, j = 0, n = 0, iStart = 0; i < src.length; i++){
        if(src[j] == '\n'){
            n++;
            j = 0;
            iStart = i+1;

            document.getElementById(contentIDSave).innerText += "<h4>" + data[1] + "</h5><p>" + (data[3] ? data[3] : "") + "<p><a href = " + data[2] + " target = " + data[1] +
                " >" + data[2] + "</a><br><small> " + ShowDate(data[0]) + "</small><br><br>";
            for(j = 0; j < dataLength; j++){
                data[j] = "";
            }
        }else if(src[j] == ','){
            data[j] = (j ? data[j] : "") + src.slice(iStart, i);
            j++;
            if(j >= dataLength){
                MSG_ERROR("Special-Report.js", "DrawSpecialReport()", "dataLengthが短いままです");
            }
            iStart = i+1;
        }
    }
};

/*ファイル読み込ませ、Drawを呼び出させる*/
function ShowSpecialReport(filePath, contentID){
    GetTextByFile(filePath, null, DrawSpecialReport);
    contentIDSave = contentID;
};