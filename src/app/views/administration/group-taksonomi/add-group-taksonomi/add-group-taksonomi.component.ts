import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {GroupTaksonomiService} from '../group-taksonomi.service';
// import { AddRoleService } from './role-add.service';

import {Menu, GroupTaksonomi, KategoriAktif} from '../group-taksonomi.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

@Component({
  selector: 'app-add-group-taksonomi',
  templateUrl: './add-group-taksonomi.component.html',
  providers: []
})
// export class AddGroupTaksonomiComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
export class AddGroupTaksonomiComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() isEdit;
  @Input() isDetail;
  @Input() editItem;
  @Input() addVisible;
  @Output() onHideAdd = new EventEmitter();
  @ViewChild(DxTreeListComponent) treeList: DxTreeListComponent;
  @ViewChild(DxFormComponent) formAktif: DxFormComponent;
  @ViewChildren(DxiItemComponent) kontrols: QueryList<DxiItemComponent>;
  @ContentChildren(DxiItemComponent) kontens: QueryList<DxiItemComponent>;

  //model
  role: GroupTaksonomi;
  isallowregistration: boolean;
  simpleProducts: string[];
  daftarKategori: KategoriAktif[];
  // cekAktif: boolean;
  previousValue: boolean;
  newValue: boolean;

  menuTree: Menu[] = [];

  confVisible = false;
  isSave = false;
  isCancel = false;

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private grouptaksonomiService: GroupTaksonomiService) {
    this.simpleProducts = grouptaksonomiService.getSimpleProducts();
    
    this.role = {
       gid: null,
       nama_group: null,
   };
  }

  ngOnInit() {
   if (this.isEdit || this.isDetail) {
     const today = new Date().toISOString().slice(0, 10);
     const username = localStorage.getItem('username');
     this.grouptaksonomiService.getById(this.editItem).subscribe(respRole => {
       console.log(respRole);
       console.log(this.editItem);
       const nilai: string = respRole.d.gid;
       this.role = {
         gid: respRole.d.gid,
         nama_group: respRole.d.nama_group,
         //urutan: parseInt(nilai),
         // urutan: respRole.d.urutan,
       };
       // this.newValue = respRole.d.isallowregistration;

     })
   } else { // New Record
     this.role = {
       gid: null,
       nama_group: null,
     };

     // this.treeList.instance.refresh();
   }

  }

  ngAfterViewInit() {
   // console.log(this.kontrols);
   this.kontrols.forEach((item) => {
     // console.log('name = ' + item.name + ' datafield = ' + item.dataField + ', editorType = ' + item.editorType);
   });
 }

 ngAfterContentInit() {
   /*
   this.kontrols.forEach((item) => {
     console.log(item);
   });
   */
   // this.role.isallowregistration = 1;
 }

 dateBox_valueChanged (e) {
   this.previousValue = e.previousValue;
   this.newValue = e.value;
   console.log('checked = ' + e.value);
   // Event handling commands go here
 };

 checkBoxToggled(e) {
   // console.log('isaktif = ' + this.role.isallowregistration);
   console.log('newvalue = ' + this.newValue);
   this.previousValue = e.previousValue;
   this.newValue = e.value;
   console.log('previousValue = ' + e.previousValue + ' newValue = ' + e.value);
   // alert(e.value);
 }

  addToMenu(item) {
    if (!this.menuTree.length) {
      this.menuTree = [];
    }
    this.menuTree.push(item);
  }

  save(e) {
    this.confVisible = true;
    this.isSave = true;
    this.isCancel = false;
    e.preventDefault();
  }
  cancel() {
    this.confVisible = true;
    this.isSave = false;
    this.isCancel = true;
  }
  onHideConf() {
    this.confVisible = false;
  }
  onSaveConf() {
    this.treeList.instance.saveEditData();
    //console.log('isdisplayed sebelum disave = ' + this.role.isdisplayed);
    const nilai: number = this.role.gid;
    this.role.gid = nilai;
    let success = false;
    if (!this.isEdit) {
      this.role.gid = null;
      this.grouptaksonomiService.save(this.role).subscribe(resp => {
        console.log(resp);
        success = true;
        this.menuTree.forEach(menuItem => {
          if (menuItem.read || menuItem.write) {
            let read = 'N', write = 'N';
            if (menuItem.read) {
              read = 'Y';
            }
            if (menuItem.write) {
              write = 'Y';
            }
            this.grouptaksonomiService.saveRoleAuth({
              read: read,
              write: write,
              menuTab: {id: menuItem.menuId},
              userRole: {id: resp.id}
            }).subscribe(() => {}, () => {
              success = false;
            })
          }
        });

        if (success) {
          // this.options.message = 'Role saved';
          // notify(this.options, 'success', 3000);
          notify({message: 'Group Taksonomi berhasil disimpan', position: {my: 'center top', at: 'center top'}},
           'success', 3000);
          this.hide();
        } else {
          this.options.message = 'Saving Failed';
          notify(this.options, 'error', 3000);
        }
      }, err => {
        this.options.message = 'Saving Failed';
        notify(this.options, 'error', 3000);
      })
    } else {
      this.grouptaksonomiService.update(this.role).subscribe(resp => {
       console.log(this.role);
       success = true;

        this.menuTree.forEach(menuItem => {
          if (menuItem.read || menuItem.write) {
            let read = 'N', write = 'N';
            if (menuItem.read) {
              read = 'Y';
            }
            if (menuItem.write) {
              write = 'Y';
            }

            if (typeof menuItem.authId === 'undefined') {
             this.grouptaksonomiService.saveRoleAuth({
               read: read,
               write: write,
               menuTab: { id: menuItem.menuId },
               userRole: { id: resp.id }
             }).subscribe(() => { }, () => {
               success = false;
             })
           } else {
             this.grouptaksonomiService.updateRoleAuth({
               authId: menuItem.authId,
               read: read,
               write: write,
               menuTab: { id: menuItem.menuId },
               userRole: { id: resp.id }
             }).subscribe(() => { }, () => {
               success = false;
             })
           }
          } else {
            if (typeof menuItem.authId !== 'undefined') {
              this.grouptaksonomiService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                success = false;
              });
            }
          }
        });

        if (success) {
          this.options.message = 'Group Taksonomi updated';
          notify(this.options, 'success', 3000);
          this.hide();
        } else {
          this.options.message = 'Updating Failed';
          notify(this.options, 'error', 3000);
        }
        }, err => {
          this.options.message = 'Updating Failed';
          notify(this.options, 'error', 3000);
        }
      )
    }
  }
  onCancelConf() {
    this.addVisible = false;
    this.hide();
  }
  hide() {
    this.onHideAdd.emit();
  }

  toolbarPreparing(e) {
    e.toolbarOptions.visible = false;
  }

  cellClick(e) {
    this.treeList.instance.saveEditData();
  }

  rowUpdated(e) {
    console.log('updated', e, this.menuTree);
    const menuChecked = this.menuTree.find(menu => menu.menuId === e.key);

    this.menuTree.forEach((menu, index) => {
      if (menu.menuParent === e.key) {
        if (typeof e.data.read !== 'undefined') {
          this.menuTree[index].read = e.data.read;
        }
        if (typeof e.data.write !== 'undefined') {
          this.menuTree[index].write = e.data.write;
        }
      }
    })

    if (typeof menuChecked.menuParent !== 'undefined') {
      const menuChild = this.menuTree.filter(menu => menu.menuParent === menuChecked.menuParent);

      let read = 0, write = 0;
      menuChild.forEach(menu => {
        // console.log(menu)
        if (menu.read) {
          read++;
        }

        if (menu.write) {
          write++;
        }
      })

      if (read > 0) {
        this.menuTree.forEach((menu, index) => {
          if (menu.menuId === menuChecked.menuParent) {
            this.menuTree[index].read = true;
          }
        })
      }

      if (write > 0) {
        this.menuTree.forEach((menu, index) => {
          if (menu.menuId === menuChecked.menuParent) {
            this.menuTree[index].write = true;
          }
        })
      }
    }
  }
}