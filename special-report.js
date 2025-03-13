/*special-report.txtは、最後に一行余白行が必要*/

/*横幅は1920pxとする(htmlでも同様)*/

var scrollX = 0;/*右が正*/
const scrollWidth = 3;/*px*/
var scrollWidthLimit = 0;/*DrawSpecialReportが代入*/

function ScrollX(f = 0/*進むなら1, 戻るなら-1, なにもしないなら0*/){
    scrollX += Number(f);
    if(scrollX < 0){
        scrollX = 0;
    }else if(scrollX * scrollWidth > scrollWidthLimit){
        scrollX -= Number(f);
    }
    return scrollX * scrollWidth;
}


var contentIDSave = null;

var intervalScrollID = new Array(2).fill(null);

function IntervalScroll(lr/*'l'または'r'を渡す*/, method, fReset = false)
{
    var index;
    switch(lr){
        case 'main_L':
            index = 0;
            break;
        case 'main_R':
            index = 1;
            break;
        default:
            MSG_ERROR("spacial-report.js", "intervalScroll", "switch-default");
            break;
    }

    if(fReset){
        clearInterval(intervalScrollID[index]);
        intervalScrollID[index] = null;
    }else{
        if(intervalScrollID[index] == null){
            intervalScrollID[index] = setInterval(method, 1);
        }
    }

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

    let dataLength = 5;
    let data = Array(dataLength);
    for(j = 0; j < dataLength; j++){
        data[j] = "";
    }
    /*
    0 : 更新日時
    1 : タイトル
    2 : 詳細
    3 : リンク
    4 : サムネイル
    */

    /*単位はpx*/
    const pageWidth = document.documentElement.clientWidth;
    const imgWidth = 300;
    const imgHeight = imgWidth * 3 / 4;
    const imgPadSide = 30;
    const sideScrollZoneWidth = 100;
    var rangeHeight = 0;/*特別報全体の高さ*/
    var rangeHeightMax = 0;/*特別報全体の高さ(最も大きかったものを保存、設定)*/
    /*特別報記事一覧本体の左右端*/
    const mainRightPos = pageWidth - sideScrollZoneWidth;

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
        overflow: hidden;\
        white-space: nowrap;\
    ' id = 'rangeB_specialReport_main'>";
    /*全体のスクロールを制御するためだけの要素*/
    dest += "<div style = '\
        position: absolute;\
        left: " + -ScrollX() + "px;\
        width: 50px;\
        height: inherit;\
        background-color: rgba(0, 0, 0, 0);\
    ' id = 'rangeB_specialReport_main_base'></div>";

    var showItemNumberFirst = -1;/*新しい方から数えての値*/
    var showItemNumberLast = -1;/*新しい方から数えての値*/

    var itemLeftPos = 0;
    var itemRightPos = 0;
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
            itemLeftPos = -ScrollX() + (imgWidth + imgPadSide*2) * (n);
            itemRightPos = -ScrollX() + (imgWidth + imgPadSide*2) * (n+1);

            scrollWidthLimit = (imgWidth + imgPadSide*2) * (n+1) - (pageWidth - sideScrollZoneWidth*2);

            if(itemRightPos < 0){
                /*左にあり、右端が見えない場合、定義しない*/
            }else if(mainRightPos <= itemLeftPos){
                /*右にあり、左端が見えない場合、それ以降も含め定義しない*/
                break;
            }else{
                if(showItemNumberFirst < 0){
                    showItemNumberFirst = n;
                }
                showItemNumberLast = n;

                /*記事全体のdiv*/
                dest += "<div style = \"\
                    position: absolute;\
                    margin: 0;\
                    padding: 0;\
                    padding-left: " + imgPadSide + "px;\
                    padding-right: " + imgPadSide + "px;\
                    width: " + imgWidth + "px;\
                    left: " + itemLeftPos + "px;\
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

                if(data[2] == ""){
                }else{
                    dest += "<p>" + data[2] + "</p>";
                }
                if(data[3] == "" && data[4] == ""){
                }else{
                    dest += "<div style = '\
                        position: relative;\
                        margin: 0;\
                        padding: 0;\
                        width: " + imgWidth + "px;\
                        height: " + imgHeight + "px;\
                        fontsize: 0;\
                    '><a href = '" + (data[3] == "" ? "#" : data[3]) + "' target = '" + data[1] + "' ";
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
                        >";
                    dest += "No Image.";
                    if(data[1] != ""){
                        dest += "<img src = \"" + data[4] + "\" onError = 'this.style.display = \"none\";' alt = \"\" width = '100%%' height = '100%' style = '\
                            display: block;\
                            position: absolute;\
                            top: 0;\
                            left: 0;\
                            width: " + imgWidth + "px;\
                            height: " + imgHeight + "px;\
                        '>";
                    }
                    dest += "</a></div>";
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
                const itemPadBottom = 10;/*px*/
                    rangeHeight += itemPadBottom;
                    // dest += "<br><br>";
                dest += "</div>";

                for(j = 0; j < dataLength; j++){
                    data[j] = "";
                }
                
                if(rangeHeightMax < rangeHeight){
                    rangeHeightMax = rangeHeight;
                    /*現在、全て280のはず*/
                }
                rangeHeight = 0;
            }

            iStart = i+1;
            j = 0;
            n++;
        }
    }
    dest += "</div>";

    /*右へゾーン*/
    dest += "<div style = '\
        position: absolute;\
        left: " + mainRightPos + "px;\
        top: 0;\
        width: " + sideScrollZoneWidth + "px;\
        height: inherit;\
        background-color: #333333;\
    ' id = 'rangeB_specialReport_rightRange'></div>";

    dest += "</div>";
    const showItemNumberHeight = 10;/*px*/
    dest += "<div style = '\
        position: absolute;\
        left: 0;\
        top: " + rangeHeightMax + "px;\
        width: " + pageWidth + "px;\
        height: " + showItemNumberHeight + "px;\
        '>\
        (" + showItemNumberFirst + " ~ " + showItemNumberLast + "件目)\
    </div>";

    var cid = document.getElementById(contentIDSave);
    cid.style.height = "" + rangeHeightMax + "px";
    cid.innerHTML = dest;

    ReDraw("allRange");
    var mouseupEvent = new Event('mouseup');
    var leftZone = document.getElementById("rangeB_specialReport_leftRange");
    var rightZone = document.getElementById("rangeB_specialReport_rightRange");

    rightZone.addEventListener('mousedown', () => {IntervalScroll('main_R', () => {leftZone.dispatchEvent(mouseupEvent);ScrollX(1);DrawSpecialReport(resourceText);})});
    rightZone.addEventListener('mouseout', () => {IntervalScroll('main_R', () => {ScrollX();DrawSpecialReport(resourceText);}, true)});
    rightZone.addEventListener('mouseup', () => {IntervalScroll('main_R', () => {ScrollX();DrawSpecialReport(resourceText);}, true)});

    leftZone.addEventListener('mousedown', () => {IntervalScroll('main_L', () => {rightZone.dispatchEvent(mouseupEvent);ScrollX(-1);DrawSpecialReport(resourceText);});});
    leftZone.addEventListener('mouseout', () => {IntervalScroll('main_L', () => {ScrollX();DrawSpecialReport(resourceText);}, true);});
    leftZone.addEventListener('mouseup', () => {IntervalScroll('main_L', () => {ScrollX();DrawSpecialReport(resourceText);}, true);});
    
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