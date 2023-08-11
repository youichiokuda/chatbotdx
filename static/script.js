function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
    
    chatBox.innerHTML += `<div>ユーザー: ${userInput}</div>`;
    
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_input: userInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ネットワークの応答が正しくありません');
        }
        return response.json();
    })
    .then(data => {
        chatBox.innerHTML += `<div>ボット: ${data.reply}</div>`;
    })
    .catch(error => {
        console.error('フェッチ操作に問題がありました:', error.message);
        chatBox.innerHTML += `<div>ボット: 申し訳ございません、リクエストの処理中にエラーが発生しました。</div>`;
    });
    
    document.getElementById('user-input').value = '';
}
