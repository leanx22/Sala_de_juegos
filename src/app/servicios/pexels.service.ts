import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
    private http = inject(HttpClient);

    constructor() { }

    public searchImage(search: string): Observable<any>
    {
        const obs = this.http.get("https://api.pexels.com/v1/search?query="+search+"&per_page=1&orientation=landscape", {
            headers: {
                Authorization: environment.imageAPIkey,
            },
        });
        return obs;
    }
}
