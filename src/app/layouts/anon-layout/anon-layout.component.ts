import { Component } from '@angular/core';
import { environment } from 'src//environments/environment';


@Component({
  selector: 'app-anon-layout',
  templateUrl: './anon-layout.component.html',
  styleUrls: ['./anon-layout.component.scss']
})
export class AnonLayoutComponent {
  currentApplicationVersion = environment.appVersion;
}
