import { AnnotationService } from './annotation.service';
import { SampleService } from '../sample/sample.service';
import { ActivatedRoute } from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Sample } from '../sample/sample';
import { Annotation } from './annotation';
import {flatMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TagHierarchyService} from '../tag-hierarchy/tag-hierarchy.service';
import {TagHierarchy} from '../tag-hierarchy/tag-hierarchy';
import {TagService} from '../tag/tag.service';
import {Tag} from '../tag/tag';
import {TagTree} from '../tag-hierarchy/tag-hierarchy-tree';
import {KEYS, TREE_ACTIONS} from 'angular-tree-component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject<void>();

  public sample: Sample;
  public selectedText: string;
  public annotations: Annotation[];
  public tagHierarchies: TagHierarchy[];
  public selectedTagHierarchy: TagHierarchy;
  public selectedTag: TagTree;
  public currentAnnotation: Annotation;

  public tags: TagTree[];
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

  constructor(private route: ActivatedRoute,
              private samplesService: SampleService,
              private annotationService: AnnotationService,
              private tagHierarchyService: TagHierarchyService,
              private tagService: TagService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.samplesService.get(id).pipe(
      flatMap(res => {
        this.sample = res;
        this.currentAnnotation = new Annotation();
        this.currentAnnotation.sample = this.sample;
        return this.annotationService.findBySample(this.sample);
      }),
      takeUntil(this.ngUnsubscribe),
    ).subscribe((annotations: Annotation[]) => this.annotations = annotations);

    this.tagHierarchyService.getAll().subscribe(value => this.tagHierarchies = value);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  showSelectedText(event: MouseEvent) {
    if (window.getSelection) {
      this.selectedText = window.getSelection().toString();
      this.currentAnnotation.start = window.getSelection().baseOffset - 1;
      this.currentAnnotation.end = window.getSelection().extentOffset - 1;
    }
  }

  tagHierarchyChange(newTagHierarchy) {
    this.selectedTagHierarchy = newTagHierarchy;
    this.tagHierarchyService.getTagHierarchyTree(this.selectedTagHierarchy)
      .subscribe(value => this.tags = value.roots);
  }

  onActivate(event) {
    this.selectedTag = event.node.data;
  }

  annotate() {
    // @ts-ignore
    this.currentAnnotation.tag = `${environment.API}/tags/${this.selectedTag.id}`;
    this.annotationService.create(this.currentAnnotation).subscribe();
  }
}