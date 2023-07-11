import {Component, OnInit} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {UserManagementService} from "@app/modules/user-management/services/user-management.service";
import {
  TransactionInterface,
  TransactionStatus
} from "@app/modules/user-management/services/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import { LoaderTypeEnum, RESPONSE_STATUSES } from "@shared/services/interfaces";
​
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  tableHeader : any= [
    {
      title:this._translateService.instant('NAME'),
    },
    {
      title:this._translateService.instant('PAYMENT_METHOD'),
    },
    {
      title:this._translateService.instant('PURCHASED_ON'),
    },
    {
      title:this._translateService.instant('TYPE'),
    },
    {
      title:this._translateService.instant('PRICE'),
    },
    {
      title:this._translateService.instant('STATUS'),
    },
    {
      title:this._translateService.instant('DETAILS'),
    },
  ]
​
  transactionList?: TransactionInterface[] | undefined = [];
  transactionStatus = TransactionStatus;
  loaderTypeEnum = LoaderTypeEnum;
  isTransactionLoaded? : boolean = false;
  transactionCount?: number = 0;
  transactionOffset: number = 0;
​
  showIFrame: boolean = false;
  iframeSrc!: string;
​
​
  constructor(private _translateService: TranslateService,
              private _userManagementService: UserManagementService,
              private _snackBar: MatSnackBar) {
    this._getTransactionList()
    sessionStorage.removeItem('sortValue')
  }
​
  ngOnInit(): void {
  }
​
  private _getTransactionList(offset: number = 0) {
    this.isTransactionLoaded = true;
    this._userManagementService.getTransactionList( offset, 10).subscribe({
      next: ({results, count}) => {
        if(!results){
          this.isTransactionLoaded = false
          return;
        }
        this.transactionCount = count;
        this.isTransactionLoaded = false;
        this.transactionList = this.transactionList?.concat(results);
        results.forEach((result) => {
          if (result.status === "charged") {
            result.displayDownloadIcon = true;
          } else {
            result.displayDownloadIcon = false;
          }
        })
      },
      error: ({error}) => {
        if (error.status_code === RESPONSE_STATUSES.INTERNAL_SERVER) {
          this.isTransactionLoaded = false
          this._snackBar.open(this._translateService.instant('SOMETHING_WENT_WRONG'), '', {
            panelClass: 'bg-btnSecondaryHover',
            duration: 5000
          });
        }
      }
    });
  }
​
  private _getSortedTransactionList(offset: number = 0,sortCriteria?: string){
    this.isTransactionLoaded = true;
    this._userManagementService.getTransactionList(offset, 10, sortCriteria).subscribe({
      next: ({results, count}) => {
        if(!results){
          this.isTransactionLoaded = false
          return;
        }
        this.transactionCount = count;
        this.isTransactionLoaded = false;
        this.transactionList = this.transactionList?.concat(results);
        results.forEach((result) => {
          if (result.status === "charged") {
            result.displayDownloadIcon = true;
          } else {
            result.displayDownloadIcon = false;
          }
        })
      },
      error: ({error}) => {
        if (error.status_code === RESPONSE_STATUSES.INTERNAL_SERVER) {
          this.isTransactionLoaded = false
          this._snackBar.open(this._translateService.instant('SOMETHING_WENT_WRONG'), '', {
            panelClass: 'bg-btnSecondaryHover',
            duration: 5000
          });
        }
      }
    });
  }
​
  loadMore(){
    this.transactionOffset += 10;
    if (sessionStorage.getItem('sortValue') === ''){
      this._getTransactionList(this.transactionOffset)
    }else{
      const sortValue = sessionStorage.getItem('sortValue') || undefined
      this._getSortedTransactionList(this.transactionOffset, sortValue );
    }
  }
​
  sort(criteria: string, offset: number ) {
    sessionStorage.setItem('sortValue',criteria)
    this.transactionOffset = offset
    this.transactionList = []
    if (sessionStorage.getItem('sortValue') === ''){
      this._getTransactionList(this.transactionOffset)
    }else{
      this._getSortedTransactionList(this.transactionOffset, criteria);
    }
  }
​
  //! SETTING THE IFRAME LINK
  setIFrameLink(url: any): void {
    this.iframeSrc = url;
    this.showIFrame = true
  }
​
  hideIframe() {
    this.showIFrame = false
  }
}
​