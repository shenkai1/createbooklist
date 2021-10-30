// create a reference to the model
let Book = require('../models/book');


// async function insertBookData(){
//     try {
//         await Book.insertMany([
//             {
//                 "Title": "Eloquent JavaScript, Third Edition",
//                 "Description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
//                 "Price": "12.50",
//                 "Author": "Marijn Haverbeke",
//                 "Genre":"JavaScript"
//             },
//             {
//                 "Title": "Practical Modern JavaScript",
//                 "Description": "To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
//                 "Price": "15.20",
//                 "Author": "JNicolás Bevacqua",
//                 "Genre":"JavaScript"
//             },
//             {
//                 "Title": "Understanding ECMAScript 6",
//                 "Description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
//                 "Price": "10.00",
//                 "Author": "Nicholas C. Zakas",
//                 "Genre":"ECMAScript"
//             },
//             {
//                 "Title": "Speaking JavaScript",
//                 "Description": "Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
//                 "Price": "9.80",
//                 "Author": "Axel Rauschmayer",
//                 "Genre":"JavaScript"
//             }
//             ]);
//     } catch (error) {
//         console.log('err：'+ error);
//     }
// }

// insertBookData();




// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function(req, res, next) {  
    Book.find((err, bookList) => {
        // console.log(bookList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {
                title: 'Book List', 
                books: bookList
            })            
        }
    });
}

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/details', {
                title: 'Book Details', 
                book: bookToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    let newBook = Book();

    res.render('book/add_edit', {
        title: 'Add a new Book',
        book: newBook
    })          
}

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {

    let newBook = Book({
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre : req.body.Genre
    });

    Book.create(newBook, (err, book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(book);
            res.redirect('/book/list');
        }
    });
}

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/add_edit', {
                title: 'Edit Book', 
                book: bookToEdit
            })
        }
    });
}

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {

        let id = req.params.id

        let updatedItem = Book({
            _id :id,
            Title: req.body.Title,
            Description: req.body.Description,
            Price: req.body.Price,
            Author: req.body.Author,
            Genre : req.body.Genre
        });
    
        Book.updateOne({_id: id}, updatedItem, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // console.log(req.body);
                // refresh the book list
                res.redirect('/book/list');
            }
        });
}

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
    
    let id = req.params.id;


    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book/list');
        }
    });
}