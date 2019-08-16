const { Movie } = require("./models/movie");
const { Celeb } = require("./models/celebrity");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    title: "Airplane",
    yearOfRelease: 2010,
    plot: "Action",
    selectedItems: ["Johnny Depp", "Brad Pitt"]
  },
  {
    title: "The Hangover",
    yearOfRelease: 2010,
    plot: "Action",
    selectedItems: ["Leonardo DiCaprio", "Russell Crowe"]
  },
  {
    title: "Wedding Crashers",
    yearOfRelease: 2015,
    plot: "Action",
    selectedItems: ["Catherine Zeta-Jones", "Scarlett Johansson"]
  },

  {
    title: "Die Hard",
    yearOfRelease: 2005,
    plot: "Romance",
    selectedItems: ["Brad Pitt", "Kate Winslet"]
  },
  {
    title: "Terminator",
    yearOfRelease: 2010,
    plot: "Romance",
    selectedItems: [
      "Arnold Schwarzenegger",
      "Catherine Zeta-Jones",
      "Scarlett Johansson"
    ]
  },
  {
    title: "The Avengers",
    yearOfRelease: 2015,
    plot: "Romance",
    selectedItems: ["Brad Pitt", "Kate Winslet"]
  },

  {
    title: "The Notebook",
    yearOfRelease: 2005,
    plot: "Triller",
    selectedItems: ["Leonardo DiCaprio", "Russell Crowe"]
  },
  {
    title: "When Harry Met Sally",
    yearOfRelease: 2010,
    plot: "Triller",
    selectedItems: ["Johnny Depp", "Brad Pitt"]
  },
  {
    title: "Pretty Woman",
    yearOfRelease: 2015,
    plot: "Triller",
    selectedItems: ["Leonardo DiCaprio", "Russell Crowe"]
  },

  {
    title: "The Sixth Sense",
    yearOfRelease: 2015,
    plot: "Horror",
    selectedItems: ["Johnny Depp", "Brad Pitt"]
  },
  {
    title: "Gone Girl",
    yearOfRelease: 2010,
    plot: "Horror",
    selectedItems: ["Leonardo DiCaprio", "Johnny Depp"]
  },
  {
    title: "The Others",
    yearOfRelease: 2015,
    plot: "Horror",
    selectedItems: ["Brad Pitt", "Johnny Depp"]
  }
];

const data1 = [
  {
    name: "Johnny Depp",
    gender: "Male",
    dob: "1963-6-9",
    bio:
      "Johnny Depp is perhaps one of the most versatile actors of his day and age in Hollywood."
  },
  {
    name: "Kevin Spacey",
    gender: "Male",
    dob: "1980-10-13",
    bio:
      "Kevin Spacey Fowler, better known by his stage name Kevin Spacey, is an American actor of screen and stage, film director, producer, screenwriter and singer. He began his career as a stage actor during the 1980s before obtaining supporting roles in film and television."
  },
  {
    name: "Brad Pitt",
    gender: "Male",
    dob: "1983-9-13",
    bio:
      "An actor and producer known as much for his versatility as he is for his handsome face, Golden Globe-winner Brad Pitt's most widely recognized role may be Tyler Durden in Fight Club (1999). "
  },

  {
    name: "Russell Crowe",
    gender: "Male",
    dob: "1985-12-21",
    bio:
      "Russell Ira Crowe was born in Wellington, New Zealand, to Jocelyn Yvonne (Wemyss) and John Alexander Crowe, both of whom catered movie sets."
  },
  {
    name: "Leonardo DiCaprio",
    gender: "Male",
    dob: "1981-10-27",
    bio:
      "Few actors in the world have had a career quite as diverse as Leonardo DiCaprio's. DiCaprio has gone from relatively humble beginnings, as a supporting cast member of the sitcom Growing Pains (1985) "
  },
  {
    name: "Tom Cruise",
    gender: "Male",
    dob: "1976-10-16",
    bio:
      "In 1976, if you had told fourteen year-old Franciscan seminary student Thomas Cruise Mapother IV that one day in the not too distant future he would be Tom Cruise, one of the top 100 movie stars of all time."
  },

  {
    name: "Arnold Schwarzenegger",
    gender: "Male",
    dob: "1960-05-04",
    bio:
      "With an almost unpronounceable surname and a thick Austrian accent, who would have ever believed that a brash, quick talking bodybuilder from a small European village would become one of Hollywood's biggest stars."
  },
  {
    name: "Kate Winslet",
    gender: "Female",
    dob: "1987-10-13",
    bio:
      "Ask Kate Winslet what she likes about any of her characters, and the word ballsy is bound to pop up at least once."
  },
  {
    name: "Charlize Theron",
    gender: "Female",
    dob: "1985-06-22",
    bio:
      "Charlize Theron was born in Benoni, a city in the greater Johannesburg area, in South Africa, the only child of Gerda Theron (née Maritz"
  },

  {
    name: "Keira Knightley",
    gender: "Female",
    dob: "1992-09-21",
    bio:
      "She is the daughter of actor Will Knightley and actress turned playwright Sharman Macdonald."
  },
  {
    name: "Catherine Zeta-Jones",
    gender: "Female",
    dob: "1980-07-13",
    bio:
      "She is the daughter of Patricia (Fair) and David James Dai Jones, who formerly owned a sweet factory. Her father is of Welsh descent"
  },
  {
    name: "Scarlett Johansson",
    gender: "Female",
    dob: "1979-05-23",
    bio:
      "Scarlett Johansson was born in New York City. Her mother, Melanie Sloan, is from a Jewish family from the Bronx, and her father, Karsten Johansson, is a Danish-born architect, from Copenhagen."
  }
];

const user1 = [
  {
    name: "Admin",
    email: "admin@allmovies.com",
    password: "$2a$10$PlwzQc0tGhu1djpLR2WmM.r8xHWxARE0UfMVgO./5NwrATDpecEo2",
    isAdmin: "true"
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Celeb.deleteMany({});
  await Movie.deleteMany({});
  await User.deleteMany({});
  const movies = data.map(movie => ({
    ...movie
    //genre: { _id: genreId, name: genre.name }
  }));
  await Movie.insertMany(movies);
  const celeb = data1.map(celeb => ({
    ...celeb
    //genre: { _id: genreId, name: genre.name }
  }));
  await Celeb.insertMany(celeb);

  const user = user1.map(user => ({
    ...user
    //genre: { _id: genreId, name: genre.name }
  }));
  await User.insertMany(user);

  mongoose.disconnect();

  console.info("Done!");
}

seed();
