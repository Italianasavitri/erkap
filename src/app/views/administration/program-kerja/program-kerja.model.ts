export class ProgramKerja {
    rjppid: string;
    sid: number;
    prkid: number;
    nama_program: string;
    plan_execute: any;
    pic: string;
    indikator_hasil: string;
    gid: number;
    indikator_satuan: string;
    kode_program: string;
    deskripsi: string;
  }
  
  export class Menu {
    authId?: string;
    menuParent?: string;
    menuId: string;
    read: any;
    write: any;
    text: string;
    items?: Menu[];
  }
  
  export class KategoriAktif {
    ID: number;
    Nama: string;
  }
  
  export class Search {
    prkid: string;
    nama_program: string;
    pic: string;
  }
  