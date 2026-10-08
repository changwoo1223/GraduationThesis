document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // 선택된 레벨에 따라 URL을 동적으로 결정
        const selectedLevel = document.getElementById('experiment-level').value;
        const targetUrl = `/login${selectedLevel}`;
        const payload = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        axios.post(targetUrl, payload,{
            headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
            }
        })
            .then(res => {
                // 결과 출력
                const resultElement = document.getElementById('result');
                resultElement.textContent = res.data.message;
                //resultElement.textContent = JSON.stringify(res.data.data);
                if (res.data.success === true) {
                    resultElement.style.color = "green";
                } else {
                    resultElement.style.color = "red";
                };
            })

            .catch(err => {
                const resultElement = document.getElementById('result');
                resultElement.style.color = "red";
                // 서버가 정상적으로 에러 응답을 돌려준 경우 (500, 401 에러 등)
                if (err.response && err.response.data) {
                    resultElement.textContent = err.response.data;
                } else {
                    resultElement.textContent = "서버 연결 실패";
                }
            });
    });
});