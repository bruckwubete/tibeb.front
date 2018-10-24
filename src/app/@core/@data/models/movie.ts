import { Actor, Director, Crew } from './person'
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
  voteAverage: number,
  voteCount: number,
  adult: Boolean,
  genres: Array<String>,
  actors: Array<Actor>,
  directors: Array<Director>,
  crews: Array<Crew>,
  images?: Array<any>,
  videos?: Array<any>,
  retired: Boolean
}
