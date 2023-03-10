export const menus = [
  {
      label: 'Hệ thống cảnh báo sớm',
      code: "early-warning-system",
      icon: 'pi pi-user',
      class: 'navigation-header',
      // routerLink: 'early-warning-system',
      items: [
          { label: '1. Nhóm cảnh báo liên quan đến sản phẩm', routerLink: '/early-warning-system/group-warning-product', class: 'nav-item', },
          { label: '2. Nhóm cảnh báo liên quan đến khách hàng', routerLink: '/early-warning-system/group-warning-customer', class: 'nav-item', },
          { label: '3. Nhóm cảnh báo liên quan đến chốt quầy', routerLink: '/early-warning-system/group-warning-counter', class: 'nav-item', },
          { label: '4. Nhóm cảnh báo liên quan đến nhà cung cấp', routerLink: '/early-warning-system/group-warning-supplier', class: 'nav-item', },
      ]
  },
  {
      label: 'Hệ thống kiểm soát',
      code: 'danh-muc',
      icon: 'pi pi-qrcode',
      routerLink: '/control-system',
      items: [
          { label: 'Hệ thống kiểm soát 1', routerLink: '/hop-dong-dai-ly/dat-lenh' },
          { label: 'Hệ thống kiểm soát 2', routerLink: '/hop-dong-dai-ly/so-lenh' },
          { label: 'Hệ thống kiểm soát 3', routerLink: '/hop-dong-dai-ly/so-lenh' },
          { label: 'Hệ thống kiểm soát 4', routerLink: '/hop-dong-dai-ly/so-lenh' },
      ] 
  },

  {
      label: 'Hệ thống quản trị nhà cung cấp',
      code: 'dao-tao',
      icon: 'pi pi-box',
      routerLink: '/supplier-management-system',
      items: [
          { label: 'Hệ thống quản trị nhà cung cấp 1', routerLink: '/truy-van/giao-dich' },
          { label: 'Hệ thống quản trị nhà cung cấp 2', routerLink: '/truy-van/giao-dich' },
          { label: 'Hệ thống quản trị nhà cung cấp 3', routerLink: '/truy-van/giao-dich' },
          { label: 'Hệ thống quản trị nhà cung cấp 4', routerLink: '/truy-van/giao-dich' },
          { label: 'Hệ thống quản trị nhà cung cấp 5', routerLink: '/truy-van/giao-dich' },
      ]
  },
  // 0200f578-4b8e-45e8-99eb-c5446db7efb6

  {
      label: 'Hệ thống quản trị khách hàng',
      code: 'bao-cao',
      icon: 'pi pi-file',
      routerLink: '/customer-management-system',
      items: [
          { label: 'Hệ thống quản trị khách hàng 1', routerLink: '/bao-cao/truy-van-bc' },
          { label: 'Hệ thống quản trị khách hàng 2', routerLink: '/bao-cao/truy-van-bc' },
          { label: 'Hệ thống quản trị khách hàng 3', routerLink: '/bao-cao/truy-van-bc' },
          { label: 'Hệ thống quản trị khách hàng 4', routerLink: '/bao-cao/truy-van-bc' },
      ]
  },
  // 7f991b49-4816-4b89-ba83-4996cfc8966e
  
  {
      label: 'Hệ thống đối soát tài chính',
      code: 'bao-cao',
      icon: 'pi pi-file',
      routerLink: '/financial-control-system',
      items: [
          { label: 'Hệ thống đối soát tài chính 1', routerLink: '/cai-dat/quan-ly-ngay-nghi' },
          { label: 'Hệ thống đối soát tài chính 2', routerLink: '/cai-dat/quan-ly-ngay-nghi' },
          { label: 'Hệ thống đối soát tài chính 3', routerLink: '/cai-dat/quan-ly-ngay-nghi' },
          { label: 'Hệ thống đối soát tài chính 4', routerLink: '/cai-dat/quan-ly-ngay-nghi' },
          { label: 'Hệ thống đối soát tài chính 5', routerLink: '/cai-dat/quan-ly-ngay-nghi' },
         
      ]
  },
  // a68dc8d0-707e-4446-b397-622ecc7eceb4


];



