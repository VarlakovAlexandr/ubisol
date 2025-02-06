document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное отправление формы
  
    // Получаем данные формы
    const formData = new FormData(event.target);
  
    // Отправляем данные с помощью fetch
    fetch('/submit-form', {
      method: 'POST',
      body: formData // Передаем FormData напрямую
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.text(); // Предполагаем, что сервер вернет текстовый ответ
    })
    .then(data => {
      console.log('Успех:', data);
      alert('Форма успешно отправлена!');
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы');
    });
  });
  