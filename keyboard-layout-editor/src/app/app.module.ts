import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { KeyboardPreviewComponent } from './keyboard-preview/keyboard-preview.component';
import { EditorControlsComponent } from './editor-controls/editor-controls.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainToolbarComponent,
    KeyboardPreviewComponent,
    EditorControlsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
