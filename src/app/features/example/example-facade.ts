import { Injectable, inject } from '@angular/core';
import { ExampleService } from './example-service';

@Injectable()
export class ExampleFacade {
  protected readonly service = inject(ExampleService);
}
