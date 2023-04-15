import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonalInfoModel } from '../my-account.model';
import {
  FirstNameInput,
  LastNameInput,
  GenderSelect,
  DateOfAnniversaryInput,
  DateOfBirthInput,
  TimeZoneSelect,
  EmailInput,
  MobileInput,
  PhoneInput,
  SocialLinkedInInput,
  SocialFacebookInput,
  SocialTwitterInput
} from "../../../configs/plugin-components/my-account.config";
import { toggleEdit } from 'src/app/shared/utils/readonly-toggle';
import { scrollToElement } from 'src/app/shared/utils/scroll-to-top';

import { UserProfileService } from 'src/app/shared/_http/user-profile.service';
import { IResponseSchema } from 'src/app/configs/api-config';
import { RmToastyService } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: [
    './personal-information.component.scss'
  ],
  // encapsulation: ViewEncapsulation.None
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  dummyData: any;
  isLoading!: boolean;
  editMode!: boolean;
  @Input() userProfile: any;
  @Input() timeZone: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();


  // Configs


  personalInfoForm = new FormGroup({
    userImage: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    anniversaryDate: new FormControl(''),
    birthDate: new FormControl(''),
    timezoneId: new FormControl(''),
    

    // Contact Details
    emailId: new FormControl(''),
    mobileNo: new FormControl(''),
    phoneNo: new FormControl(''),
    linkedinUrl: new FormControl(''),
    facebookUrl: new FormControl(''),
    twitterUrl: new FormControl('')
  });
  public personalInputConfig = {
    FirstNameInput,
    LastNameInput,
    GenderSelect,
    DateOfAnniversaryInput,
    DateOfBirthInput,
    TimeZoneSelect,

    // Contact Details
    EmailInput,
    MobileInput,
    PhoneInput,
    SocialLinkedInInput,
    SocialFacebookInput,
    SocialTwitterInput
  }

  // Models
  personalInfoModel: PersonalInfoModel = new PersonalInfoModel();
  tempModel: PersonalInfoModel = new PersonalInfoModel();
  profileImageUpload!: string;

  constructor(
    private userProfileService: UserProfileService,
    private toastyService: RmToastyService
  ) {
  }

  ngOnInit(): void {
    // 
    // API Call on Init
    this.valueInit();
  }

  editInit() {
    this.tempModel = { ...this.personalInfoModel };
  }

  valueInit() {
    this.personalInfoModel = {
      ...this.userProfile,
      anniversaryDate: this.userProfile.anniversaryDate ? new Date(this.userProfile.anniversaryDate) : null,
      birthDate: this.userProfile.birthDate ? new Date(this.userProfile.birthDate) : null,
    };

    this.profileImageUpload = (this.personalInfoModel.userImage ? this.personalInfoModel.userImage : '../../../../assets/img/dummyProfile.jpg');

    this.personalInfoForm.patchValue({
      linkedinUrl: this.userProfile?.linkedinUrl,
      facebookUrl: this.userProfile?.facebookUrl,
      twitterUrl: this.userProfile?.twitterUrl
    })
    // this.personalInputConfig.TimeZoneSelect.options = res.map((item) => `${item.description} (${item.offset}`);
    this.personalInputConfig.TimeZoneSelect.options = this.timeZone;
    this.editInit();
  }

  selectionChange(type: any, e: any) {
    // DO something
    switch (type) {
      case 'gender':
        this.personalInfoForm.patchValue({
          gender: e.value
        })
        break;
      case 'timezone':
        this.personalInfoForm.patchValue({
          timezoneId: e.value
        })
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    toggleEdit(this.personalInputConfig, true)
  }

  cancelEdit() {
    this.personalInfoModel = { ...this.tempModel };
    this.ngOnInit();
  }

  scrollTop(el: any) {
    scrollToElement(el);
  }

  handleFileInputProfile(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      var reader: any = new FileReader();

      reader.readAsDataURL(evt.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        //   this.user.userImage = event.target.result.toString();
        this.profileImageUpload = (event.target as FileReader).result!.toString();
        //   
      }
    }
  }

  saveEdit(e: any) {
    this.personalInfoForm.patchValue({
      userImage: this.profileImageUpload,
      gender: this.personalInfoModel.gender
    });
    // API Call for Update/ Add
    // 
    this.isLoading = true;
    this.userProfileService.savePersonalInformation(this.personalInfoForm.value).subscribe(
      (res: IResponseSchema) => {
        if (res.status === 'success') {
        this.isLoading = false;
        this.editMode = false;
        this.onClick.emit(e);
        
          this.toastyService.success(res.message, null!, {positionClass: 'toast-top-right'});
        } else {
          this.toastyService.error(res.message, null!, {positionClass: 'toast-top-right'});
        }


      }
    );
  }

  btnClicked(type: any, e: any) {
    e['btnType'] = type;
    if (type === 'edit' || type === 'cancel') this.editMode = !this.editMode;
    toggleEdit(this.personalInputConfig);

    if (type === 'edit') {
      
    }
    // Cancel
    if (type === 'cancel') {
      this.cancelEdit();
      
      this.onClick.emit(e);
    } else if (type === 'save') {
      this.saveEdit(e);
    }
    // setTimeout(() => {
    //   Object.keys(this.personalInfoForm.controls).forEach(field => {
    //     const control = this.personalInfoForm.get(field);
    //     control.updateValueAndValidity();
    //   });
    // }, 0);


  }


}
