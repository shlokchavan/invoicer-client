import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { toggleEdit } from 'src/app/shared/utils/readonly-toggle';
import csc from 'country-state-city'

import {
  AddressInput,
  CountrySelect,
  StateSelect,
  CitySelect,
  PostalCodeInput,
} from "../../../configs/plugin-components/my-account.config";
import { AddressDetailsModel } from '../my-account.model';
import { RMSelectBoxComponent } from 'src/app/shared/components/rm-select-box/rm-select-box.component';
import { EncryptedStorage } from 'src/app/shared/utils/encrypted-storage';
import { UserProfileService } from 'src/app/shared/_http/user-profile.service';
import { IResponseSchema } from 'src/app/configs/api-config';
import { RmToastyService } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service';
@Component({
  selector: 'address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, OnDestroy {
  editMode!: boolean;
  isLoading!: boolean;
  @Input() userProfile: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('countrySelect') countrySelect!: RMSelectBoxComponent;

  addressDetailsForm = new FormGroup({
    address: new FormControl(''),
    countryId: new FormControl(''),
    stateId: new FormControl(''),
    cityId: new FormControl(''),
    zipCode: new FormControl('')
  });
  constructor(
    private userProfileService: UserProfileService,
    private toastyService: RmToastyService
  ) {

  }


  public addressConfig = {
    AddressInput,
    CountrySelect,
    StateSelect,
    CitySelect,
    PostalCodeInput
  }

  // Models
  addressDetailsModel: AddressDetailsModel = new AddressDetailsModel();
  tempModel: AddressDetailsModel = new AddressDetailsModel();

  ngOnInit(): void {
    this.valueInit();
    this.getCountries();
  }

  getCountries() {
    this.addressConfig.CountrySelect.options = csc.getAllCountries();
  }

  getStateByCountry(id: any) {
    this.addressConfig.StateSelect.options = csc.getStatesOfCountry(id);
  }
  getCityByState(id: any) {
    this.addressConfig.CitySelect.options = csc.getCitiesOfState(id);
  }

  ngOnDestroy() {
    toggleEdit(this.addressConfig, true)
  }

  editInit() {
    this.tempModel = { ...this.addressDetailsModel };
  }

  selectionChange(type: any, e: any) {
    switch (type) {
      case 'country':
        this.addressDetailsForm.patchValue({
          countryId: e.value,
          stateId: null,
          cityId: null
        });
        this.getStateByCountry(e.value);
        break;
      case 'state':
        this.addressDetailsForm.patchValue({
          stateId: e.value,
          cityId: null
        });
        this.getCityByState(e.value);
        break;
      case 'city':
        this.addressDetailsForm.patchValue({
          cityId: e.value
        });
        break;
      default:
        break;
    }
    

  }
  cancelEdit() {
    this.addressDetailsModel = { ...this.tempModel };
  }


  valueInit() {
    // API CALL
    this.addressDetailsModel = { ... this.userProfile };

    // Patch Values
    this.addressDetailsForm.patchValue({
      countryId: this.userProfile.countryId,
      stateId: this.userProfile.stateId,
      cityId: this.userProfile.cityId,
    })
    // 
    if (this.addressDetailsModel.countryId) this.getStateByCountry(this.addressDetailsModel.countryId);
    if (this.addressDetailsModel.stateId) this.getCityByState(this.addressDetailsModel.stateId);
    this.editInit();
  }

  btnClicked(type: any, e: any) {
    if (type === 'edit' || type === 'cancel') {
      this.editMode = !this.editMode;
      toggleEdit(this.addressConfig);
    }


    e['btnType'] = type;
    // Cancel
    if (type === 'cancel') {
      this.cancelEdit();
      
      this.onClick.emit(e);
    } else if (type === 'save') {
      // SAVE 
      this.isLoading = true;
      // add record
      this.userProfileService.saveAddressDetails(this.addressDetailsForm.value).subscribe(
        (res: IResponseSchema) => {
          
          if (res.status === 'success') {
            this.isLoading = false;
            toggleEdit(this.addressConfig);
            this.editMode = false;
            this.onClick.emit(e);
            this.toastyService.success(res.message, null!, {positionClass: 'toast-top-right'});
          } else {
            this.toastyService.error(res.message, null!, {positionClass: 'toast-top-right'});
          }
        },
        (err) => {
          
        }
      );
      
    }
  }

}
