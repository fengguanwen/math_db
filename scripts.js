document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/math-questions')
        .then(response => response.json())
        .then(data => {
            const fullPageElement = document.getElementById('fullpage');

            data.forEach((question, index) => {
                const sectionElement = document.createElement('div');
                sectionElement.classList.add('section');

                const questionElement = document.createElement('h3');
                questionElement.textContent = `Question ${index + 1}: ${question.question}`;

                const optionsElement = document.createElement('ul');
                question.options.forEach(option => {
                    const optionItem = document.createElement('li');
                    optionItem.textContent = option;
                    optionsElement.appendChild(optionItem);
                });

                sectionElement.appendChild(questionElement);
                sectionElement.appendChild(optionsElement);
                fullPageElement.appendChild(sectionElement);
            });

            new fullpage('#fullpage', {
                autoScrolling: true
            });
        })
        .catch(error => {
            console.error('Error fetching math questions:', error);
        });
});
