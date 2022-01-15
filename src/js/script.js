{ 'use strict';
  
  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },
    menuBooks: '.books-list',
    imageBooks: '.book__image',
    idBooks: 'data-id',
  };

  const classNames = {
    choiceFavorite: 'favorite',
    imageBook: 'book__image',
  };

  const templates = Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML);

  const renderMenu = function(){
    for(let book of dataSource.books){
      // console.log(book);

      /* generate HTML */
      const generatedHTML = templates(book);
      // console.log(generatedHTML);

      /* create element DOM */
      const createDOM = utils.createDOMFromHTML(generatedHTML);
      // console.log(createDOM);

      /* find books container */
      const booksContainer = document.querySelector(select.menuBooks);

      /* add element to page */
      booksContainer.appendChild(createDOM);
    }
  };

  const initActions = function(){
    /* create empty array */
    const favoriteBooks = [];

    /* find books list */
    const booksList = document.querySelector(select.menuBooks);
    // console.log(booksList);

    /* add listener on books list */
    booksList.addEventListener('dblclick', function(event){
      // console.log(event.target);
  
      /* find parent of image */
      const parent = event.target.offsetParent;
      // console.log(parent);

      /* check if parent of image contain class */
      if(parent.classList.contains(classNames.imageBook)){

        /* find id of book element */
        const dataId = parent.getAttribute(select.idBooks);
        // console.log('data-Id:', dataId);

        /* check if clicked element exist in array favoriteBooks */
        if(favoriteBooks.includes(dataId)){
          /* YES - remove class favorite for clicked element */
          parent.classList.remove(classNames.choiceFavorite);

          /* remove id of book element from array */
          const indexBook = favoriteBooks.indexOf(dataId);
          
          favoriteBooks.splice(indexBook, 1);
        }else{
        /* NO - add class favorite for clicked element */
          parent.classList.add(classNames.choiceFavorite);

          /* add book id to array */
          favoriteBooks.push(dataId);
        }
        // console.log(favoriteBooks); 
      }
    });
    
    form.addEventListener('click', function(event){
      console.log(event.target.checked);

      const formElement = event.target;

      if(formElement.name == 'filter' && formElement.nodeName == 'INPUT' && formElement.type == 'checkbox'){
        console.log(formElement.value);

        if(formElement.checked){
          filters.push(formElement.value);
        }else{
          const indexOfElement = filters.indexOf(formElement.value);

          filters.splice(indexOfElement, 1);
        }
      }
      console.log(filters);
    });
  };


  const filters = [];

  const form = document.querySelector('.filters');

  
    
  

  renderMenu();
  initActions();
  
}  