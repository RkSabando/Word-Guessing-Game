import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent {

  words$ = this.state.words$;
  tabIndex: number = 1;

  constructor(
    private storage: LocalStorageService,
    private state: StateService
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
    this.tabIndex = 1;
  }

}
