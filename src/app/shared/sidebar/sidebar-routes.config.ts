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
      routerLink: '/control-system'
    //   items: [
    //       { label: 'Đặt lệnh', routerLink: '/hop-dong-dai-ly/dat-lenh' },
    //       { label: 'Sổ lệnh', routerLink: '/hop-dong-dai-ly/so-lenh' },
    //       { label: 'Xứ lý hợp đồng', routerLink: '/hop-dong-dai-ly/xu-ly-hop-dong' },
    //      { label: 'Giao nhận hợp đồng', routerLink: '/hop-dong-dai-ly/giao-nhan-hop-dong' },
    //       { label: 'Hợp đồng', routerLink: '/hop-dong-dai-ly/hop-dong' },
    //       { label: 'Chi trả lãi', routerLink: '/hop-dong-dai-ly/chi-tra-lai' },
    //       { label: 'Xử lý rút vốn', routerLink: '/hop-dong-dai-ly/xu-ly-rut-von' },
    //       { label: 'Tất toán trước hạn', routerLink: '/hop-dong-dai-ly/tat-toan-truoc-han' },
    //       { label: 'Hợp đồng đáo hạn', routerLink: '/hop-dong-dai-ly/hop-dong-dao-han' },
    //       { label: 'Lịch sử đầu tư', routerLink: '/hop-dong-dai-ly/lich-su-dau-tu' },
    //       { label: 'Chi trả ưu đãi', routerLink: '/hop-dong-dai-ly/chi-tra-uu-dai' },
    //       { label: 'Chi trả hoa hồng', routerLink: '/hop-dong-dai-ly/chi-tra-hoa-hong' },
    //   ] 
  },

  {
      label: 'Hệ thống quản trị nhà cung cấp',
      code: 'dao-tao',
      icon: 'pi pi-box',
      routerLink: '/supplier-management-system'
    //   items: [
    //       { label: 'Giao dịch', routerLink: '/truy-van/giao-dich' },
    //       { label: 'Thị trường thứ cấp', routerLink: '/truy-van/thi-truong-thu-cap' },
    //       { label: 'Thu tiền ngân hàng', routerLink: '/truy-van/thu-tien-ngan-hang' },
    //       { label: 'Chi tiền ngân hàng', routerLink: '/truy-van/chi-tien-ngan-hang' },
    //       { label: 'Sao kê tài khoản', routerLink: '/truy-van/sao-ke-tai-khoan' },
    //   ]
  },
  // 0200f578-4b8e-45e8-99eb-c5446db7efb6

  {
      label: 'Hệ thống quản trị khách hàng',
      code: 'bao-cao',
      icon: 'pi pi-file',
      routerLink: '/customer-management-system'
    //   items: [
    //       { label: 'Truy vấn BC', routerLink: '/bao-cao/truy-van-bc' },
    //       { label: 'Báo cáo QT', routerLink: '/bao-cao/bao-cao-qt' },
    //       { label: 'Báo cáo KD', routerLink: '/bao-cao/bao-cao-kd' },
    //   ]
  },
  // 7f991b49-4816-4b89-ba83-4996cfc8966e
  
  {
      label: 'Hệ thống đối soát tài chính',
      code: 'bao-cao',
      icon: 'pi pi-file',
      routerLink: '/financial-control-system'
    //   items: [
    //       { label: 'Quản lý ngày nghỉ', routerLink: '/cai-dat/quan-ly-ngay-nghi' },
    //       { label: 'Tổng thầu', routerLink: '/cai-dat/tong-thau' },
    //       { label: 'Đơn vị tư vấn', routerLink: '/cai-dat/don-vi-tu-van' },
    //       { label: 'Phê duyệt', routerLink: '/cai-dat/phe-duyet' },
    //       { label: 'Giới thiệu dự án', routerLink: '/cai-dat/gioi-thieu-du-an' },
    //       { label: 'Thông báo', routerLink: '/cai-dat/thong-bao' },
    //       { label: 'Chính sách', routerLink: '/cai-dat/chinh-sach' },
    //   ]
  },
  // a68dc8d0-707e-4446-b397-622ecc7eceb4


];



