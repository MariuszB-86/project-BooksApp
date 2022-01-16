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

  class BooksList {
    constructor(){
      const thisBook = this;
      
      thisBook.initData();
      thisBook.getElements();
      thisBook.renderMenu();
      thisBook.initActions();
    }

    initData(){
      const thisBook = this;

      thisBook.data = dataSource.books;
    }

    getElements(){
      const thisBook = this;

      thisBook.dom = {};

      thisBook.dom.form = document.querySelector(select.formFilters);
      thisBook.dom.booksList = document.querySelector(select.menuBooks);
    }

    renderMenu(){
      const thisBook = this;
      // console.log(thisBook);

      for(let book of thisBook.data){
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
          ratingContainer.style.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        }else if(book.rating > 6 && book.rating <= 8){
          ratingContainer.style.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        }else if(book.rating > 8 && book.rating <= 9){
          ratingContainer.style.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        }else if(book.rating > 9){
          ratingContainer.style.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }

        /* add  background width dependet on rating */
        ratingContainer.style.width = book.rating * 10 +'%';

        /* find books container */
        const booksContainer = document.querySelector(select.menuBooks);

        /* add element to page */
        booksContainer.appendChild(createDOM);
      }
    }

    initActions(){
      const thisBook = this;
      console.log(thisBook.dom);
      
      /* create empty array */
      const favoriteBooks = [];

      /* add listener on books list */
      thisBook.dom.booksList.addEventListener('dblclick', function(event){
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
    
      /* create empty array */
      const filters = [];

      /* add listener on filter form */
      thisBook.dom.form.addEventListener('click', function(event){
        console.log(event.target.checked);
        
        const formElement = event.target;
        console.log(event.target);

        /* check if you clicked on checkbox */
        if(formElement.name == 'filter' && formElement.nodeName == 'INPUT' && formElement.type == 'checkbox'){
          console.log(formElement.value);

          /* YES - check if its checked */
          if(formElement.checked){
            /* YES - add its value to array */
            filters.push(formElement.value);
          }else{
            /* NO - check its index in array  */
            const indexOfElement =  filters.indexOf(formElement.value);

            /* remove from array */
            filters.splice(indexOfElement, 1);
          }
        }
        console.log(filters);
        thisBook.filterBooks(filters);
      });
    }

    filterBooks(array){
      const thisBook = this;
      
      /* for each book */
      for(let book of thisBook.data){
        /* create variable with default value  */
        let shouldBeHidden = false;

        /* for each filter in array */
        for(let filter of array){
          // console.log(book.details[filter]);

          if(book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        /* find right book */
        const itemBook = document.querySelector('.book__image[data-id ="' + book.id + '"]');
        console.log(itemBook);

        if(shouldBeHidden == true){
          itemBook.classList.add(classNames.hiddenBook);
        }else{
          itemBook.classList.remove(classNames.hiddenBook);
        }
      }
    }
  }

  const app = new BooksList();
  console.log(app);
}  