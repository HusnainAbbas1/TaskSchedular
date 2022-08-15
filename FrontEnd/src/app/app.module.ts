import { UpdateScheduleComponent } from './schedular/update-schedule/update-schedule.component';
import { CreateScheduleComponent } from './schedular/create-schedule/create-schedule.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './schedular/home/home.component';
import { CrudService } from './services/crud-service.service';
import { SchedularService } from './services/schedular.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DeleteScheduleComponent } from './schedular/delete-schedule/delete-schedule.component';
import { SharedDataService } from './services/shared-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    HomeComponent,
    CreateScheduleComponent,
    DeleteScheduleComponent,
    UpdateScheduleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'api/v1/scedular/create_schedule',
        component: CreateScheduleComponent,
      },
      {
        path: 'api/v1/scedular/update_schedule/:id',
        component: UpdateScheduleComponent,
      },
      
     
    ]),
  ],
  providers: [
    HttpService,
    CrudService,
    SchedularService,
    SharedDataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
