import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PagerService } from '../pager.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  columns: string[];
  movies: string[];
  movies_original: string[];
  movies_original_results: string[] = new Array();
  images: string[];
  genres: string[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(private atService: DataService, private pagerService: PagerService) {
    this.atService.getMovies().subscribe((result: any[]) => {
      //get the result and sort it by popularity
      for(let i=0; i<result.length; i++){
        this.movies_original_results = this.movies_original_results.concat(result[i]['results']);
      }
      let movies_res = this.movies_original_results.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1);
      this.movies_original = movies_res;
      this.movies = movies_res;
      this.setPage(1);
    });

    this.atService.getImages().subscribe((res: any[]) => {
      this.images = res;
    });

    this.atService.getGenre().subscribe((res: any[]) => {
      this.genres = res['genres'];
    });

  }

  ngOnInit() {
    this.columns = this.atService.getColumns();
    //["title", "genre", "image"]


  }

  dataChanged(selected) {
    let rating = selected.target.value;
    // let selected_movies = this.movies.sort((a, rating) => (a.vote_average > rating) ? 1 : -1);
    let selected_movies = this.movies_original.filter(movie => movie['vote_average'] >= rating);
    console.log(selected_movies);
    this.movies = selected_movies;
    this.setPage(1);
  }

  setPage(page: number) {
    // get pager object from service
    if (this.movies) {

      this.pager = this.pagerService.getPager(this.movies.length, page);
      // get current page of items
      this.pagedItems = this.movies.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  }

}
