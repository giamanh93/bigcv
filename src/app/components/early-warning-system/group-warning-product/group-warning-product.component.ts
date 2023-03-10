
import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/hrm-breadcrumb/hrm-breadcrumb.component';
import { Branch, EarlyWarning, ProductWarning, SearchEarlyWarning } from 'src/app/models/early-warning';
import { EarlyWarningSystemService } from 'src/app/services/earlyWarningSystem.service';


@Component({
	selector: 'app-group-warning-product',
	templateUrl: './group-warning-product.component.html',
	styleUrls: ['./group-warning-product.component.scss']
})
export class GroupWarningProductComponent implements OnInit {
	itemsBreadcrumb: HrmBreadcrumb[] = [];
	products: EarlyWarning[] = [
		{
			"id": "1000",
			"code": "f230fh0g3",
			"name": "Bamboo Watch",
			"description": "Product Description",
			"image": "bamboo-watch.jpg",
			"price": 65,
			"category": "Accessories",
			"quantity": 24,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1001",
			"code": "nvklal433",
			"name": "Black Watch",
			"description": "Product Description",
			"image": "black-watch.jpg",
			"price": 72,
			"category": "Accessories",
			"quantity": 61,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1002",
			"code": "zz21cz3c1",
			"name": "Blue Band",
			"description": "Product Description",
			"image": "blue-band.jpg",
			"price": 79,
			"category": "Fitness",
			"quantity": 2,
			"inventoryStatus": "LOWSTOCK",
			"rating": 3
		},
		{
			"id": "1003",
			"code": "244wgerg2",
			"name": "Blue T-Shirt",
			"description": "Product Description",
			"image": "blue-t-shirt.jpg",
			"price": 29,
			"category": "Clothing",
			"quantity": 25,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1004",
			"code": "h456wer53",
			"name": "Bracelet",
			"description": "Product Description",
			"image": "bracelet.jpg",
			"price": 15,
			"category": "Accessories",
			"quantity": 73,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1005",
			"code": "av2231fwg",
			"name": "Brown Purse",
			"description": "Product Description",
			"image": "brown-purse.jpg",
			"price": 120,
			"category": "Accessories",
			"quantity": 0,
			"inventoryStatus": "OUTOFSTOCK",
			"rating": 4
		},
		{
			"id": "1006",
			"code": "bib36pfvm",
			"name": "Chakra Bracelet",
			"description": "Product Description",
			"image": "chakra-bracelet.jpg",
			"price": 32,
			"category": "Accessories",
			"quantity": 5,
			"inventoryStatus": "LOWSTOCK",
			"rating": 3
		},
		{
			"id": "1007",
			"code": "mbvjkgip5",
			"name": "Galaxy Earrings",
			"description": "Product Description",
			"image": "galaxy-earrings.jpg",
			"price": 34,
			"category": "Accessories",
			"quantity": 23,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1008",
			"code": "vbb124btr",
			"name": "Game Controller",
			"description": "Product Description",
			"image": "game-controller.jpg",
			"price": 99,
			"category": "Electronics",
			"quantity": 2,
			"inventoryStatus": "LOWSTOCK",
			"rating": 4
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		},
		{
			"id": "1009",
			"code": "cm230f032",
			"name": "Gaming Set",
			"description": "Product Description",
			"image": "gaming-set.jpg",
			"price": 299,
			"category": "Electronics",
			"quantity": 63,
			"inventoryStatus": "INSTOCK",
			"rating": 3
		}
	]
	private readonly unsubscribe$: Subject<void> = new Subject();
	private $service= inject(EarlyWarningSystemService);
	private $messageService= inject(MessageService);
	public listBranchs: Branch[] = [];
	public listDatas: ProductWarning[] = [];
	public query: SearchEarlyWarning = {
		retailerId : 717250,
		search : '',
		page : 0,
		size : 0,
		branchId : 0,
	}

	ngOnDestroy() {
	  this.unsubscribe$.next();
	  this.unsubscribe$.complete();
	}
	
	ngOnInit(): void {
		this.itemsBreadcrumb = [
			{ label: 'Trang chủ', routerLink: '/home' },
			{ label: 'Hệ thống cảnh báo sớm' },
			{ label: '1. Nhóm cảnh báo liên quan đến sản phẩm' },
		];
		this.getListBranch();
	}

	getListBranch() {
		const queryParams = queryString.stringify({retailerId: 717250});
		this.$service.getListBranch(queryParams)
		.pipe(takeUntil(this.unsubscribe$))
		.subscribe(results => {
			if(results.success) {
				this.listBranchs = results.data.content ?? [];
				this.query.branchId = this.listBranchs.length > 0 ? this.listBranchs[0].branchId : 0;
				this.loadTab1();
			}else {
				this.listDatas = [];
				this.$messageService.add({severity:'error', summary: 'Error Message', detail: results.code});
			}
		})
	}

	loadTab1() {
		const queryParams = queryString.stringify(this.query);
		this.$service.getListProductNotProfitMargin(queryParams)
		.pipe(takeUntil(this.unsubscribe$))
		.subscribe(results => {
			if(results.success) {
				this.listDatas = results.data.content ?? [];
			}else {
				this.listDatas = [];
				this.$messageService.add({severity:'error', summary: 'Error Message', detail: results.code});
			}
		})
	}

}
