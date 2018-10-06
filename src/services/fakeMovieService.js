const movies = [
  {
    _id: "54d4s544sa4d6545",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbcc471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 3.5,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: true
  },
  {
    _id: "54d4dhdhe8767865",
    title: "Mid night in Paris",
    genre: { _id: "5b21ca3eeb7f6fbcc471818", name: "Action" },
    numberInStock: 15,
    dailyRentalRate: 6.5,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "54jhjhkjh8986545",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbcc471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 1.7,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "76876dddd67d545",
    title: "The Faults in our stars",
    genre: { _id: "5b21ca3eeb7f6fbcc471814", name: "Comedy" },
    numberInStock: 9,
    dailyRentalRate: 2.4,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "678ddewdwd7878678",
    title: "What's happend to monday?",
    genre: { _id: "5b21ca3eeb7f6fbcc471820", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 7.4,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "09898ckjkhkjhhhh",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbcc471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 3.9,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "b8799965fddgfddd",
    title: "the cerious case of bingamen-paten",
    genre: { _id: "5b21ca3eeb7f6fbcc471814", name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 7.5,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "hf5sdfde8dqewdfd",
    title: "Avatar",
    genre: { _id: "5b21ca3eeb7f6fbcc471814", name: "Comedy" },
    numberInStock: 8,
    dailyRentalRate: 4.3,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  },
  {
    _id: "nkhkjk76655576",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbcc471814", name: "Comedy" },
    numberInStock: 9,
    dailyRentalRate: 8.4,
    publishDate: "2801-04-03T119:04:28.908z",
    liked: false
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(movie => movie._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = movie.genre;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }
  return movieInDb;
}
