import {
  NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AdministrationRoutingModule
} from './administration-routing.module';

import {
  TranslateModule
} from '@ngx-translate/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTabPanelModule,
  DxTemplateModule,
  DxMapModule,
  DxTreeListModule,
  DxFileUploaderModule,
  DxLoadIndicatorModule,
  DxRadioGroupModule,
  DxValidatorModule,
  DxValidationSummaryModule
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';

import {
  MasterAssetComponent
} from './master_asset/master_asset.component';

import { DetailComponent } from './master_asset/detail_manufacture/detail.component'
import { DetailBrandComponent } from './master_asset/detail_assetbrand/detail.component'
import { DetailTypeComponent } from './master_asset/detail_type/detail.component'

import {
  SharedModule
} from '../shared/shared.module';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from 'app/views/administration/user/add/user-add.component';
import { AddRoleComponent} from './role/add/role-add.component';
import { AddAssetBrandComponent } from 'app/views/administration/master_asset/add_assetbrand/brand-add.component';
import { AddManufactureComponent } from 'app/views/administration/master_asset/add_manufacture/manufacture-add.component';
import { AddTypeComponent } from 'app/views/administration/master_asset/add_type/type-add.component';
import { DetailUserComponent } from './user/detail/user-detail.component';
import { SysMenuComponent } from './sys-menu/sys-menu.component';
import { AddSysMenuComponent } from './sys-menu/add/sys-menu-add.component';
import { VisiComponent } from './visi/visi.component';
import { AddVisiComponent } from './visi/add/visi-add.component';
import { MisiComponent } from './misi/misi.component';
import { AddMisiComponent } from './misi/add/misi-add.component';
import { RolemenuComponent } from './rolemenu/rolemenu.component';
import { AddRolemenuComponent } from './rolemenu/add/rolemenu-add.component';
import { SasaranComponent } from './sasaran/sasaran.component';
import { RKAPComponent } from './rkap/rkap.component';
import { RjppComponent } from './rjpp/rjpp.component';
import { GroupProductComponent } from './group-product/group-product.component';
import { ProgramKerjaComponent } from './program-kerja/program-kerja.component';
import { AddSasaranComponent } from './sasaran/add-sasaran/add-sasaran.component';
import { AddGroupProductComponent } from './group-product/add-group-product/add-group-product.component';
import { AddProgramKerjaComponent } from './program-kerja/add-program-kerja/add-program-kerja.component';
import { AddRKAPComponent } from './rkap/add-rkap/add-rkap.component';
import { AddRJPPComponent } from './rjpp/add-rjpp/add-rjpp.component';
import { SatuanComponent } from './satuan/satuan.component';
import { AddSatuanComponent } from './satuan/add-satuan/add-satuan.component';
import { GroupTaksonomiComponent } from './group-taksonomi/group-taksonomi.component';
import { AddGroupTaksonomiComponent } from './group-taksonomi/add-group-taksonomi/add-group-taksonomi.component';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxRadioGroupModule,
    TabsModule,
    TranslateModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxTreeListModule,
    DxMapModule,
    SharedModule,
    DxFileUploaderModule,
    DxLoadIndicatorModule,
    DxValidatorModule,
    DxValidationSummaryModule
    ],
  declarations: [
    MasterAssetComponent,
    RoleComponent,
    AddRoleComponent,
    AddUserComponent,
    UserComponent,
    DetailComponent,
    DetailBrandComponent,
    DetailTypeComponent,
    AddAssetBrandComponent,
    AddManufactureComponent,
    AddTypeComponent,
    DetailUserComponent,
    SysMenuComponent,
    AddSysMenuComponent,
    VisiComponent,
    AddVisiComponent,
    MisiComponent,
    AddMisiComponent,
    RolemenuComponent,
    AddRolemenuComponent,
    SasaranComponent,
    RKAPComponent,
    RjppComponent,
    GroupProductComponent,
    ProgramKerjaComponent,
    AddSasaranComponent,
    AddGroupProductComponent,
    AddProgramKerjaComponent,
    AddRKAPComponent,
    AddRJPPComponent,
    SatuanComponent,
    AddSatuanComponent,
    GroupTaksonomiComponent,
    AddGroupTaksonomiComponent
  ],
  exports: [
  ],
  bootstrap: [
    AddRoleComponent,
  ]
})
export class AdministrationModule { }
