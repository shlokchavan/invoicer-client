import { Component, OnInit } from '@angular/core';
import { IResponseSchema } from 'src/app/configs/api-config';
import { sessionHistoryGridConfig } from 'src/app/configs/data-config/session-history-grid.config';
import { UserProfileService } from 'src/app/shared/_http/user-profile.service';

@Component({
  selector: 'session-history',
  templateUrl: './session-history.component.html',
  styleUrls: ['./session-history.component.scss']
})
export class SessionHistoryComponent implements OnInit {
  sessionHistoryGridConfig: any;
  scope = this;
  rowData!: any[];
  isLoading!: boolean;
  apiCall!: {};
  constructor(private userProfileService: UserProfileService) {
    this.sessionHistoryGridConfig = sessionHistoryGridConfig;
  }

  ngOnInit(): void {
    // 

  }

  // Grid Events
  onGridReady(params: any) {
    // 

    this.userProfileService.getSessionHistory().subscribe(
      (res: IResponseSchema) => {
        // 
        if (res.data) this.rowData = res.data;
      }
    )

    // 
  }

}
