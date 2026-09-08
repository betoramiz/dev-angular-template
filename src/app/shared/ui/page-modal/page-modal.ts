import { Component, computed, inject, TemplateRef, viewChild } from '@angular/core';
import { PageModalModel } from '@shared-ui/page-modal/page-modal-model';
import { NgTemplateOutlet } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [NgTemplateOutlet],
  selector: 'page-modal',
  styleUrl: './page-modal.css',
  templateUrl: './page-modal.html',
})
export class PageModal {
  readonly data: PageModalModel = inject<PageModalModel>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<PageModal>);

  private readonly errorTemplate = viewChild('errorTemplate', { read: TemplateRef });
  private readonly confirmationTemplate = viewChild('confirmationTemplate', { read: TemplateRef });
  private readonly yesNoTemplate = viewChild('yesNoTemplate', { read: TemplateRef });

  templateType = computed(() => {
    if (this.data.type === 'Error') {
      return this.errorTemplate();
    } else if (this.data.type === 'Confirmation') {
      return this.confirmationTemplate();
    } else if (this.data.type === 'YesNo') {
      return this.yesNoTemplate();
    } else {
      return this.errorTemplate();
    }
  });

  protected onNoClick() {
    this.dialogRef.close();
  }
}
