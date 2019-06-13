import { TagsTreeCreationComponent } from './tag/tags-create/tags-tree-creation.component';
import { TagService } from './tag/tag.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TreeModule } from 'angular-tree-component';
import { FileUploadModule } from 'ng2-file-upload';

import { AngularHalModule } from 'angular4-hal-aot';
import { ExternalConfigurationService } from './external-configuration-service';

import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { HttpErrorInterceptor } from './error-handler/http-error-interceptor';

import { LoginBasicModule } from './login-basic/login-basic.module';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AdministratorGuard } from './login-basic/administrator.guard';
import { AuthInterceptor } from './login-basic/auth-interceptor';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

import { AdminListComponent } from './user/user-list/admin-list.component';
import { AdminDetailComponent } from './user/user-detail/admin-detail.component';
import { AdminService } from './user/admin.service';
import { AdminCreateComponent } from './user/user-create/admin-create.component';
import { AdminEditComponent } from './user/user-edit/admin-edit.component';
import { AdminSearchComponent } from './user/user-search/admin-search.component';

import { LinguistListComponent } from './user/user-list/linguist-list.component';
import { LinguistDetailComponent } from './user/user-detail/linguist-detail.component';
import { LinguistCreateComponent } from './user/user-create/linguist-create.component';
import { LinguistEditComponent } from './user/user-edit/linguist-edit.component';
import { LinguistSearchComponent } from './user/user-search/linguist-search.component';
import { LinguistService } from './user/linguist.service';

import { SampleCreateComponent } from './sample/sample-create/sample-create.component';
import { SampleListComponent } from './sample/sample-list/sample-list.component';
import { SampleService } from './sample/sample.service';
import { SampleSearchComponent } from './sample/sample-search/sample-search.component';
import { SampleDeleteComponent } from './sample/sample-delete/sample-delete.component';
import { SampleDetailComponent } from './sample/sample-detail/sample-detail.component';
import { SampleEditComponent } from './sample/sample-edit/sample-edit.component';

import { MetadataValueService} from './metadataValue/metadataValue.service';

import { XMLSampleService } from './XMLsample/XMLsample.service';
import { XMLSampleFormComponent} from './XMLsample/XMLsample-form/XMLSample-form.component';

import { MetadataFieldService } from './metadatafield/metadata-field.service';
import { MetadataFieldListComponent } from './metadatafield/metadatafield-list/metadatafield-list.component';
import { MetadafieldCreateComponent } from './metadatafield/metadatafield-create/metadafield-create.component';
import { MetadatafieldSearchComponent } from './metadatafield/metadatafield-search/metadatafield-search.component';
import { MetadatafieldEditComponent } from './metadatafield/metadatafield-edit/metadatafield-edit.component';
import { MetadatafieldDetailComponent } from './metadatafield/metadatafield-detail/metadatafield-detail.component';
import {SampleFieldsFormComponent} from './sample/sample-fields-form/sample-fields-form.component';
import { MetadatafieldInputComponent } from './metadatafield/metadatafield-input/metadatafield-input.component';

import { TagComponent } from './tag/tag.component';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { SharedModule } from './shared/shared.module';
import { AnnotationsComponent } from './annotations/annotations.component';
import { AnnotationService } from './annotations/annotation.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AnnotationListComponent } from './annotations/annotation-list/annotation-list.component';
import { AnnotationNewComponent } from './annotations/annotation-new/annotation-new.component';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatTabsModule,
  MatTreeModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AnnotationListFilterComponent } from './annotations/annotation-list/annotation-list-filter/annotation-list-filter.component';
import { SampleDetailModalComponent } from './sample/sample-detail-modal/sample-detail-modal.component';
import { SampleSearchStatisticsModalComponent } from './sample/sample-search-statistics-modal/sample-search-statistics-modal.component';
import { MetadatafieldEditValuesComponent } from './metadatafield/metadatafield-edit-values/metadatafield-edit-values.component';
import { TagsEditModalComponent } from './tag/tags-edit-modal/tags-edit-modal.component';
import {ProjectService} from './core/project.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    AdminListComponent,
    AdminDetailComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminSearchComponent,
    LinguistListComponent,
    LinguistDetailComponent,
    LinguistCreateComponent,
    LinguistEditComponent,
    LinguistSearchComponent,
    SampleCreateComponent,
    SampleSearchComponent,
    SampleListComponent,
    SampleDeleteComponent,
    SampleDetailComponent,
    SampleEditComponent,
    XMLSampleFormComponent,
    MetadataFieldListComponent,
    MetadafieldCreateComponent,
    MetadatafieldSearchComponent,
    MetadatafieldEditComponent,
    MetadatafieldDetailComponent,
    SampleSearchComponent,
    TagComponent,
    TagsTreeCreationComponent,
    BreadcrumbComponent,
    SampleFieldsFormComponent,
    MetadatafieldInputComponent,
    AnnotationsComponent,
    AnnotationListComponent,
    AnnotationNewComponent,
    AnnotationListFilterComponent,
    SampleDetailModalComponent,
    SampleSearchStatisticsModalComponent,
    MetadatafieldEditValuesComponent,
    TagsEditModalComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    LoginBasicModule,
    AngularHalModule.forRoot(),
    ErrorHandlerModule,
    FileUploadModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    TreeModule.forRoot(),
    FontAwesomeModule,
    MatTreeModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    AuthenticationBasicService, LoggedInGuard, AdministratorGuard, AdminService, LinguistService, SampleService,
    XMLSampleService, AnnotationService, MetadataValueService, MetadataFieldService,
    TagService, ProjectService],
  bootstrap: [AppComponent],
  entryComponents: [SampleDetailModalComponent, SampleSearchStatisticsModalComponent, TagsEditModalComponent]
})
export class AppModule { }
