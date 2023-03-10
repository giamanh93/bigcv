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
      code: 'control-system',
      icon: 'pi pi-qrcode',
      items: [
          { label: '1. Kiểm soát công nợ nhà cung cấp', routerLink: '/hop-dong-dai-ly/dat-lenh' },
          { label: '2. Kiểm soát công nợ khách hàng', routerLink: '/hop-dong-dai-ly/so-lenh' },
          { label: '3. Kiểm soát thất thoát hàng hóa', routerLink: '/hop-dong-dai-ly/so-lenh' },
          { label: '4. Kiểm soát thất thoát thu ngân', routerLink: '/hop-dong-dai-ly/so-lenh' },
          { label: '5. Kiểm soát chi phí', routerLink: '/hop-dong-dai-ly/so-lenh' },
      ] 
  },

  {
      label: 'Hệ thống quản trị nhà cung cấp',
      code: 'supplier-management-system',
      icon: 'pi pi-box',
      items: [
          { label: '1. Theo dõi lợi nhuận sản phẩm nhà cung cấp', routerLink: '/truy-van/giao-dich' },
          { label: '2. Theo dõi sản phẩm hỏng hủy theo từng nhà cung cấp', routerLink: '/truy-van/giao-dich' },
          { label: '3. Theo dõi hiệu quả chiến dịch khuyến mãi từng nhà cung cấp', routerLink: '/truy-van/giao-dich' },
          { label: '4. Theo dõi lượng hàng tồn theo từng nhà cung cấp', routerLink: '/truy-van/giao-dich' },
      ]
  },
  // 0200f578-4b8e-45e8-99eb-c5446db7efb6

  {
      label: 'Hệ thống quản trị khách hàng',
      code: 'customer-management-system',
      icon: 'pi pi-file',
      items: [
          { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/bao-cao/truy-van-bc' },
          { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/bao-cao/truy-van-bc' },
          { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/bao-cao/truy-van-bc' },
          { label: '4. Theo dõi theo hình thức mua hàng', routerLink: '/bao-cao/truy-van-bc' },
          { label: '5. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/bao-cao/truy-van-bc' },
      ]
  },
  // 7f991b49-4816-4b89-ba83-4996cfc8966e
  
  {
      label: 'Hệ thống đối soát tài chính',
      code: 'financial-control-system',
      icon: 'pi pi-file',
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



