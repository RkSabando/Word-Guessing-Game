import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StateService } from 'src/app/services/state/state.service';
import { WordFormComponent } from './word-form/word-form/word-form.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent {

  words$ = this.state.words$;
  tabIndex: number = 0;

  constructor(
    private storage: LocalStorageService,
    private state: StateService,
    private dialog: MatDialog
  ){
    let vm = this.storage.get('state');
    console.log('vm', vm);
    if(vm) {
      this.state.wordsSubject.next(vm.words);
    } else {
      let obj = {
          words: []
      };

      this.storage.set('state', obj);
      console.log('added');
    }
  }

  clickAdd() {
    let dialogRef = this.dialog.open(WordFormComponent);
  }

}
