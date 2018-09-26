import { Resource} from 'angular4-hal-aot';

export class XMLSample extends Resource {
  uri: string;
  text: string;
  xml: string;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
}
