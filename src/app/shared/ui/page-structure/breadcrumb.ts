import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'page-breadcrumb',
  styles: `
    section {
      display: flex;
      flex-direction: row;

      span {
        margin-right: 10px;
        font-size: 12px;
      }

      span:last-child {
      }
    }
  `,
  template: `
    <section>
      @for (item of path(); track $index) {
        <span>{{ item }}</span>
        @if ($index < path().length - 1) {
          <span>&gt;</span>
        }
      }
    </section>
  `,
})
export class Breadcrumb {
  path = input<Array<string>>([]);
}
