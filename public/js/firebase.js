const auth = firebase.auth(),
    database = firebase.database(),
    storage = firebase.storage();

function addToFavorite(kinopoisk_id) {
    // database.ref(`favoriteMovies/${auth.currentUser.uid}/${kinopoisk_id}`).on({
    //
    // })
    database.ref(`favoriteMovies/GMJTG7eGfkh6dTjfKCyVF7lLfpw2/${kinopoisk_id}`).set({
        movie_id: kinopoisk_id
    })
}

function addComment(message, movie_id) {
    database.ref(`comments/${movie_id}`).set({
        author: auth.currentUser.uid,
        message: message,
        time: new Date()
    })
}

function getCommentsCount(movie_id) {
    let result = 0
    database.ref(`comments/${movie_id}`).on(function (snapshot) {
        console.log(snapshot)
    })
    return result
}
