import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './store/effects';
import { userReducer } from './store/redusers';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    StoreModule.forRoot({ users: userReducer }), // Define your reducers here
    EffectsModule.forRoot([UserEffects]) // Define your effects here
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
