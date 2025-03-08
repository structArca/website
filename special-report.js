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

    /*単位はvw*/
    const imgWidth = 16;
    const imgHeight = imgWidth * 3 / 4;
    const padRight = 2;

    const src = String(resourceText);

    document.getElementById(contentIDSave).innerHTML = "読み込み中...";
    var dest = "<div style = \"display: flex; padding-bottom: 6vh;\">";

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
            if((padRight + imgWidth) * n > 100){
                break;
            }
            dest += "<div style = \"\
                position: relative;\
                margin: 0;\
                padding: 0;\
                padding-right: " + padRight + "vw;\
                width: " + imgWidth + "vw;\
            \">";

            if(data[1] == ""){
                data[1] = "無題"
            }

            dest += "<h4 style = '\
                white-space: nowrap;\
                font-size: 1.5vw;\
                overflow: hidden;\
                margin: 0;\
                padding-bottom: 0.5vw;\
            '\
            >" + data[1] + "</h4>";
            underBuffer += 3;
            if(data[3] == ""){
            }else{
                dest += "<p>" + data[3] + "</p>";
            }
            if(data[2] == ""){
            }else{
                dest += "<div style = '\
                    position: relative;\
                    margin: 0;\
                    padding: 0;\
                    width: " + imgWidth + "vw;\
                    height: " + imgHeight + "vw;\
                    transition-property: transform, width, height;\
                    transition-duration: 0.3s;\
                    transition-timing-function: ease;\
                    fontsize: 0;\
                '\
            onMouseOver = 'this.style.opacity = \"80%\"; this.style.transform = \"scale(1.2)\";'\
            onMouseOut = 'this.style.opacity = \"100%\"; this.style.transform = \"scale(1)\";'\
            ><a href = '" + data[2] + "' target = '" + data[1] + "' ";
                dest += "style = '\
                    display: block;\
                    position: absolute;\
                    padding-left: 2vw;\
                    padding-right: 2vw;\
                    padding-top: 5vw;\
                    padding-bottom: 5vw;\
                    width: " + (imgWidth - 2*2) + "vw;\
                    height: " + (imgHeight - 5*2) + "vw;\
                    font-size: 1.25vw;\
                    text-align: center;\
                    background-color: #444444;\
                    color: #FFFFFF;\
                    '\
                    >"
                dest += "No Image.";
                dest += "</a><a href = '" + data[2] + "' target = '" + data[1] + "' >";
                dest += "<img src = \"" + data[2] + "\" onError = 'this.style.display = \"none\"' alt = \"この特別報のサムネイル画像\" width = '100%%' height = '100%' style = '\
                    display: block;\
                    position: absolute;\
                '></a></div>";
            }
            if(data[0] == ""){
            }else{
                dest += "<div style = '\
                position: relative;\
                margin: 0;\
                padding: 0;\
                top: 1vw;\
                font-size: 1vw;\
                overflow: hidden;\
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

    dest += "</div>";
    document.getElementById(contentIDSave).innerHTML = dest;
};

/*ファイル読み込ませ、Drawを呼び出させる*/
function ShowSpecialReport(filePath, contentID){
    GetTextByFile(filePath, null, DrawSpecialReport);
    contentIDSave = contentID;
};