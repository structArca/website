document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded イベントが発生しました");

    // GitHub Pagesでホスティングされているファイルパス
    const filePath = 'https://username.github.io/repository-name/data.txt'; // 実際のURLに置き換えてください

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(text => {
            console.log("テキストを取得しました:", text);
            document.getElementById('content').textContent = text;
        })
        .catch(error => console.error('Error:', error));
});
