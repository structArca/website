document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded イベントが発生しました");
    // テキストファイルのパス
    const filePath = 'https://structarca.github.io/website/data.txt';

    // Fetch APIを使用してテキストファイルを読み込む
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            // テキストファイルの内容を表示する
            document.getElementById('content').textContent = text;
        })
        .catch(error => console.error('Error:', error));
});
