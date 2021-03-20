import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  onSearchClick() {
    this.router.navigate([`/profile/${this.username}`])
  }
}
