Book lover's club is a blog for book for bookwarm people. It aims to empower people to share their passion of reading, connect with fellow bibliophiles and explore new horizons.

It has the following functionalities:

1. Not logged in:

A person who does not have a profile in the blog can access the following pages: 

    *Home, 
    *About, 
    *Contac, 
    *All books - here, they can see a list of all added books,
    *Register - to register a profile within the blog, 
    *Login, 
    *Book Details, where complete information about the clicked book is visible,

2. Logged in.

A logged in user can access the following pages:

    *Home, 
    *About, 
    *Contact,
    *All books,
    *Add book - a logged in person can add their book to the list of books.
    *Book details, which provides the creator of the book to edit and delete their book entry,
    *Edit - allows the author to edit the book details.
    *Delete - allows the author to delete the book from their added books.
    *Profile - each person who has a profile within the blog has a personalized profile that shows their details and provides a list of their added books and their liked books. 
    *Likes - a logged in user can like other creator's added books.


Project architecture:

The book lover's club blog has the following architecture:

There are 2 custom modules:
    1. Books - holds the books components:
        *Books-list,
        *Book-details,
        *Add-book,
        *Edit-book,
        *Delete-book

    2. User - holds the user components:
        *Login,
        *Register,
        *Logout,
        *User profile

Outside of these modules, there are several separate components:
    1. About, 
    2. Contact,
    3. Home, 
    4. Navigation,
    5. 404

Services are added within the components, whereever appropriate. 

Book lover's club provides a unique perspective over the passion for reading. Join book lover's today to discover new inspirations!