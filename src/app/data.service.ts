import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  movieUrl: string = "https://api.themoviedb.org/3/movie/now_playing?api_key=41f40e3a6de356d65259ad78f1e3f390";
  imageUrl: string = "https://api.themoviedb.org/3/configuration?api_key=41f40e3a6de356d65259ad78f1e3f390";
  genreUrl: string = "https://api.themoviedb.org/3/genre/movie/list?api_key=41f40e3a6de356d65259ad78f1e3f390&language=en-US";

  pages: number[] = new Array(50).fill().map((v, i) => i + 1);

  constructor(private httpClient: HttpClient) { }


  getMovies() {
    // return this.httpClient.get(this.movieUrl);
    return Observable.forkJoin(
      this.pages.map(
        i => this.httpClient.get(this.movieUrl + '&page=' + i)
      )
    );
  }
  getImages() {
    return this.httpClient.get(this.imageUrl);
  }

  getColumns(): string[] {
    return ["title", "genre", "image"];
  }

  getGenre(){
    return this.httpClient.get(this.genreUrl);
  }

}
