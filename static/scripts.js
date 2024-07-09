document.addEventListener('DOMContentLoaded', function() {
    let userAnswers = [];
    let mathQuestions = []; // 保存数学题目数据

    fetch('/api/math-questions')
        .then(response => response.json())
        .then(data => {
            mathQuestions = data; // 将数学题目数据保存到全局变量中
            const fullPageElement = document.getElementById('fullpage');

            data.forEach((question, index) => {
                const sectionElement = document.createElement('div');
                sectionElement.classList.add('section');
                sectionElement.style.backgroundImage = getRandomGradient(); // 使用随机背景渐变色

                const questionElement = document.createElement('h3');
                questionElement.textContent = `问题 ${index + 1}: ${question.question}`;

                const optionsElement = document.createElement('ul');
                const labels = ['a', 'b', 'c', 'd'];
                question.options.forEach((option, i) => {
                    const optionItem = document.createElement('li');
                    optionItem.innerHTML = `<span class="option-label">${labels[i]}</span> ${option}`;
                    optionItem.dataset.questionIndex = index;
                    optionItem.dataset.optionIndex = i;
                    optionItem.addEventListener('click', selectAnswer);
                    optionsElement.appendChild(optionItem);
                });

                sectionElement.appendChild(questionElement);
                sectionElement.appendChild(optionsElement);

                fullPageElement.appendChild(sectionElement);
            });

            // 添加最后一页和提交按钮
            const lastSection = document.createElement('div');
            lastSection.classList.add('section');
            lastSection.style.backgroundImage = getRandomGradient(); // 使用随机背景渐变色

            const submitButton = document.createElement('button');
            submitButton.textContent = '提交答案';
            submitButton.addEventListener('click', showResults);

            lastSection.appendChild(submitButton);
            fullPageElement.appendChild(lastSection);

            new fullpage('#fullpage', {
                autoScrolling: true,
                navigation: true,
                navigationPosition: 'left' // 将导航点显示在左侧纵轴
            });
        })
        .catch(error => {
            console.error('Error fetching math questions:', error);
        });

    function selectAnswer(event) {
        const questionIndex = event.target.dataset.questionIndex;
        const optionIndex = event.target.dataset.optionIndex;
        userAnswers[questionIndex] = optionIndex;

        // 清除之前的选择高亮
        const options = event.target.parentElement.querySelectorAll('li');
        options.forEach(option => {
            option.classList.remove('selected');
        });

        // 高亮当前选择
        event.target.classList.add('selected');
    }

    function showResults() {
        const results = [];

        mathQuestions.forEach((question, index) => {
            const selectedOptionIndex = userAnswers[index];
            const selectedAnswer = question.options[selectedOptionIndex];
            const correctAnswer = question.answer;
            const isCorrect = selectedAnswer === correctAnswer;

            results.push({
                question: `问题 ${index + 1}: ${question.question}`,
                selectedOption: selectedAnswer,
                correctOption: correctAnswer,
                isCorrect: isCorrect
            });
        });

        displayResults(results);
    }

    function displayResults(results) {
        const fullPageElement = document.getElementById('fullpage');
    
        // 在最后一页显示结果
        const lastSection = fullPageElement.querySelector('.section:last-child');
        lastSection.innerHTML = '<h2>结果</h2>';
    
        results.forEach((result, index) => {
            const resultElement = document.createElement('p');
            resultElement.textContent = `问题 ${index + 1} - ${result.isCorrect ? '正确' : '错误'}`;
            resultElement.style.cursor = 'pointer';
            resultElement.style.color = result.isCorrect ? 'white' : 'black'; // 设置颜色
            resultElement.addEventListener('click', () => {
                fullpage_api.moveTo(index + 1); // 跳转到对应的题目页面
            });
            lastSection.appendChild(resultElement);
        });
    }
    
    function getRandomGradient() {
        const colors = [
            '#40afff', '#3f61ff', '#ff7f50', '#ff6347', '#dda0dd', '#ee82ee', 
            '#8a2be2', '#5f9ea0', '#7fff00', '#d2691e', '#ff69b4', '#cd5c5c'
        ];

        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.floor(Math.random() * 360);

        return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
});
