document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let author = document.getElementById('author').value;
    let title = document.getElementById('title').value;
    let year = document.getElementById('year').value;

    let book = {
        author: author,
        title: title,
        year: year
    };

    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

    alert('Livro cadastrado com sucesso!');
    document.getElementById('bookForm').reset();
});
