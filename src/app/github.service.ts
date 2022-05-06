import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Repo {
  id: number;
  full_name: string;
}

@Injectable()
export class GithubService {
  repos: Array<Repo> = [];

  constructor(private http: HttpClient) {}
}
