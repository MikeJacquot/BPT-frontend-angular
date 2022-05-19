import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '@iplab/ngx-file-upload';
import { FamiliesService } from '~modules/families/modules/families.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.scss'],
  providers: [FileUploadService]
})
export class CreateFamilyComponent implements OnInit {

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly familiesService: FamiliesService,) {
  }

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        name: [null, Validators.required],
      }
    )
  }

}
