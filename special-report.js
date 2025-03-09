/*special-report.txtは、最後に一行余白行が必要*/

/*横幅は1920pxとする(htmlでも同様)*/

const pageWidth = 1920;

var scrollX = 0;/*右が正*/
const scrollWidth = 30;/*px*/

function ScrollX(f = 0/*進むなら1, 戻るなら-1, なにもしないなら0*/){
    scrollX += Number(f);
    if(scrollX < 0){
        scrollX = 0;
    }
    return scrollX * scrollWidth;
}


/*再描画*/
function ReDraw(range)
{
    document.getElementById(range).style.display = 'none';
    document.getElementById(range).style.display = '';
}

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

    /*単位はpx*/
    const imgWidth = 300;
    const imgHeight = imgWidth * 3 / 4;
    const imgPadSide = 30;
    const sideScrollZoneWidth = 100;
    var rangeHeight = 0;/*特別報全体の高さ*/
    var rangeHeightMax = 0;/*特別報全体の高さ(最も大きかったものを保存、設定)*/

    const src = String(resourceText);

    /*rangeB_specialReport_allRange*/
    var dest = "<div id = 'rangeB_specialReport_allRange' style = \"\
        position: absolute;\
        top: 0;\
        left: 0;\
        width: inherit;\
        height: inherit;\
    \">";

    /*左へゾーン*/
    dest += "<div style = '\
        position: absolute;\
        left: 0;\
        top: 0;\
        width: " + sideScrollZoneWidth + "px;\
        height: inherit;\
        background-color: #333333;\
    ' id = 'rangeB_specialReport_leftRange'></div>";

    /*特別報一覧本体*/
    dest += "<div style = '\
        position: absolute;\
        left: " + sideScrollZoneWidth + "px;\
        top: 0;\
        width: " + (pageWidth - sideScrollZoneWidth*2) + "px;\
        height: inherit;\
        display: flex;\
        flex-direction: row;\
        overflow: hidden;\
        white-space: nowrap;\
    ' id = 'rangeB_specialReport_main'>";
    /*全体のスクロールを制御するためだけの要素*/
    dest += "<div style = '\
        position: relative;\
        left: 0;\
        width: 100px;\
        height: inherit;\
        background-color: #ff0000;\
    ' id = 'rangeB_specialReport_main_base'></div>";
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
            if(ScrollX() + (imgWidth + imgPadSide*2) * n < 0){
            }else{
                dest += "<div style = \"\
                    position: relative;\
                    margin: 0;\
                    padding: 0;\
                    padding-left: " + imgPadSide + "px;\
                    padding-right: " + imgPadSide + "px;\
                    width: " + imgWidth + "px;\
                \">";

                if(data[1] == ""){
                    data[1] = "無題";
                }

                if(true){
                const titleTextHeight = 25;/*px*/
                const titlePadBottom = 10;/*px*/
                dest += "<h4 style = '\
                    display: block;\
                    positon: relative;\
                    width: " + imgWidth + "px;\
                    height: " + titleTextHeight + "px;\
                    white-space: nowrap;\
                    font-size: " + titleTextHeight + "px;\
                    overflow: hidden;\
                    margin: 0;\
                    padding-bottom: " + titlePadBottom + "px;\
                '\
                >" + data[1] + "</h4>";
                rangeHeight += titleTextHeight + titlePadBottom;
                }

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
                        width: " + imgWidth + "px;\
                        height: " + imgHeight + "px;\
                        fontsize: 0;\
                    '><a href = '" + data[2] + "' target = '" + data[1] + "' ";
                    rangeHeight += imgHeight;
                    const No_Image_fontSize = 25;/*px*/
                    dest += "style = '\
                        display: block;\
                        position: absolute;\
                        padding-top: " + (imgHeight - No_Image_fontSize)/2 + "px;\
                        padding-bottom: " + (imgHeight - No_Image_fontSize)/2 + "px;\
                        width: " + imgWidth + "px;\
                        height: " + No_Image_fontSize + "px;\
                        font-size: " + No_Image_fontSize + "px;\
                        text-align: center;\
                        background-color: #444444;\
                        color: #FFFFFF;\
                        '\
                        onmouseover = '\
                            this.style.opacity = \"50%\";'\
                        onmouseout = '\
                            this.style.opacity = \"100%\";'\
                        '\
                        >"
                    dest += "No Image.";
                    dest += "<img src = \"" + data[2] + "\" onError = 'this.style.display = \"none\"' alt = \"この特別報のサムネイル画像\" width = '100%%' height = '100%' style = '\
                        display: block;\
                        position: absolute;\
                        top: 0;\
                        left: 0;\
                        width: " + imgWidth + "px;\
                        height: " + imgHeight + "px;\
                    '></a></div>";
                }
                if(data[0] == ""){
                }else{
                    const dateFontSize = 10;/*px*/
                    dest += "<div style = '\
                    position: relative;\
                    margin: 0;\
                    padding: 0;\
                    font-size: " + dateFontSize + "px;\
                    overflow: hidden;\
                    text-align: right;\
                    opacity: 30%;\
                    '>" + data[0] + "</div>";
                    rangeHeight += dateFontSize;
                }
                // dest += "<br><br>";
                dest += "</div>";

                for(j = 0; j < dataLength; j++){
                    data[j] = "";
                }
                iStart = i+1;
                j = 0;
                n++;
                if(ScrollX() + (imgPadSide*2 + imgWidth) * n + imgPadSide + sideScrollZoneWidth*2 > pageWidth){
                    break;
                }
            }

            if(rangeHeightMax < rangeHeight){
                rangeHeightMax = rangeHeight;
                rangeHeight = 0;
            }
        }
    }
    dest += "</div>";

    /*右へゾーン*/
    dest += "<div style = '\
        position: absolute;\
        left: " + (pageWidth - sideScrollZoneWidth) + "px;\
        top: 0;\
        width: " + sideScrollZoneWidth + "px;\
        height: inherit;\
        background-color: #333333;\
    ' id = 'rangeB_specialReport_rightRange'></div>";

    dest += "</div>";
    var cid = document.getElementById(contentIDSave);
    cid.style.height = "" + rangeHeightMax + "px";
    cid.innerHTML = dest;

    ReDraw("allRange");
    var leftZone = document.getElementById("rangeB_specialReport_leftRange");
    leftZone.addEventListener('mouseover', () => {document.getElementById("rangeB_specialReport_main_base").style.left = ScrollX(-1);DrawSpecialReport(resourceText);});
    var rightZone = document.getElementById("rangeB_specialReport_rightRange");
    rightZone.addEventListener('mouseover', () => {document.getElementById("rangeB_specialReport_main_base").style.left = ScrollX(1);DrawSpecialReport(resourceText);});
};

/*ファイル読み込ませ、Drawを呼び出させる*/
function ShowSpecialReport(){
    filePath = LINK_GITHUB("special-report.txt");
    contentID = "rangeB";
    
    //setTimeout(() => 
        GetTextByFile(filePath, null, DrawSpecialReport)
    //, 1);
    contentIDSave = contentID;
};