document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded �C�x���g���������܂���");
    // �e�L�X�g�t�@�C���̃p�X
    const filePath = 'https://structarca.github.io/website/data.txt';

    // Fetch API���g�p���ăe�L�X�g�t�@�C����ǂݍ���
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            // �e�L�X�g�t�@�C���̓��e��\������
            document.getElementById('content').textContent = text;
        })
        .catch(error => console.error('Error:', error));
});
