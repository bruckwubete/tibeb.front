import { Actor } from './actor'

export interface RegisterMoviePayload extends Movie {

}

export interface Movie {
  id ?: String,
  budget: Number,
  homepage: String,
  overview: String,
  popularity: Number,
  releaseDate: Date,
  runtime: Number,
  status: String,
  title: String,
  voteAverage: Number,
  voteCount: Number,
  adult: Boolean,
  genres: Array<String>,
  actors: Array<Actor>,
  images?: Array<any>,
  videos?: Array<any>,
  retired: Boolean
}
