# PT. Eigen Trimathema Test Case

## ALGORITHM

There are 4 questions about algorithms.
1. Make a reverse alphabet, but not the number of the string "NEGIE1". Result: "EIGEN1"
2. Given a sentence, find the longest word in the sentence. If there are two words, just choose one of them.
   
   Example:

   ```
   const sentence = "Saya sangat senang mengerjakan soal algoritma"

   longest(sentence)
   // mengerjakan: 11 character
   ```

3. There are two arrays: INPUT and QUERY. Find how many QUERY words are in the INPUT array.
   
   Example:

   ```
   INPUT = ['xc', 'dz', 'bbb', 'dz']
   QUERY = ['bbb', 'ac', 'dz']

   OUTPUT = [1, 0, 2]
   ```

4. Find the substract result from the diagonal addition of a matrix NxN.
   
   Example:

   ```
   Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

   first diagonal = 1 + 5 + 9 = 15
   second diagonal = 0 + 5 + 7 = 12

   Result = 15 - 12 = 3
   ```

## BACKEND TEST CASE

### TOOLS

- Programming language: JavaScript
- Frameworks: Express.js
- ORM: Prisma
- Database: PostgreSQL using Supabase

### ❗DISCLAIMER❗

Because I use free Supabase, sometimes it errors and must be hit some times.

### ENTITIES

- Book
- Member

### USE CASE

- Members can borrow books with conditions
  - Members may not borrow more than 2 books
  - Borrowed books are not borrowed by other members
  - Member is currently not being penalized

- Member returns the book with conditions
  - The returned book is a book that the member has borrowed
  - If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days

- Check the book
  - Shows all existing books and quantities
  - Books that are being borrowed are not counted

- Member check
  - Shows all existing members
  - The number of books being borrowed by each member

### MOCK DATA

- Books
  
  ```
  [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
  ]
  ```

- Members
  
  ```
  [
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
  ]
  ```

### DOCUMENTATION

I am using Swager to document my API. Before you use the Swagger, you need to clone this repository, change the directory to `Backend_Test_Case` and run it using `npm run dev` in CLI.

[Try API using Swagger](http://localhost:3000/api-docs/)