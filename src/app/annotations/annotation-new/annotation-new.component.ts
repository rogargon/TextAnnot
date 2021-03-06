import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TagTreeNode} from '../../shared/models/tags-tree';
import {Annotation} from '../../shared/models/annotation';
import {Sample} from '../../shared/models/sample';
import {environment} from '../../../environments/environment';
import {flatMap} from 'rxjs/operators';
import {AnnotationService} from '../../core/services/annotation.service';
import * as $ from 'jquery';
import {KEYS, TREE_ACTIONS} from 'angular-tree-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagsEditModalComponent} from '../../tag/tags-edit-modal/tags-edit-modal.component';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/models/project';
import {TagService} from '../../core/services/tag.service';
import {AuthenticationBasicService} from '../../core/services/authentication-basic.service';

@Component({
  selector: 'app-annotation-new',
  templateUrl: './annotation-new.component.html',
  styleUrls: ['./annotation-new.component.css']
})
export class AnnotationNewComponent implements OnInit, AfterViewInit {

  @Input() sample: Sample;

  public submitting = false;
  private persistedAnnotation = false;
  public selectedTag: TagTreeNode;
  public currentAnnotation: Annotation;
  public selectedText: string;

  public project: Project;
  public tags: TagTreeNode[] = [];
  public options = {
    animateExpand: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
          }
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    },
    scrollOnActivate: true,
  };

  constructor(
    private projectService: ProjectService,
    private annotationService: AnnotationService,
    private tagService: TagService,
    private ngModal: NgbModal,
    private authService: AuthenticationBasicService
  ) { }

  async ngOnInit() {
    this.currentAnnotation = new Annotation(this.sample);
    this.annotationService.textSelection.subscribe(value => {
      this.selectedText = value.text;
      this.currentAnnotation.start = value.start;
      this.currentAnnotation.end = value.end;
      this.persistedAnnotation = false;
    });
    this.project = await this.projectService.getProject();
    this.tagService.getTagHierarchyTree(this.project).subscribe(tagsTree => {
      this.tags = tagsTree.roots;
    });
  }

  onActivate(event) {
    if (event.node) {
      this.selectedTag = event.node.data;
      this.persistedAnnotation = false;
    }
  }

  ngAfterViewInit(): void {
    $('#success-alert').hide();
  }

  annotate() {
    this.submitting = true;
    // @ts-ignore
    this.currentAnnotation.tag = `${environment.API}/tags/${this.selectedTag.id}`;
    this.annotationService.create(this.currentAnnotation).pipe(
      flatMap((value: Annotation) => this.annotationService.fillAnnotation(value))
    ).subscribe(value => {
      this.annotationService.notifyNewAnnotation(value);
      this.submitting = false;
      this.persistedAnnotation = true;
      this.currentAnnotation = new Annotation(this.sample, this.currentAnnotation.start, this.currentAnnotation.end);
      $('#success-alert').show().delay(300).fadeTo(2000, 500).slideUp(500, function() {
        $('#success-alert').slideUp(500);
      });
    }, () => this.submitting = false);
  }

  openEditTagsModal() {
    const modalRef = this.ngModal.open(TagsEditModalComponent, {size: 'lg', centered: true});
    modalRef.result.then(value => {
      this.tagService.getTagHierarchyTree(this.project)
        .subscribe(tagsTree => this.tags = tagsTree.roots);
    },
      reason => {
        this.tagService.getTagHierarchyTree(this.project)
          .subscribe(tagsTree => this.tags = tagsTree.roots);
      });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
