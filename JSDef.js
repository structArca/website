
/*リンク*/
function LINK_GITHUB(link){
    return "https://structarca.github.io/website/" + link;
};

/*エラーテキスト変換*/
function MSG_ERROR(file = "", func = "", line = ""){
    return "処理失敗(開発者エラー)[" + file + " / " + func + " / " +  line + "]";
};

/*ヘッダ*/
function htmlDefHaeder(){
    alert('\
        <meta charset = "UTF-8">\
        <meta \
            name = "description" content = "Arca::ホームページ",\
            name = "author", content = "struct Arca",\
            name = "keywords", content = "Arca,structArca,Arca構造体"\
        ></meta>\
        <link \
            rel = "icon" href = "' + LINK_GITHUB("common/icon.png") + ' sizes = "1080x1080" type = "image/png">\
    ');
};

/*フッタ*/
function htmlDefFooter(){
    document.write('\
        <footer><small style = "\
        position: relative;\
        top: 15vh;\
        bottom: 5vh;\
        ">\
    ');
    document.write("最終更新 : ");
    ShowDate(document.lastModified);
    document.write("<br>\nCopyright © 2025 struct Arca All rights reserved.");
    document.write("<br>\n作品番号 : 20250302a");
    document.write('\
        </small></footer>\
    ');
};

/*0左詰め*/
function Left0(digit, n, spaceChar/*詰め文字*/ = 0){
    const nStr = new String(n);
    var space = "";
    if(digit > nStr.length){
        for(i = 0; i < digit - nStr.length; i++){
            space += spaceChar;
        }
    }
    return space + nStr;
};

/*Dateを年月日表記へ*/
function DateToString(_d){
    var d = new Date(_d);
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return ((1900+d.getYear()) + "年 " +  Left0(2, 1+d.getMonth()) + "月 " + Left0(2, d.getDate()) + "日 (" + days[d.getDay()] + ") " + Left0(2, d.getHours()) + ":" + Left0(2, d.getMinutes()));
};

function ShowDate(_d){
    document.write(DateToString(_d));
};

/*外部リンク*/
function ShowLinks(){
    const links = [
        "ニコニコ動画", "https://www.nicovideo.jp/user/124335584",
        "github", "https://github.com/structArca"
    ];

    document.write("<h3>外部リンク</h3><br><ul>");

    for(i = 0; i < links.length; i+=2){
        document.write("<li>" + links[i] + " : <a href = \"" + links[i+1] + "\" target = \"" + links[i] + "\">" + links[i+1] + "</a><br></li>\n");
    }
};

/*外部ファイル取得(テキスト状態で)*/
function GetTextByFile(filePath, contentID, callFunc = null){
    var xmlHR = new XMLHttpRequest();
    xmlHR.open("GET", filePath, true);
    xmlHR.onreadystatechange = function (){
        if(xmlHR.readyState === 4){
            if(xmlHR.status === 200){
                if(contentID != null){
                    document.getElementById(contentID).innerText = xmlHR.responseText;
                }else if(callFunc != null){
                    callFunc(xmlHR.responseText);
                }else{
                    document.write(MSG_ERROR("JSDef.js", "GetTextByFile"));
                }
            }else{
                passArgu = "読み込みに失敗しました。";
            }
        }
    };
    xmlHR.send();
};

/*外部ファイル取得(htmlからcontentIDへ)*/
function ShowFile(filePath, contentID){
    document.getElementById(contentID).innerText = "読み込み中です...";
    this.GetTextByFile(filePath, contentID);
};