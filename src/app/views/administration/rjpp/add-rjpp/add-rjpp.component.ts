import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {RjppService} from '../rjpp.service';
// import { AddRoleService } from './role-add.service';

import {Menu, Rjpp, KategoriAktif} from '../rjpp.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

@Component({
  selector: 'app-add-rjpp',
  templateUrl: './add-rjpp.component.html',
  providers: []
})
// export class AddRJPPComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

export class AddRJPPComponent implements OnInit, AfterViewInit, AfterContentInit {
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
  role: Rjpp;
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

  constructor(private rjppService: RjppService) {
    this.simpleProducts = rjppService.getSimpleProducts();
    
    this.role = {
       rjppid: null,
       periode: null,
       description: null,
       notes: null,
       start_year: null,
       end_year: null,
   };
  }

  ngOnInit() {
   if (this.isEdit || this.isDetail) {
     const today = new Date().toISOString().slice(0, 10);
     const username = localStorage.getItem('username');
     this.rjppService.getById(this.editItem).subscribe(respRole => {
       console.log(respRole);
       console.log(this.editItem);
       const nilai: string = respRole.d.rjppid;
       this.role = {
         rjppid: respRole.rjppid,
         periode: respRole.d.periode,
         //urutan: parseInt(nilai),
         description: respRole.d.description,
         notes: respRole.d.notes,
         start_year: respRole.d.start_year,
         end_year: respRole.d.end_year,
       };
       // this.newValue = respRole.d.isallowregistration;

     })
   } else { // New Record
     this.role = {
       rjppid: null,
       periode: null,
       description: null,
       notes:null,
       start_year:null,
       end_year:null
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
    //const nilai: number = this.role.rjpp_id;
    const nilai: number = this.role.rjppid;
    //this.role.rjppid = nilai.toString();
    this.role.rjppid = nilai;
    let success = false;
    if (!this.isEdit) {
      this.role.rjppid = null;
      this.rjppService.save(this.role).subscribe(resp => {
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
            this.rjppService.saveRoleAuth({
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
          notify({message: 'Rjpp berhasil disimpan', position: {my: 'center top', at: 'center top'}},
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
      this.rjppService.update(this.role).subscribe(resp => {
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
             this.rjppService.saveRoleAuth({
               read: read,
               write: write,
               menuTab: { id: menuItem.menuId },
               userRole: { id: resp.id }
             }).subscribe(() => { }, () => {
               success = false;
             })
           } else {
             this.rjppService.updateRoleAuth({
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
              this.rjppService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                success = false;
              });
            }
          }
        });

        if (success) {
          this.options.message = 'RJPP updated';
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
