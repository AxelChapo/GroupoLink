import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  modify!: boolean;
  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }

  profileModif() {
    this.modify = true;
  }
}
