 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentBootstrap } from './auth/login copy/login.component';
import { TodayTaskComponent } from './Manager/today-task/today-task.component';
import { NotFoundComponent } from './NotFound/not-found/not-found.component';
import { ManagerGuard } from './auth/manager.guard';
import { LeadGuard } from './auth/lead.guard';
import { MemberGuard } from './auth/member.guard';
// import { HomeGuard } from './auth/home.guard';
import { UpdateScheduleComponent } from './TeamMember/update-schedule/update-schedule.component';
import { CreateScheduleComponent } from './TeamMember/create-schedule/create-schedule.component';
import { NgModule, Component, SimpleChange } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './TeamMember/home/home.component';
import { CrudService } from './services/crud-service.service';
// import { SchedularService } from './services/schedular.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DeleteScheduleComponent } from './TeamMember/delete-schedule/delete-schedule.component';
import { SharedDataService } from './services/shared-data.service';
import { AuthGuard } from './auth/auth.guard';
import { PaginationComponent } from './TeamMember/pagination/pagination.component';
// import { AuthService } from './services/auth.service';

import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ManagerSideBarComponent } from './MAnager/manager-side-bar/manager-side-bar.component';
import { ViewUsersComponent } from './manager/view-users/view-users.component';
import { DashboardComponent } from './manager/dashboard/dashboard.component';
import { ModalService } from './services/modal.service';
import { CreateUserModalComponent } from './Manager/create-user-modal/create-user-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UpdateModalComponent } from './manager/update-modal/update-modal.component';
import { ViewTasksComponent } from './manager/view-tasks/view-tasks.component';
import { CreateTaskModalComponent } from './manager/create-task-modal/create-task-modal.component';
import { TaskUpdateModalComponent } from './manager/task-update-modal/task-update-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    HomeComponent,
    CreateScheduleComponent,
    DeleteScheduleComponent,
    UpdateScheduleComponent,
    PaginationComponent,
    ManagerSideBarComponent,
    ViewUsersComponent,
    DashboardComponent,
    CreateUserModalComponent,
    UpdateModalComponent,
    ViewTasksComponent,
    CreateTaskModalComponent,
    TaskUpdateModalComponent,
    TodayTaskComponent,
    LoginComponentBootstrap
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
   
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponentBootstrap,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },

      // {
      //   path: 'home',
      //   component: HomeComponent,
      //   canActivate:[AuthGuard],
      // },
      // {
      //   path: 'api/v1/team_lead',
      //   component: SignUpComponent,
      //   canActivate:[AuthGuard,LeadGuard],
      // },
      // {
      //   path: 'api/v1/team_member',
      //   component: HomeComponent,
      //   canActivate:[AuthGuard,MemberGuard]
      // },
      
      {
        path: 'api/v1/manager',
        component: ManagerSideBarComponent,
        canActivate: [AuthGuard, ManagerGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'view_tasks', component: ViewTasksComponent },
          { path: 'today_tasks', component: TodayTaskComponent },
          { path: 'view_users', component: ViewUsersComponent },
          
         ],
      },
      
      {
        path: '**',
        component: NotFoundComponent
      },

      // {
      //   path: 'api/v1/manager/create_schedule',
      //   component:  CreateScheduleComponent,
      //   canActivate:[AuthGuard,ManagerGuard],
      // },
      // {
      //   path: 'api/v1/manager/update_schedule/:id',
      //   component:  UpdateScheduleComponent,
      //   canActivate:[AuthGuard,ManagerGuard],
      // },

      // children: [

      //   {path: 'create_schedule',component:SignUpComponent},
      //   {path: 'create_schedule',component:SignUpComponent},
      //   {path: 'create_schedule',component:SignUpComponent},
      //   {path: 'create_schedule',component:SignUpComponent},
      // ]

      // {
      //   path: 'api/v1/scedular/update_schedule/:id',
      //   component: UpdateScheduleComponent,
      //   canActivate:[AuthGuard]
      // },
    ]),
        NgbModule,
  ],
  providers: [
    HttpService,
    CrudService,
    // SchedularService,
    ModalService,
    SharedDataService,
    AuthGuard,
    MemberGuard,
    LeadGuard,
    ManagerGuard,
    // AuthService,

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
