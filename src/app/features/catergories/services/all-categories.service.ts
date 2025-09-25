import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService implements OnInit {
  private readonly httpClient = inject(HttpClient)

  ngOnInit(): void {
    this.allCategories()
  }


  allCategories(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories?page=${pageNumber}`)
  }

  spacificCategory(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories/${id}`)
  }
}
