import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from './master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from './role/role.component';
import { SysMenuComponent } from './sys-menu/sys-menu.component';
import { VisiComponent } from './visi/visi.component';
import { MisiComponent } from './misi/misi.component';
import { RolemenuComponent } from './rolemenu/rolemenu.component';
import { SasaranComponent } from './sasaran/sasaran.component';
import { GroupProductComponent } from './group-product/group-product.component';
import { ProgramKerjaComponent } from './program-kerja/program-kerja.component';
import { RjppComponent } from './rjpp/rjpp.component';
import { RKAPComponent } from './rkap/rkap.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration'
    },
    children: [
      {
        path: 'master_asset',
        component: MasterAssetComponent,
        data: {
          title: 'Master Asset'
        }
      }, {
        path: 'users',
        component: UserComponent,
        data: {
          title: 'Users'
        }
      }, {
        path: 'role',
        component: RoleComponent,
        data: {
          title: 'Role'
        }
      },
      {
        path: 'sys-menu',
        component: SysMenuComponent,
        data: {
          title: 'System Menu'
        }
      },
      {
        path: 'visi',
        component: VisiComponent,
        data: {
          title: 'Visi'
        }
      },
      {
        path: 'misi',
        component: MisiComponent,
        data: {
          title: 'Misi'
        }
      },
      {
        path: 'rolemenu',
        component: RolemenuComponent,
        data: {
          title: 'Role Menu Auth'
        }
      },
      {
        path: 'sasaran',
        component: SasaranComponent,
        data: {
          title: 'Sasaran'
        }
      },
      {
        path: 'group_product',
        component: GroupProductComponent,
        data: {
          title: 'Group Product'
        }
      },
      {
        path: 'program_kerja',
        component: ProgramKerjaComponent,
        data: {
          title: 'Program Kerja'
        }
      },
      {
        path: 'rjpp',
        component: RjppComponent,
        data: {
          title: 'RJPP'
        }
      },
      {
        path: 'rkap',
        component: RKAPComponent,
        data: {
          title: 'RKAP'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
