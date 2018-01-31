import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatProgressSpinnerModule, MatRadioModule, MatSnackBarModule, MatTabsModule
} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTabsModule
];
@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
