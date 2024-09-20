document.addEventListener('DOMContentLoaded', function () {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const tableBody = document.querySelector('#bookTable tbody');
    const searchInput = document.getElementById('search');

    // Função para renderizar a tabela
    function renderTable(booksList) {
        tableBody.innerHTML = '';
        booksList.forEach((book, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="editable" contenteditable="false">${book.author}</td>
                <td class="editable" contenteditable="false">${book.title}</td>
                <td class="editable" contenteditable="false">${book.year}</td>
                <td>
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="save" data-index="${index}" style="display:none;">Salvar</button>
                    <button class="delete" data-index="${index}">Excluir</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    renderTable(books);

    // Busca por título, autor ou ano
    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.author.toLowerCase().includes(searchValue) ||
            book.title.toLowerCase().includes(searchValue) ||
            book.year.includes(searchValue)
        );
        renderTable(filteredBooks);
    });

    // Manipulação dos eventos de clique na tabela
    tableBody.addEventListener('click', function (event) {
        const index = event.target.getAttribute('data-index');
        const row = event.target.closest('tr');

        // Tornar as células editáveis quando clicar em "Editar"
        if (event.target.classList.contains('edit')) {
            const editableCells = row.querySelectorAll('.editable');
            editableCells.forEach(cell => cell.contentEditable = 'true');

            event.target.style.display = 'none'; // Esconde o botão Editar
            row.querySelector('.save').style.display = 'inline'; // Mostra o botão Salvar
        }

        // Salvar as edições feitas pelo usuário
        if (event.target.classList.contains('save')) {
            const editableCells = row.querySelectorAll('.editable');
            books[index] = {
                author: editableCells[0].textContent,
                title: editableCells[1].textContent,
                year: editableCells[2].textContent
            };
            localStorage.setItem('books', JSON.stringify(books));

            editableCells.forEach(cell => cell.contentEditable = 'false');

            event.target.style.display = 'none'; // Esconde o botão Salvar
            row.querySelector('.edit').style.display = 'inline'; // Mostra o botão Editar

            alert('Livro atualizado com sucesso!');
        }

        // Excluir livro
        if (event.target.classList.contains('delete')) {
            books.splice(index, 1);
            localStorage.setItem('books', JSON.stringify(books));
            renderTable(books);
        }
    });
});
