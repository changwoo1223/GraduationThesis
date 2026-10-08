// public/js/register.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedLevel = document.getElementById('experiment-level').value;
        const targetUrl = `/register${selectedLevel}`;
        const payload = {
            username: document.getElementById('reg-username').value,
            password: document.getElementById('reg-password').value,
            email: document.getElementById('reg-email').value
        };

        axios.post(targetUrl, payload, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })
        .then(res => {
            // 결과 출력
            const resultElement = document.getElementById('reg-result');
            resultElement.textContent = res.data.message;
            if (res.data.success === true) {
                resultElement.style.color = "green";
            } else {
                resultElement.style.color = "red";
            };
        })
        .catch(err => {
            const resultElement = document.getElementById('reg-result');
            // 서버가 정상적으로 에러 응답을 돌려준 경우 (500, 400 에러 등)
            if (err.response && err.response.data) {
                if (typeof err.response.data === 'object') {
                    resultElement.textContent = err.response.data.message;
                } else {
                    resultElement.textContent = err.response.data;
                }
                resultElement.style.color = "red";
            } else {
                resultElement.textContent = "서버 연결 실패.";
                resultElement.style.color = "red";
            }
        });
    });
});