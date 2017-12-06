// Listen for submit event
document.getElementById('myform').addEventListener('submit', saveBookmark);

// Function to save bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;


    // Validation of form
    if (!validateForm(siteUrl, siteName)){
        return false;
    }


    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    // Add values to local storage
    if(localStorage.getItem('bookmarks') === null){
        //initaite bookmark array
        var bookmarks = [];
        // Add values to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add values to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Reset and clear form
    document.getElementById('myform').reset();


    // Refetch Bookmarks
    fetchbookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Function to delete bookmark
function deleteBookmark(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Refetch Bookmarks
    fetchbookmarks();
}

// Function to validate form
function validateForm(siteUrl, siteName){
    // Validation of form
    if (!siteName || !siteUrl) {
        alert('Please Enter website name and website url');
        return false;
    }

    // URL validation
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please enter valid URL address');
        return false;
    }
    return true;
}

// Function to display bookmarks in localStorage
// Function initiated once html body loads

function fetchbookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get div to output results of bookmarks
    var bookmarkResults = document.getElementById('bookmarkResults');
    // Build output
    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarkResults.innerHTML += '<div class="mybookmark"><div class="row"><div class="col-8 bg-secondary"><h4>' + name + '</h4></div><div class="col-4"><a class="visit btn btn-outline-primary d-inline-block" target="_blank" href="' + url + '">Visit</a><a class="deletebookmark btn btn-default d-inline-block" onclick="deleteBookmark(\'' + url + '\')" href="#"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a></div></div></div>';
    }
}
