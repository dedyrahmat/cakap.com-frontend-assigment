import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string
  profile: any
  repos: []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username')
    this.profileService.fetchGithubProfile(username).subscribe((profile: any) => {
      this.profile = profile
    })
    this.profileService.fetchGithubRepos(username).subscribe((repos: []) => {
      this.repos = repos
    })
  }

  copyToClipboard(url: string) {
    var textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  }

}
