import { Injectable } from '@angular/core';
import { Resource } from 'angular4-hal-aot';
import {TagHierarchy} from 'src/app/tag-hierarchy/tag-hierarchy';


@Injectable()
export class Tag extends Resource {
  id: number;
  name: string;
  parent: Tag;
  tagHierarchy: TagHierarchy;
  uri: string;
}
