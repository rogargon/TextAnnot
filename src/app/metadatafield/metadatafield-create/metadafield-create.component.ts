import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetadataFieldService } from '../../core/services/metadata-field.service';
import { MetadataField } from '../../shared/models/metadata-field';
import {ProjectService} from '../../core/services/project.service';



@Component({
  selector: 'app-metadatafield-create',
  templateUrl: '../metadatafield-edit/metadata-field-modal.component.html'
})
export class MetadafieldCreateComponent implements OnInit {
  public metadataField: MetadataField;
  public errorMessage: string;
  public formTitle = 'Create MetadataField';
  public formSubtitle = 'Creates a new metadataField';

  constructor(private router: Router,
              private metadatafieldService: MetadataFieldService, private projectService: ProjectService) { }

  async ngOnInit() {
    this.metadataField = new MetadataField();
    this.metadataField.definedAt = await this.projectService.getProject();
  }

  onSubmit(): void {
    this.metadatafieldService.create(this.metadataField)
      .subscribe(
        () => this.router.navigate(['/metadataFields']));

  }
}
