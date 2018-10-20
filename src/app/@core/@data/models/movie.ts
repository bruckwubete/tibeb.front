import { Actor } from './actor'
import { Data } from './data'

export interface RegisterMoviePayload extends Movie {

}

export interface Movie extends Data {
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
