
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
    var dest = "";

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
            n++;
            iStart = i+1;

            if(data[1] == ""){
                data[1] = "無題"
            }
            dest += "<h4>" + data[1] + "</h4>";
            if(data[3] == ""){
            }else{
                dest += "<p>" + data[3] + "</p>";
            }
            if(data[2] == ""){
            }else{
                dest += "<a href = \"" + data[2] + "\" target = \"" + data[1] + "\" >" + data[2] + "</a><br>";
            }
            if(data[0] == ""){
            }else{
                dest += "<small> " + data[0] + "</small>";
            }
            dest += "<br><br>";

            for(j = 0; j < dataLength; j++){
                data[j] = "";
            }
            j = 0;
        }
    }

    document.getElementById(contentIDSave).innerHTML = dest;
};

/*ファイル読み込ませ、Drawを呼び出させる*/
function ShowSpecialReport(filePath, contentID){
    GetTextByFile(filePath, null, DrawSpecialReport);
    contentIDSave = contentID;
};