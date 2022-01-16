{ 'use strict';
  
  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },
    menuBooks: '.books-list',
    imageBooks: '.book__image',
    idBooks: 'data-id',
    formFilters: '.filters',
    ratingBooks: '.book__rating__fill',
  };

  const classNames = {
    choiceFavorite: 'favorite',
    imageBook: 'book__image',
    hiddenBook: 'hidden',
  };

  const templates = Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML);

  const renderMenu = function(){
    for(let book of dataSource.books){
      console.log(book);

      /* generate HTML */
      const generatedHTML = templates(book);
      // console.log(generatedHTML);

      /* create element DOM */
      const createDOM = utils.createDOMFromHTML(generatedHTML);
      // console.log(createDOM);

      /* find rating container */
      const ratingContainer = createDOM.querySelector(select.ratingBooks);

      /* check rating and add right background style */
      if(book.rating < 6){
        ratingContainer.style.background = "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
      }else if(book.rating > 6 && book.rating <= 8){
        ratingContainer.style.background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
      }else if(book.rating > 8 && book.rating <= 9){
        ratingContainer.style.background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
      }else if(book.rating > 9){
        ratingContainer.style.background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
      }

      /* add  background width dependet on rating */
      ratingContainer.style.width = book.rating * 10 +"%";

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
    
    /* add listener on filter form */
    form.addEventListener('click', function(event){
      console.log(event.target.checked);

      const formElement = event.target;

      /* check if you clicked on checkbox */
      if(formElement.name == 'filter' && formElement.nodeName == 'INPUT' && formElement.type == 'checkbox'){
        console.log(formElement.value);

        /* YES - check if its checked */
        if(formElement.checked){
          /* YES - add its value to array */
          filters.push(formElement.value);
        }else{
          /* NO - check its index in array  */
          const indexOfElement = filters.indexOf(formElement.value);

          /* remove from array */
          filters.splice(indexOfElement, 1);
        }
      }
      filterBooks();
    });
  };

  /* create empty array */
  const filters = [];

  /* find form on the page */
  const form = document.querySelector(select.formFilters);

  const filterBooks = function(){

    /* for each book */
    for(let book of dataSource.books){
      /* create variable with default value  */
      let shouldBeHidden = false;

      /* for each filter in array */
      for(let filter of filters){
        // console.log(book.details[filter]);

        if(book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      /* find right book */
      const itemBook = document.querySelector('.book__image[data-id ="' + book.id + '"]');

      if(shouldBeHidden == true){
        itemBook.classList.add(classNames.hiddenBook);
      }else{
        itemBook.classList.remove(classNames.hiddenBook);
      }
    }
  };

  
    
  

  renderMenu();
  initActions();
  
}  